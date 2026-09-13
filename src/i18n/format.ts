/**
 * Fills {placeholders} in a dictionary string. Unknown placeholders are left
 * visible rather than silently removed, so a missing value shows up in review
 * instead of producing a sentence with a hole in it.
 */
export function format(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}
