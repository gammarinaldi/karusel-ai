import React from "react";

interface SlideProps {
  title: string;
  content: string;
  slideNumber: number;
  totalSlides: number;
  brandName?: string;
}

// Bar chart data for decorative element (heights as % of max)
const BAR_HEIGHTS = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100];

export const CarouselSlide: React.FC<SlideProps> = ({
  title,
  content,
  slideNumber,
  totalSlides,
  brandName,
}) => {
  return (
    <div
      style={{
        width: "1080px",
        height: "1350px",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Inter, sans-serif",
        position: "relative",
        overflow: "hidden",
        // Deep navy gradient — financial dark mode
        backgroundImage: "linear-gradient(160deg, #0a1628 0%, #0d2140 40%, #061022 100%)",
        color: "#ffffff",
      }}
    >
      {/* ── Diagonal grid lines (subtle) ── */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Gold top accent bar ── */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "6px",
          backgroundImage: "linear-gradient(90deg, #f5c518 0%, #ffd966 50%, #f5c518 100%)",
        }}
      />

      {/* ── Decorative bar chart (top-right corner) ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          position: "absolute",
          top: "60px",
          right: "60px",
          gap: "6px",
          opacity: 0.18,
        }}
      >
        {BAR_HEIGHTS.map((h, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              width: "16px",
              height: `${h}px`,
              backgroundImage:
                i >= BAR_HEIGHTS.length - 3
                  ? "linear-gradient(180deg, #f5c518 0%, #c9a000 100%)"
                  : "linear-gradient(180deg, #4a9eff 0%, #1d6bbf 100%)",
              borderRadius: "4px 4px 0 0",
            }}
          />
        ))}
      </div>

      {/* ── Rising trend line (bottom-right) ── */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          bottom: "200px",
          right: "0px",
          width: "420px",
          height: "200px",
          opacity: 0.08,
          backgroundImage: "linear-gradient(135deg, transparent 0%, #4a9eff 100%)",
          borderRadius: "200px 0 0 0",
        }}
      />

      {/* ── Main content area ── */}
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
        {/* Slide number badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              backgroundColor: "#f5c518",
              borderRadius: "6px",
              paddingLeft: "14px",
              paddingRight: "14px",
              paddingTop: "6px",
              paddingBottom: "6px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "22px",
                fontWeight: "700",
                color: "#0a1628",
                letterSpacing: "0.05em",
              }}
            >
              {String(slideNumber).padStart(2, "0")}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "60px",
              height: "2px",
              backgroundColor: "#f5c518",
              opacity: 0.6,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              color: "#f5c518",
              opacity: 0.7,
              letterSpacing: "0.15em",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            ANALISIS
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: "78px",
            fontWeight: "700",
            lineHeight: 1.1,
            color: "#ffffff",
            marginBottom: "48px",
            letterSpacing: "-0.02em",
            maxWidth: "880px",
          }}
        >
          {title}
        </div>

        {/* Gold divider */}
        <div
          style={{
            display: "flex",
            width: "80px",
            height: "4px",
            backgroundImage: "linear-gradient(90deg, #f5c518, #ffd966)",
            borderRadius: "2px",
            marginBottom: "40px",
          }}
        />

        {/* Body content */}
        <div
          style={{
            display: "flex",
            fontSize: "36px",
            lineHeight: 1.6,
            color: "#c8d8f0",
            maxWidth: "880px",
            fontWeight: "400",
          }}
        >
          {content}
        </div>
      </div>

      {/* ── Footer ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          bottom: "0px",
          left: "0px",
          right: "0px",
          height: "160px",
          backgroundImage: "linear-gradient(180deg, transparent 0%, rgba(5,12,30,0.95) 100%)",
          alignItems: "center",
          paddingLeft: "90px",
          paddingRight: "90px",
          borderTop: "1px solid rgba(245,197,24,0.2)",
        }}
      >
        {/* Brand */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "10px",
              height: "10px",
              backgroundColor: "#f5c518",
              borderRadius: "2px",
              transform: "rotate(45deg)",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: "30px",
              fontWeight: "700",
              color: "#f5c518",
              letterSpacing: "0.02em",
            }}
          >
            {brandName || "Karusel AI"}
          </div>
        </div>

        {/* Progress dots */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {Array.from({ length: totalSlides }).map((_, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                width: i === slideNumber - 1 ? "32px" : "10px",
                height: "10px",
                backgroundColor: i === slideNumber - 1 ? "#f5c518" : "rgba(255,255,255,0.2)",
                borderRadius: "5px",
              }}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "26px",
              color: "rgba(255,255,255,0.4)",
              fontWeight: "600",
              letterSpacing: "0.08em",
            }}
          >
            {String(slideNumber).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
};
