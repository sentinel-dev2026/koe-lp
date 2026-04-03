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
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top-left accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "6px",
            background: "#E8634A",
          }}
        />

        {/* Main content - left aligned */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            marginTop: "20px",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            {/* Logo icon - speech bubble */}
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
                fontSize: "64px",
                fontWeight: 800,
                color: "#1A1A1A",
                letterSpacing: "-2px",
              }}
            >
              Koe
              <span style={{ color: "#E8634A" }}>Log</span>
            </div>
          </div>

          {/* Catchcopy */}
          <div
            style={{
              fontSize: "40px",
              fontWeight: 600,
              color: "#374151",
              lineHeight: 1.4,
            }}
          >
            お客様の声を、もっと簡単に。
          </div>

          {/* Sub description */}
          <div
            style={{
              fontSize: "24px",
              color: "#9CA3AF",
              lineHeight: 1.6,
            }}
          >
            収集・管理・サイト掲載をワンストップで
          </div>
        </div>

        {/* Bottom right - URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              color: "#9CA3AF",
              fontWeight: 500,
              letterSpacing: "1px",
            }}
          >
            koelog.jp
          </div>
        </div>

        {/* Bottom-left accent dot */}
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            left: "80px",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "#E8634A",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
