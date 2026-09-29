import type { CarParkStatus } from './types';

// only digits, at least one. rejects e.g. "", "-5", "1.5" and "1e3".
const ONLY_DIGITS = /^\d+$/;

export function parseStatus(description: string | undefined): CarParkStatus {
  if (!description) {
    return { status: 'unknown' };
  }

  const [word, spaces] = description.split('/');
  const status = word?.trim();

  if (status === 'closed') {
    return { status: 'closed' };
  }

  if (status === 'open') {
    const text = spaces?.trim() ?? '';
    if (!ONLY_DIGITS.test(text)) {
      return { status: 'unknown' };
    }
    return { status: 'open', freeSpaces: Number(text) };
  }

  return { status: 'unknown' };
}
