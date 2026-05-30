import React from "react";

export type ThemeType = "financial" | "automotive" | "typography";

interface SlideProps {
  title: string;
  content: string;
  slideNumber: number;
  totalSlides: number;
  brandName?: string;
  theme?: ThemeType;
}

const BAR_HEIGHTS = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100];
const SPEED_LINES = [120, 90, 140, 110, 160, 130, 180, 150, 170, 140];

const cleanStyle = (style: React.CSSProperties): React.CSSProperties => {
  const cleaned: any = {};
  for (const key in style) {
    if ((style as any)[key] !== undefined) {
      cleaned[key] = (style as any)[key];
    }
  }
  return cleaned;
};

const renderContent = (content: string | undefined | null, config: any) => {
  if (!content) return null;
  const contentStr = String(content);

  // Pre-process inline numbered lists (e.g., "1. A 2. B" -> "1. A\n2. B")
  let processedContent = contentStr;
  if (!contentStr.includes("\n") && /\d+\.\s/.test(contentStr)) {
    processedContent = contentStr.replace(/\s+(\d+\.)/g, "\n$1");
  }

  // Normalize newlines and filter empty lines
  const lines = processedContent
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) return null;

  const isNumbered = (text: string) => /^\d+\.\s/.test(text);
  const isBullet = (text: string) => /^([-\*•])\s/.test(text);

  const hasList = lines.some((line) => isNumbered(line) || isBullet(line));

  if (!hasList) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
        {lines.map((line, idx) => (
          <div key={idx} style={{ display: "flex", lineHeight: 1.6 }}>
            {line}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>
      {lines.map((line, idx) => {
        if (isNumbered(line)) {
          const match = line.match(/^(\d+)\.\s(.*)/);
          if (match) {
            const num = match[1];
            const text = match[2];
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  width: "100%",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: 36,
                    fontWeight: 700,
                    color: config.accent,
                    width: 44,
                    flexShrink: 0,
                  }}
                >
                  {num}.
                </div>
                <div style={{ display: "flex", flex: 1, fontSize: 36, lineHeight: 1.6 }}>
                  {text}
                </div>
              </div>
            );
          }
        } else if (isBullet(line)) {
          const match = line.match(/^([-\*•])\s(.*)/);
          if (match) {
            const text = match[2];
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  width: "100%",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: 36,
                    fontWeight: 700,
                    color: config.accent,
                    width: 24,
                    flexShrink: 0,
                    justifyContent: "center",
                  }}
                >
                  •
                </div>
                <div style={{ display: "flex", flex: 1, fontSize: 36, lineHeight: 1.6 }}>
                  {text}
                </div>
              </div>
            );
          }
        }

        // If a line is inside a list block but has no list prefix, render with indent
        return (
          <div
            key={idx}
            style={{
              display: "flex",
              fontSize: 36,
              lineHeight: 1.6,
              paddingLeft: 44,
            }}
          >
            {line}
          </div>
        );
      })}
    </div>
  );
};

const THEME_CONFIGS = {
  financial: {
    bg: "linear-gradient(160deg, #0a1628 0%, #0d2140 40%, #061022 100%)",
    accent: "#f5c518",
    accentSecondary: "#ffd966",
    textColor: "#ffffff",
    contentColor: "#c8d8f0",
    gridOpacity: 0.03,
    topBarGradient: "linear-gradient(90deg, #f5c518 0%, #ffd966 50%, #f5c518 100%)",
  },
  automotive: {
    bg: "linear-gradient(160deg, #0f172a 0%, #1e293b 40%, #020617 100%)",
    accent: "#ef4444",
    accentSecondary: "#f87171",
    textColor: "#ffffff",
    contentColor: "#cbd5e1",
    gridOpacity: 0.05,
    topBarGradient: "linear-gradient(90deg, #ef4444 0%, #f87171 50%, #ef4444 100%)",
  },
  typography: {
    bg: "#ffffff",
    accent: "#111827",
    accentSecondary: "#4b5563",
    textColor: "#111827",
    contentColor: "#374151",
    gridOpacity: 0,
    topBarGradient: "linear-gradient(90deg, #111827 0%, #4b5563 50%, #111827 100%)",
  },
};

export const CarouselSlide: React.FC<SlideProps> = ({
  title,
  content,
  slideNumber,
  totalSlides,
  brandName,
  theme = "financial",
}) => {
  const config = THEME_CONFIGS[theme];

  return (
    <div
      style={cleanStyle({
        width: 1080,
        height: 1350,
        display: "flex",
        flexDirection: "column",
        fontFamily: "Inter, sans-serif",
        position: "relative",
        overflow: "hidden",
        backgroundColor: theme === "financial" ? "#0a1628" : theme === "typography" ? "#ffffff" : "#0f172a",
        backgroundImage: theme === "typography" ? undefined : config.bg,
        color: config.textColor,
      })}
    >
      {/* Grid Pattern */}
      {theme !== "typography" && (
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,${config.gridOpacity}) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,${config.gridOpacity}) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      )}

      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          backgroundImage: config.topBarGradient,
        }}
      />

      {/* Ornament Section */}
      {theme === "financial" && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            position: "absolute",
            top: 60,
            right: 60,
            gap: 6,
            opacity: 0.18,
          }}
        >
          {BAR_HEIGHTS.map((h, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                width: 16,
                height: h,
                backgroundImage:
                  i >= BAR_HEIGHTS.length - 3
                    ? `linear-gradient(180deg, ${config.accent} 0%, #c9a000 100%)`
                    : "linear-gradient(180deg, #4a9eff 0%, #1d6bbf 100%)",
                borderRadius: "4px 4px 0 0",
              }}
            />
          ))}
        </div>
      )}

      {theme === "automotive" && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            position: "absolute",
            top: -40,
            right: 40,
            gap: 12,
            opacity: 0.15,
            transform: "rotate(15deg)",
          }}
        >
          {SPEED_LINES.map((h, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                width: 4,
                height: h * 2,
                backgroundColor: i % 2 === 0 ? config.accent : "#ffffff",
                borderRadius: 2,
              }}
            />
          ))}
        </div>
      )}

      {theme === "typography" && (
        <>
          {/* Thin elegant border framing the slide */}
          <div
            style={{
              display: "flex",
              position: "absolute",
              top: 50,
              left: 50,
              right: 50,
              bottom: 50,
              border: "1px solid rgba(17, 24, 39, 0.08)",
              pointerEvents: "none",
            }}
          />
          {/* Subtle text label as minimalist ornament */}
          <div
            style={{
              display: "flex",
              position: "absolute",
              top: 80,
              right: 80,
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: "0.25em",
              color: "rgba(17, 24, 39, 0.35)",
              textTransform: "uppercase",
            }}
          >
            EDITORIAL SLIDE
          </div>
        </>
      )}

      {/* Background Glow */}
      {theme !== "typography" && (
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 200,
            right: 0,
            width: 420,
            height: 200,
            opacity: 0.1,
            backgroundImage: `linear-gradient(135deg, transparent 0%, ${config.accent} 100%)`,
            borderRadius: "200px 0 0 0",
          }}
        />
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "120px 90px 220px 90px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              backgroundColor: config.accent,
              borderRadius: theme === "typography" ? 0 : 6,
              paddingLeft: 14,
              paddingRight: 14,
              paddingTop: 6,
              paddingBottom: 6,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 700,
                color: theme === "financial" ? "#0a1628" : "#ffffff",
                letterSpacing: "0.05em",
              }}
            >
              {String(slideNumber).padStart(2, "0")}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: 60,
              height: 2,
              backgroundColor: config.accent,
              opacity: 0.6,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 20,
              color: config.accent,
              opacity: 0.7,
              letterSpacing: "0.15em",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            {theme === "financial" ? "ANALISIS" : theme === "automotive" ? "PERFORMANCE" : "ESENSIAL"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 78,
            fontWeight: 800,
            lineHeight: 1.1,
            color: config.textColor,
            marginBottom: 48,
            letterSpacing: "-0.03em",
            maxWidth: 880,
          }}
        >
          {title}
        </div>

        <div
          style={cleanStyle({
            display: "flex",
            width: theme === "typography" ? 120 : 80,
            height: theme === "typography" ? 3 : 6,
            backgroundColor: theme === "typography" ? "rgba(17, 24, 39, 0.15)" : undefined,
            backgroundImage: theme === "typography" ? undefined : `linear-gradient(90deg, ${config.accent}, ${config.accentSecondary})`,
            borderRadius: theme === "typography" ? 0 : 3,
            marginBottom: 40,
          })}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 36,
            lineHeight: 1.6,
            color: config.contentColor,
            maxWidth: 880,
            fontWeight: 400,
            width: "100%",
          }}
        >
          {renderContent(content, config)}
        </div>
      </div>

      {/* Footer */}
      <div
        style={cleanStyle({
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 160,
          backgroundImage: theme === "typography" ? undefined : "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 100%)",
          alignItems: "center",
          paddingLeft: 90,
          paddingRight: 90,
          borderTop: theme === "typography" ? "1px solid rgba(17, 24, 39, 0.08)" : `1px solid ${config.accent}33`,
        })}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 12,
              height: 12,
              backgroundColor: config.accent,
              borderRadius: theme === "financial" ? 2 : 0,
              transform: "rotate(45deg)",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 800,
              color: config.accent,
              letterSpacing: "0.02em",
            }}
          >
            {brandName || "Karusel AI"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          {Array.from({ length: totalSlides }).map((_, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                width: i === slideNumber - 1 ? 36 : 12,
                height: 12,
                backgroundColor: i === slideNumber - 1 ? config.accent : theme === "typography" ? "rgba(17, 24, 39, 0.15)" : "rgba(255,255,255,0.2)",
                borderRadius: 6,
              }}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: theme === "typography" ? "rgba(17, 24, 39, 0.4)" : "rgba(255,255,255,0.4)",
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}
          >
            {`${String(slideNumber).padStart(2, "0")} / ${String(totalSlides).padStart(2, "0")}`}
          </div>
        </div>
      </div>
    </div>
  );
};

