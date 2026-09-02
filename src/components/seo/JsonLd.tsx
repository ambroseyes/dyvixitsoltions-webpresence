/**
 * Renders one JSON-LD graph per page.
 *
 * The payload is built server-side from typed builders in lib/schema, never
 * from user input, so there is no injection surface here. JSON.stringify is
 * additionally escaped for `<` to defeat `</script>` breakout.
 */
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
