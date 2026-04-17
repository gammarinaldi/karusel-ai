import { NextRequest, NextResponse } from "next/server";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import JSZip from "jszip";
import { CarouselSlide } from "@/components/CarouselSlide";
import fs from "fs";
import path from "path";

// Read Inter Bold font from the locally installed @fontsource/inter package
function getInterBoldFont(): ArrayBuffer {
  const fontPath = path.join(
    process.cwd(),
    "node_modules/@fontsource/inter/files/inter-latin-700-normal.woff"
  );
  const buffer = fs.readFileSync(fontPath);
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}

export async function POST(req: NextRequest) {
  try {
    const { slides, brandName } = await req.json();

    if (!slides || !Array.isArray(slides)) {
      return NextResponse.json({ error: "Invalid slides data" }, { status: 400 });
    }

    // Read Inter Bold font from local @fontsource/inter package
    const interBold = getInterBoldFont();

    const zip = new JSZip();

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];

      // 1. Render React to SVG string using Satori
      const svg = await satori(
        <CarouselSlide
          title={slide.title}
          content={slide.content}
          slideNumber={i + 1}
          totalSlides={slides.length}
          brandName={brandName}
        />,
        {
          width: 1080,
          height: 1350,
          fonts: [
            {
              name: "Inter",
              data: interBold,
              weight: 700,
              style: "normal",
            },
          ],
        }
      );

      // 2. Convert SVG to PNG using Resvg
      const resvg = new Resvg(svg, {
        fitTo: {
          mode: "width",
          value: 1080,
        },
      });
      const pngData = resvg.render();
      const pngBuffer = pngData.asPng();

      // 3. Add to ZIP
      zip.file(`slide-${i + 1}.png`, pngBuffer);
    }

    const zipBuffer = await zip.generateAsync({ type: "blob" });

    return new NextResponse(zipBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="karusel-export.zip"',
      },
    });
  } catch (error: any) {
    console.error("Export Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to export images" },
      { status: 500 }
    );
  }
}
