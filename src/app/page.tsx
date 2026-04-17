"use client";

import { useState } from "react";
import { Search, Download, Sparkles, Loader2, ArrowRight, ArrowLeft, Copy, Check } from "lucide-react";
import { elaborateTopic, ResearchResult, SlideContent } from "./actions/research";
import { CarouselSlide } from "@/components/CarouselSlide";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [brandName, setBrandName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyCaption = () => {
    if (!result?.caption) return;
    navigator.clipboard.writeText(result.caption);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleGenerate = async () => {
    if (!topic || !brandName) return;
    setIsLoading(true);
    const res = await elaborateTopic(topic, brandName);
    setResult(res);
    setIsLoading(false);
    setActiveSlide(0);
  };

  const handleDownload = async () => {
    if (!result?.slides) return;

    try {
      const response = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slides: result.slides,
          brandName: result.brandName
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${result.brandName || 'karusel'}-konten.zip`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-8 font-sans">
      {/* Header */}
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-12">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Carousel Content Generator</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-[400px_1fr] gap-12">
        {/* Left Column: Input */}
        <section className="space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl space-y-4">
            <h2 className="text-lg font-semibold">Buat Karusel Baru</h2>
            <p className="text-sm text-neutral-400">
              Masukkan nama brand dan topik yang ingin Anda bahas. Kami akan melakukan riset dan merangkumnya menjadi 4 halaman konten.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1 block">
                  Nama Brand
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Digital Agency X"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1 block">
                  Topik Konten
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Contoh: Berita saham Indonesia hari ini..."
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleGenerate}
                    disabled={isLoading || !topic || !brandName}
                    className="absolute right-2 top-2 p-1.5 bg-blue-600 rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <ArrowRight className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {result?.success && (
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="font-medium">Hasil Riset</h3>
              <ul className="text-sm text-neutral-400 space-y-2">
                {result.sources?.map((s, i) => (
                  <li key={i} className="flex items-center gap-2 truncate">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                    <a href={s} target="_blank" className="hover:text-blue-400 underline decoration-blue-500/30">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 bg-neutral-100 text-neutral-950 font-semibold py-3 rounded-xl hover:bg-white transition-colors"
              >
                <Download className="w-5 h-5" />
                Unduh Semua Gambar (.png)
              </button>
            </div>
          )}
        </section>

        {/* Right Column: Preview */}
        <section className="flex flex-col items-center">
          {!result?.slides ? (
            <div className="w-full h-[600px] bg-neutral-900/50 border-2 border-dashed border-neutral-800 rounded-3xl flex flex-col items-center justify-center text-neutral-500">
              <Search className="w-12 h-12 mb-4 opacity-20" />
              <p>Belum ada konten yang dihasilkan.</p>
            </div>
          ) : (
            <div className="w-full space-y-8 flex flex-col items-center animate-in zoom-in-95 duration-500">
              {/* Scale down the preview for better UI fit */}
              <div className="scale-[0.45] origin-top h-[610px]">
                <CarouselSlide
                  title={result.slides[activeSlide].title}
                  content={result.slides[activeSlide].content}
                  slideNumber={activeSlide + 1}
                  totalSlides={result.slides.length}
                  brandName={result.brandName}
                />
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-12">
                <div className="flex items-center gap-8 bg-neutral-900 p-4 rounded-full border border-neutral-800">
                  <button
                    onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
                    disabled={activeSlide === 0}
                    className="p-2 hover:bg-neutral-800 rounded-full disabled:opacity-20 transition-colors"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <div className="text-sm font-medium tabular-nums">
                    Halaman {activeSlide + 1} dari {result.slides.length}
                  </div>
                  <button
                    onClick={() => setActiveSlide((prev) => Math.min(result.slides!.length - 1, prev + 1))}
                    disabled={activeSlide === result.slides.length - 1}
                    className="p-2 hover:bg-neutral-800 rounded-full disabled:opacity-20 transition-colors"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Caption Section */}
              {result.caption && (
                <div className="w-full max-w-xl animate-in slide-in-from-top-4 duration-500">
                  <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/50">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-widest">
                          Generated Caption
                        </h3>
                      </div>
                      <button
                        onClick={handleCopyCaption}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium transition-all active:scale-95"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-green-500" />
                            <span className="text-green-500">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-neutral-400" />
                            <span>Copy Caption</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-6">
                      <p className="text-neutral-400 text-sm leading-relaxed whitespace-pre-wrap selection:bg-blue-500/30">
                        {result.caption}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
