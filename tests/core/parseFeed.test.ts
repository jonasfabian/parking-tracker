import { describe, expect, it } from 'vitest';
import { parseStatus } from '../../src/core/parseStatus';
import { parseId } from '../../src/core/parseId';
import { parseTitle } from '../../src/core/parseTitle';
import { parseDate } from '../../src/core/parseDate';

// core: raw entries in, car parks and a list of problems out.
// write the raw entries directly as objects in each testt. no xml, no network, no clock.

describe('id', () => {
  it('extracts the id from the pid parameter in the link', () => {
    expect(parseId('https://www.pls-zh.ch/parkhaus/accu.jsp?pid=accu')).toBe('accu');
    expect(parseId('https://www.pls-zh.ch/parkhaus/center_11.jsp?pid=center_11')).toBe('center_11');
    expect(parseId('https://www.pls-zh.ch/parkhaus/accu.jsp?pid=accu&lang=de')).toBe('accu');
  });

  it.each([
    { link: undefined, reason: 'the link is missing' },
    { link: 'https://www.pls-zh.ch/parkhaus/accu.jsp', reason: 'the pid parameter is missing' },
    { link: 'https://www.pls-zh.ch/parkhaus/accu.jsp?pid=', reason: 'the pid is empty' },
    { link: 'not a url', reason: 'the link is not a valid URL' },
    {
      link: 'https://www.pls-zh.ch/parkhaus/accu.jsp?xpid=accu',
      reason: 'only a similar parameter exists',
    },
  ])('returns undefined for $link because $reason', ({ link }) => {
    expect(parseId(link)).toBeUndefined();
  });
});

describe('name and address', () => {
  it('splits the title into name and address and drops the prefix "Parkhaus"', () => {
    expect(parseTitle('Parkhaus Accu / Otto-Schütz-Weg')).toEqual({
      name: 'Accu',
      address: 'Otto-Schütz-Weg',
    });
  });
  it('keeps the name when there is no address', () => {
    expect(parseTitle('Parkhaus Ohne Adresse')).toEqual({
      name: 'Ohne Adresse',
      address: undefined,
    });
  });
  it('keeps a name without prefix unchanged', () => {
    expect(parseTitle('Hauptbahnhof / Sihlquai 41')).toEqual({
      name: 'Hauptbahnhof',
      address: 'Sihlquai 41',
    });
  });
  it('splits only at the first separator', () => {
    expect(parseTitle('Parkhaus X / Strasse 1 / Eingang B')).toEqual({
      name: 'X',
      address: 'Strasse 1 / Eingang B',
    });
  });
  it.each([{ title: undefined }, { title: '' }, { title: '   ' }])(
    'returns undefined for "$title"',
    ({ title }) => {
      expect(parseTitle(title)).toBeUndefined();
    },
  );
});

describe('status and free spaces', () => {
  it('reads "open /  162" as open with 162 free spaces', () => {
    expect(parseStatus('open /  162')).toEqual({ status: 'open', freeSpaces: 162 });
  });

  it('handles any number of spaces around the slash and the number', () => {
    expect(parseStatus('open/162')).toEqual({ status: 'open', freeSpaces: 162 });
    expect(parseStatus('  open   /    162  ')).toEqual({ status: 'open', freeSpaces: 162 });
  });

  it('reads "open /    0" as open but full', () => {
    expect(parseStatus('open /    0')).toEqual({ status: 'open', freeSpaces: 0 });
  });

  it('reads "closed /    0" as closed', () => {
    expect(parseStatus('closed /    0')).toEqual({ status: 'closed' });
  });

  it('accepts the display limit of 999 free spaces', () => {
    expect(parseStatus('open /  999')).toEqual({ status: 'open', freeSpaces: 999 });
  });

  it.each([
    ['open / ', 'the number is missing'],
    ['open', 'the slash is missing'],
    ['open / abc', 'the number is text'],
    ['open / -5', 'the number is negative'],
    ['open / 1.5', 'the number is a decimal'],
    ['open / 1e3', 'the number uses exponent notation'],
  ])('returns unknown for "%s" because %s', (description) => {
    expect(parseStatus(description)).toEqual({ status: 'unknown' });
  });

  it('returns unknown for a status word it does not know', () => {
    expect(parseStatus('kaputt /    5')).toEqual({ status: 'unknown' });
  });

  it('returns unknown for an empty or missing description', () => {
    expect(parseStatus('')).toEqual({ status: 'unknown' });
    expect(parseStatus(undefined)).toEqual({ status: 'unknown' });
  });
});

describe('time and freshness', () => {
  it('parses an ISO timestamp with Z as UTC', () => {
    expect(parseDate('2026-09-29T11:30:21Z')).toBe(Date.UTC(2026, 8, 29, 11, 30, 21));
  });

  it('respects an explicit offset', () => {
    expect(parseDate('2026-09-29T13:30:21+02:00')).toBe(Date.UTC(2026, 8, 29, 11, 30, 21));
  });

  it.each([
    { date: undefined, reason: 'it is missing' },
    { date: '', reason: 'it is empty' },
    { date: 'yesterday', reason: 'it is not a date' },
    { date: '2026-09-29T11:30:21', reason: 'the time zone is missing' },
    { date: 'Tue, 29 Sep 2026 11:30:21 GMT', reason: 'it is not ISO format' },
    { date: '2026-13-45T11:30:21Z', reason: 'month and day do not exist' },
  ])('returns undefined for "$date" because $reason', ({ date }) => {
    expect(parseDate(date)).toBeUndefined();
  });

  it.todo('skips an entry without timestamp and reports it as a problem');
  it.todo('marks an entry as stale when it is older than the threshold');
  it.todo('treats an entry exactly at the threshold consistently');
  it.todo('takes "now" as a parameter so tests never depend on the clock');
});

describe('whole feed', () => {
  it.todo('returns valid car parks and problems separately');
  it.todo('keeps processing after a broken entry');
  it.todo('returns empty lists for an empty input');
});
