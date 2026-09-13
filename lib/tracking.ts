export const EVENTS = {
  LanderView: "LanderView",
  BookClick: "BookClick",
  BookSubmit: "BookSubmit",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];

export const ATTR_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
  "ttclid",
] as const;

export type AttrKey = (typeof ATTR_KEYS)[number];
export type Attribution = Partial<Record<AttrKey, string>>;

export const ATTR_STORAGE = "sr_attr";
