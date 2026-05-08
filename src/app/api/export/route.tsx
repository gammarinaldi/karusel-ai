import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "next/og";
import JSZip from "jszip";
import { CarouselSlide } from "@/components/CarouselSlide";

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
    const { slides, brandName, theme } = await req.json();

    if (!slides || !Array.isArray(slides)) {
      return NextResponse.json({ error: "Invalid slides data" }, { status: 400 });
    }

    const origin = req.nextUrl.origin;
    const interBold = await getInterBoldFont(origin);

    const zip = new JSZip();

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];

      // Use Next.js native ImageResponse which handles Satori and WASM internally
      const imageResponse = new ImageResponse(
        (
          <CarouselSlide
            title={slide.title}
            content={slide.content}
            slideNumber={i + 1}
            totalSlides={slides.length}
            brandName={brandName}
            theme={theme}
          />
        ),
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

      // Extract the raw PNG buffer from the response
      const pngBuffer = await imageResponse.arrayBuffer();

      // Add to ZIP
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
