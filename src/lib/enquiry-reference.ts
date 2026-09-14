import { randomInt } from "node:crypto";

/** No 0/O or 1/I/L: a reference read out over the phone should survive the call. */
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const LENGTH = 6;

/**
 * The reference shown to the visitor and quoted in the team's e-mail, e.g.
 * DYX-7KQ2MP. Random rather than time-based, so two enquiries sent in the
 * same millisecond never share one.
 */
export function newEnquiryReference(): string {
  const chars = Array.from({ length: LENGTH }, () => ALPHABET[randomInt(ALPHABET.length)]);
  return `DYX-${chars.join("")}`;
}
