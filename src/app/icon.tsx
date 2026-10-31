import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Favicon built from the K+ symbol in the KadhaPlus logo.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: 14,
          border: "4px solid #2e693d",
          position: "relative",
        }}
      >
        <span
          style={{
            fontSize: 34,
            fontWeight: 800,
            color: "#17365a",
            fontFamily: "sans-serif",
            lineHeight: 1,
          }}
        >
          K
        </span>
        <span
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "#5fa52f",
            marginLeft: 1,
            marginTop: -12,
          }}
        >
          +
        </span>
      </div>
    ),
    { ...size },
  );
}
