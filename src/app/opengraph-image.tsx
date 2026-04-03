import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KoeLog - お客様の声を、もっと簡単に。";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAFAFA",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "6px",
            background: "#E8634A",
            display: "flex",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              background: "#E8634A",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "32px",
              fontWeight: 700,
            }}
          >
            K
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "64px",
              fontWeight: 800,
              letterSpacing: "-2px",
            }}
          >
            <div style={{ color: "#1A1A1A", display: "flex" }}>Koe</div>
            <div style={{ color: "#E8634A", display: "flex" }}>Log</div>
          </div>
        </div>

        {/* Catchcopy */}
        <div
          style={{
            fontSize: "40px",
            fontWeight: 600,
            color: "#374151",
            marginBottom: "16px",
            display: "flex",
          }}
        >
          お客様の声を、もっと簡単に。
        </div>

        {/* Sub */}
        <div
          style={{
            fontSize: "24px",
            color: "#9CA3AF",
            display: "flex",
          }}
        >
          収集・管理・サイト掲載をワンストップで
        </div>

        {/* URL bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            fontSize: "22px",
            color: "#9CA3AF",
            fontWeight: 500,
            display: "flex",
          }}
        >
          koe-lp.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
