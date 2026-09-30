const PREFIX = 'Parkhaus ';
const SEPARATOR = ' / ';

export function parseTitle(
  title: string | undefined,
): { name: string; address: string | undefined } | undefined {
  const trimmed = title?.trim();
  if (!trimmed) {
    return undefined;
  }

  const index = trimmed.indexOf(SEPARATOR);
  const rawName = index === -1 ? trimmed : trimmed.slice(0, index);
  const rawAddress = index === -1 ? undefined : trimmed.slice(index + SEPARATOR.length);

  const name = rawName.startsWith(PREFIX) ? rawName.slice(PREFIX.length) : rawName;

  return {
    name: name.trim(),
    address: rawAddress?.trim() || undefined,
  };
}
