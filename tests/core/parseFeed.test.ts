import { describe, it } from 'vitest';

// This file is the specification for the feed parser.
// Turn each todo into a real test first (red), then implement until it passes (green).
// Use the saved feeds in tests/fixtures instead of the live network.

describe('parseFeed', () => {
  it.todo('parses every item of a real feed snapshot');
  it.todo('extracts a stable id from the pid parameter in the item link');
  it.todo('reads status and free spaces from a description like "open / 113"');
  it.todo('handles a closed car park');
  it.todo('returns an explicit unknown state when status or free spaces are missing or not a number');
  it.todo('parses the timestamp as UTC');
  it.todo('keeps umlauts and HTML entities in names correct');
  it.todo('skips a malformed item and reports it, instead of failing the whole feed');
  it.todo('returns an empty result for an empty feed');
});

describe('freshness', () => {
  it.todo('marks an entry as stale when it is older than the threshold');
  it.todo('treats an entry exactly at the threshold consistently');
  it.todo('takes "now" as a parameter so tests never depend on the clock');
});

describe('plausibility', () => {
  it.todo('handles the display limit of 999 free spaces');
  it.todo('flags free spaces that are higher than the known capacity');
});
