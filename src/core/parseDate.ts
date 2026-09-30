// AI generated regex
// ISO 8601 with seconds and an explicit time zone, for example 2026-09-29T11:30:21Z
const ISO_WITH_ZONE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;

export function parseDate(date: string | undefined): number | undefined {
  if (!date || !ISO_WITH_ZONE.test(date)) {
    return undefined;
  }
  const timestamp = Date.parse(date);
  return Number.isNaN(timestamp) ? undefined : timestamp;
}
