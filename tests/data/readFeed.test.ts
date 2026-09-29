// @vitest-environment happy-dom
import { describe, it } from 'vitest';

// Adapter: XML text in, raw entries with plain strings out.
// No business logic here. Missing fields are passed on, the core decides what they mean.

describe('readFeed', () => {
  it.todo('reads all 36 items from pls_2026_09_29_1400.xml');
  it.todo('returns title, link, description and dc:date of each item as plain strings');
  it.todo('decodes HTML entities like &amp; in the title');
  it.todo('keeps umlauts intact');
  it.todo('returns missing fields as undefined instead of failing');
  it.todo('returns an empty list for a feed without items');
  it.todo('throws a clear error for text that is not valid XML');
});
