import { ImageResponse } from "next/og";

export const alt = "Saltline Surf School, Muizenberg. Stand up on your first wave.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#06262c",
          color: "#f4f1ea",
          padding: "72px",
        }}
      >
        <div style={{ fontSize: 28, marginBottom: 18 }}>Saltline · Muizenberg</div>
        <div style={{ fontSize: 84, lineHeight: 0.95, letterSpacing: -2, maxWidth: 900 }}>
          Stand up on your first wave.
        </div>
        <div
          style={{
            marginTop: 32,
            background: "#e2b33c",
            color: "#1a1408",
            fontSize: 28,
            padding: "12px 18px",
          }}
        >
          Book a lesson
        </div>
      </div>
    ),
    size,
  );
}
