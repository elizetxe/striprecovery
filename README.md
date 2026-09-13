# Strip Recovery

High-intent lander for Meta / Partnership Ads. One job: **book Aftermath to a Strip hotel**.

Brand: darker night-to-morning, neon gold on black, discreet hotel-corridor energy. Fulfillment is the same Las Vegas partner network as Longevity Vegas.

## Conversion map

| Traffic | Land | Action |
|---|---|---|
| Cold Meta (local / Strip) | `/` | Form in the hero. Sticky Book on mobile. |
| High-intent / retarget | `/book` | Form only. |
| Post-submit | `/thank-you?code=SR-XXXX` | Code + what happens next. |

Events: `LanderView`, `BookClick`, `BookSubmit` (also Meta `PageView`, `InitiateCheckout`, `Lead` when a pixel ID is set).

UTMs and `fbclid` persist in `sessionStorage` and ride along as hidden attribution on submit.

Coupon prefix: `SR-`.

## Edit without hunting files

All prices, phone, hours, add-ons, quiz URL, and partner disclaimer live in `lib/config.ts`.

Hotel list: `lib/hotels.ts`. FAQ: `lib/faq.ts`.

## Make bookings actually ring a phone / inbox

The form is live. Leads POST `/api/book` and always get a coupon. Wire ops with env:

```
BOOKING_WEBHOOK_URL=     # Zapier / Make / partner intake
RESEND_API_KEY=          # emails BOOKING_NOTIFY_EMAIL
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_PHONE_TEL=   # CallRail tracking number, E.164
NEXT_PUBLIC_PHONE_DISPLAY=
```

Until `NEXT_PUBLIC_PHONE_TEL` is set, Call CTAs stay hidden so ads never dial a dead line. The form is the conversion.

## Meta ads

Primary text / headline should match the lander:

- “Feeling wrecked on the Strip?”
- “Licensed nurse to your hotel. From $249. No travel fee.”
- “We come to you.”

Do **not** say cures hangover, treats alcohol poisoning, medical detox, or diagnose. Allowed: feel more like yourself, rehydrate & reset, post-celebration wellness.

Suggested URL: `https://<domain>/?utm_source=meta&utm_medium=paid&utm_campaign=strip_aftermath&utm_content={{ad.name}}`

CAPI: send `Lead` from the webhook on `BookSubmit` with the same `event_id` you later add to the pixel — placeholder for Josh. Pixel-only is enough to start.

## Compliance

Adults 18+ only. Footer disclaimer on every page. No fake studies, no % improvement, no invented reviews.

## Stack

Next.js App Router, Tailwind v4, one form, one API route. Deploy on Vercel.
