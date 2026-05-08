import React from "react";

export type ThemeType = "financial" | "automotive";

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
      style={{
        width: 1080,
        height: 1350,
        display: "flex",
        flexDirection: "column",
        fontFamily: "Inter, sans-serif",
        position: "relative",
        overflow: "hidden",
        backgroundColor: theme === "financial" ? "#0a1628" : "#0f172a",
        backgroundImage: config.bg,
        color: config.textColor,
      }}
    >
      {/* Grid Pattern */}
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
      {theme === "financial" ? (
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
      ) : (
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

      {/* Background Glow */}
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
              borderRadius: 6,
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
            {theme === "financial" ? "ANALISIS" : "PERFORMANCE"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 78,
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#ffffff",
            marginBottom: 48,
            letterSpacing: "-0.03em",
            maxWidth: 880,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            width: 80,
            height: 6,
            backgroundImage: `linear-gradient(90deg, ${config.accent}, ${config.accentSecondary})`,
            borderRadius: 3,
            marginBottom: 40,
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 36,
            lineHeight: 1.6,
            color: config.contentColor,
            maxWidth: 880,
            fontWeight: 400,
          }}
        >
          {content}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 160,
          backgroundImage: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 100%)",
          alignItems: "center",
          paddingLeft: 90,
          paddingRight: 90,
          borderTop: `1px solid ${config.accent}33`,
        }}
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
                backgroundColor: i === slideNumber - 1 ? config.accent : "rgba(255,255,255,0.2)",
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
              color: "rgba(255,255,255,0.4)",
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

