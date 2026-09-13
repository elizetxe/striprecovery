import { site } from "./config";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function makeCoupon(seed?: string) {
  const src =
    seed ??
    `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`.toUpperCase();
  let out = "";
  for (let i = 0; i < src.length && out.length < 4; i++) {
    const ch = src[i];
    if (ALPHABET.includes(ch)) out += ch;
  }
  while (out.length < 4) {
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return `${site.couponPrefix}${out}`;
}
