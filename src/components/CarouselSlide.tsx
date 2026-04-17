import React from "react";

interface SlideProps {
  title: string;
  content: string;
  slideNumber: number;
  totalSlides: number;
  brandName?: string;
}

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
        width: 1080,
        height: 1350,
        display: "flex",
        flexDirection: "column",
        fontFamily: "Inter, sans-serif",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#0a1628",
        backgroundImage: "linear-gradient(160deg, #0a1628 0%, #0d2140 40%, #061022 100%)",
        color: "#ffffff",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          backgroundImage: "linear-gradient(90deg, #f5c518 0%, #ffd966 50%, #f5c518 100%)",
        }}
      />

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
                  ? "linear-gradient(180deg, #f5c518 0%, #c9a000 100%)"
                  : "linear-gradient(180deg, #4a9eff 0%, #1d6bbf 100%)",
              borderRadius: "4px 4px 0 0",
            }}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          position: "absolute",
          bottom: 200,
          right: 0,
          width: 420,
          height: 200,
          opacity: 0.08,
          backgroundImage: "linear-gradient(135deg, transparent 0%, #4a9eff 100%)",
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
              backgroundColor: "#f5c518",
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
              width: 60,
              height: 2,
              backgroundColor: "#f5c518",
              opacity: 0.6,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 20,
              color: "#f5c518",
              opacity: 0.7,
              letterSpacing: "0.15em",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            ANALISIS
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 78,
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#ffffff",
            marginBottom: 48,
            letterSpacing: "-0.02em",
            maxWidth: 880,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            width: 80,
            height: 4,
            backgroundImage: "linear-gradient(90deg, #f5c518, #ffd966)",
            borderRadius: 2,
            marginBottom: 40,
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 36,
            lineHeight: 1.6,
            color: "#c8d8f0",
            maxWidth: 880,
            fontWeight: 400,
          }}
        >
          {content}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 160,
          backgroundImage: "linear-gradient(180deg, transparent 0%, rgba(5,12,30,0.95) 100%)",
          alignItems: "center",
          paddingLeft: 90,
          paddingRight: 90,
          borderTop: "1px solid rgba(245,197,24,0.2)",
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
              width: 10,
              height: 10,
              backgroundColor: "#f5c518",
              borderRadius: 2,
              transform: "rotate(45deg)",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 700,
              color: "#f5c518",
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
                width: i === slideNumber - 1 ? 32 : 10,
                height: 10,
                backgroundColor: i === slideNumber - 1 ? "#f5c518" : "rgba(255,255,255,0.2)",
                borderRadius: 5,
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
