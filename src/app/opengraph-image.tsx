import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@600;900",
    { headers: { "User-Agent": "Mozilla/4.0" } },
  ).then((r) => r.text());

  const fontUrls = [...css.matchAll(/url\(([^)]+)\)/g)].map((m) => m[1]);
  const fontData = await fetch(fontUrls[0]).then((r) => r.arrayBuffer());

  return new ImageResponse(
    <div
      style={{
        background: "#F8F9F6",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Noto Sans KR, sans-serif",
        padding: "0 40px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "12px",
          background: "#0D9488",
        }}
      />

      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            background: "#0D9488",
            width: "80px",
            height: "80px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path
              d="M14 2 L6 14 L12 14 L10 22 L18 10 L12 10 Z"
              fill="#F0FDFA"
            />
          </svg>
        </div>
        <span
          style={{
            fontSize: "72px",
            fontWeight: 900,
            color: "#134E4A",
            letterSpacing: "-3px",
          }}
        >
          Snapmove
        </span>
      </div>

      {/* Tagline */}
      <p
        style={{
          fontSize: "54px",
          fontWeight: 900,
          color: "#0F766E",
          margin: "0 0 24px",
          letterSpacing: "-1px",
        }}
      >
        기록하고 공유하는 운동 트래커
      </p>

      {/* Description */}
      <p
        style={{
          fontSize: "36px",
          color: "#4B5563",
          margin: 0,
          maxWidth: "900px",
          textAlign: "center",
          lineHeight: 1.4,
          fontWeight: 600,
        }}
      >
        오늘의 운동을 Snap하고, 멋진 인증 카드로 공유하세요
      </p>

      {/* Feature pills */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "60px",
        }}
      >
        {["운동 기록", "인증 카드", "캘린더"].map((label) => (
          <div
            key={label}
            style={{
              background: "#CCFBF1",
              color: "#0F766E",
              padding: "14px 32px",
              borderRadius: "999px",
              fontSize: "28px",
              fontWeight: 800,
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Noto Sans KR", data: fontData, style: "normal" }],
    },
  );
}
