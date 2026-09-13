import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#07060a",
          color: "#e4c36a",
          fontSize: 56,
          letterSpacing: 4,
          fontWeight: 600,
        }}
      >
        SR
      </div>
    ),
    { ...size },
  );
}
