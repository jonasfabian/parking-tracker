export function parseId(link: string | undefined): string | undefined {
  if (!link || !URL.canParse(link)) {
    return undefined;
  }
  const pid = new URL(link).searchParams.get('pid');
  return pid || undefined;
}
