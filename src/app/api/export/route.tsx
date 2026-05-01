import { NextRequest, NextResponse } from "next/server";
import satori from "satori";
import { initWasm, Resvg } from "@resvg/resvg-wasm";
import JSZip from "jszip";
import { CarouselSlide } from "@/components/CarouselSlide";

let wasmInitialized = false;

async function initializeWasm(origin: string) {
  if (!wasmInitialized) {
    const localWasmUrl = new URL("/resvg.wasm", origin);
    const fallbackWasmUrl = "https://unpkg.com/@resvg/resvg-wasm@2.6.2/index_bg.wasm";
    
    try {
      // Try local first
      let wasmRes = await fetch(localWasmUrl.toString());
      
      if (!wasmRes.ok) {
        console.warn(`Local wasm fetch failed (${wasmRes.status}), trying fallback...`);
        wasmRes = await fetch(fallbackWasmUrl);
      }
      
      if (!wasmRes.ok) {
        throw new Error(`Failed to fetch resvg.wasm from both local and fallback sources`);
      }
      
      const wasmBuffer = await wasmRes.arrayBuffer();
      await initWasm(wasmBuffer);
      wasmInitialized = true;
    } catch (e: any) {
      console.error("WASM Init Error:", e);
      throw new Error(`WASM Initialization failed: ${e.message}`);
    }
  }
}

async function getInterBoldFont(origin: string): Promise<ArrayBuffer> {
  const localFontUrl = new URL("/fonts/inter-bold.woff", origin);
  const fallbackFontUrl = "https://unpkg.com/@fontsource/inter@5.2.8/files/inter-latin-700-normal.woff";
  
  try {
    let res = await fetch(localFontUrl.toString());
    if (!res.ok) {
      console.warn(`Local font fetch failed (${res.status}), trying fallback...`);
      res = await fetch(fallbackFontUrl);
    }
    if (!res.ok) throw new Error("Failed to fetch font from both local and fallback sources");
    return await res.arrayBuffer();
  } catch (e: any) {
    console.error("Font Loading Error:", e);
    throw e;
  }
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
