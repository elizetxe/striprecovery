"use client";

import { ATTR_KEYS, ATTR_STORAGE, EVENTS, type Attribution, type EventName } from "@/lib/tracking";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

export function readAttribution(): Attribution {
  const fromUrl: Attribution = {};
  if (typeof window === "undefined") return fromUrl;
  const params = new URLSearchParams(window.location.search);
  for (const key of ATTR_KEYS) {
    const v = params.get(key);
    if (v) fromUrl[key] = v;
  }
  let stored: Attribution = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(ATTR_STORAGE) || "{}") as Attribution;
  } catch {
    stored = {};
  }
  const merged = { ...stored, ...fromUrl };
  sessionStorage.setItem(ATTR_STORAGE, JSON.stringify(merged));
  return merged;
}

export function track(name: EventName, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const attr = readAttribution();
  const data = { ...attr, ...payload, event: name };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
  if (typeof window.fbq === "function") {
    if (name === EVENTS.BookSubmit) {
      window.fbq("track", "Lead", data);
      window.fbq("trackCustom", name, data);
    } else if (name === EVENTS.BookClick) {
      window.fbq("track", "InitiateCheckout", data);
      window.fbq("trackCustom", name, data);
    } else {
      window.fbq("trackCustom", name, data);
    }
  }
}

export { EVENTS };
