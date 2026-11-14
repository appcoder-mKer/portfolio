const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-05" → "May 2026". Avoids Date/Intl so server and client always agree. */
export function formatMonth(ym: string): string {
  const m = /^(\d{4})-(\d{2})$/.exec(ym);
  if (!m) throw new Error(`formatMonth: expected YYYY-MM, got "${ym}"`);
  const month = MONTHS[Number(m[2]) - 1];
  if (!month) throw new Error(`formatMonth: bad month in "${ym}"`);
  return `${month} ${m[1]}`;
}

export function formatRange(start: string, end?: string): string {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : "Present"}`;
}
