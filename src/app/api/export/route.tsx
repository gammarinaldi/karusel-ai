import { NextRequest, NextResponse } from "next/server";
import satori from "satori";
import { initWasm, Resvg } from "@resvg/resvg-wasm";
import JSZip from "jszip";
import { CarouselSlide } from "@/components/CarouselSlide";

let wasmInitialized = false;

async function initializeWasm(origin: string) {
  if (!wasmInitialized) {
    try {
      const wasmUrl = new URL("/resvg.wasm", origin);
      const wasmRes = await fetch(wasmUrl);
      if (!wasmRes.ok) throw new Error("Failed to fetch resvg.wasm");
      const wasmBuffer = await wasmRes.arrayBuffer();
      await initWasm(wasmBuffer);
      wasmInitialized = true;
    } catch (e) {
      console.error("WASM Init Error:", e);
      throw e;
    }
  }
}

async function getInterBoldFont(origin: string): Promise<ArrayBuffer> {
  const fontUrl = new URL("/fonts/inter-bold.woff", origin);
  const res = await fetch(fontUrl);
  if (!res.ok) throw new Error("Failed to fetch font");
  return await res.arrayBuffer();
}

export async function POST(req: NextRequest) {
  try {
    const { slides, brandName } = await req.json();

    if (!slides || !Array.isArray(slides)) {
      return NextResponse.json({ error: "Invalid slides data" }, { status: 400 });
    }

    // Initialize WASM and Font
    const origin = req.nextUrl.origin;
    await initializeWasm(origin);
    const interBold = await getInterBoldFont(origin);

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
