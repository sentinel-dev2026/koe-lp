import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KoeLog - お客様の声管理ツール";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #FAFAFA 0%, #F5F3EF 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#1A1A1A",
              letterSpacing: "-1px",
            }}
          >
            KoeLog
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#6B7280",
              maxWidth: "700px",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            お客様の声の収集・承認・サイト表示を
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#6B7280",
              textAlign: "center",
            }}
          >
            たった2分で。
          </div>
          <div
            style={{
              marginTop: "16px",
              padding: "12px 32px",
              background: "#E8634A",
              color: "white",
              fontSize: "20px",
              fontWeight: 600,
              borderRadius: "8px",
            }}
          >
            事前登録受付中
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
