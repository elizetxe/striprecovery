import { ImageResponse } from "next/og";
import { offer, site } from "@/lib/config";

export const alt = "Strip Recovery — Aftermath from $249";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07060a",
          color: "#f4ead8",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#e4c36a",
          }}
        >
          {`${site.name} · ${site.subtitle}`}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              lineHeight: 0.95,
              maxWidth: 900,
            }}
          >
            Feeling wrecked on the Strip?
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 28,
              color: "#9a917f",
            }}
          >
            {`Licensed nurse to your hotel. Aftermath from $${offer.priceFrom}.`}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#e4c36a",
          }}
        >
          <span>We come to you</span>
          <span>Adults 18+</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
