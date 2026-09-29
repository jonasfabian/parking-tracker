import { describe, it } from 'vitest';

// core: raw entries in, car parks and a list of problems out.
// write the raw entries directly as objects in each testt. no xml, no network, no clock.

describe('id', () => {
  it.todo('extracts the id from the pid parameter in the link');
  it.todo('skips an entry without link and reports it as a problem');
});

describe('name and address', () => {
  it.todo('splits "Parkhaus Accu / Otto-Schütz-Weg" into name and address');
  it.todo('keeps the full title as name when there is no address');
  it.todo('keeps umlauts and hyphens in the address');
});

describe('status and free spaces', () => {
  it.todo('reads "open /  162" as open with 162 free spaces');
  it.todo('handles any number of spaces around the slash and the number');
  it.todo('reads "open /    0" as open but full');
  it.todo('reads "closed /    0" as closed');
  it.todo('returns an unknown state when the number is missing or not a number');
  it.todo('returns an unknown state for a status word it does not know');
  it.todo('accepts the display limit of 999 free spaces');
});

describe('time and freshness', () => {
  it.todo('uses dc:date as the timestamp and parses it as UTC');
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
