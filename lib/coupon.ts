import { site } from "./config";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function makeCoupon() {
  let out = "";
  const mix = `${Date.now().toString(36)}${Math.random().toString(36)}`.toUpperCase();
  for (const ch of mix) {
    if (ALPHABET.includes(ch)) out += ch;
    if (out.length === 4) break;
  }
  while (out.length < 4) {
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return `${site.couponPrefix}${out}`;
}
