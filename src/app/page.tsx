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
    <main className="min-h-screen bg-[#020617] text-slate-100 p-4 sm:p-8 font-sans selection:bg-blue-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-indigo-600/10 blur-[100px] rounded-full" />
        <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 mb-12 sm:mb-16">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Karusel AI
            </h1>
            <p className="text-[10px] sm:text-xs font-medium text-blue-400 uppercase tracking-[0.2em]">
              Carousel Content Generator
            </p>
          </div>
        </div>
      </header>

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[380px_1fr] gap-10 sm:gap-16">
        {/* Left Column: Input */}
        <section className="space-y-8">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 group-focus-within:opacity-100 transition-opacity" />

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">Mulai Riset</h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Transformasi topik apa pun menjadi konten karusel profesional dalam hitungan detik.
              </p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Identitas Brand
                </label>
                <input
                  type="text"
                  placeholder="Nama Brand Anda"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-3.5 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm placeholder:text-slate-600"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Topik Utama
                </label>
                <div className="relative group/input">
                  <input
                    type="text"
                    placeholder="Apa yang ingin dibahas?"
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-3.5 pl-5 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm placeholder:text-slate-600"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleGenerate}
                    disabled={isLoading || !topic || !brandName}
                    className="absolute right-2 top-2 bottom-2 w-10 flex items-center justify-center bg-blue-600 text-white rounded-xl hover:bg-blue-500 disabled:opacity-20 disabled:grayscale transition-all active:scale-95 shadow-lg shadow-blue-600/20"
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
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">Sumber Riset</h3>
                <span className="text-[10px] px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full font-bold uppercase tracking-wider">
                  Verified
                </span>
              </div>

              <div className="space-y-3">
                {result.sources?.map((s, i) => (
                  <a
                    key={i}
                    href={s}
                    target="_blank"
                    className="flex items-center gap-3 p-3 bg-slate-950/30 rounded-xl border border-slate-800/50 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group/link"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0 group-hover/link:scale-125 transition-transform" />
                    <span className="text-xs text-slate-400 truncate group-hover/link:text-slate-200">
                      {new URL(s).hostname}
                    </span>
                    <ArrowRight className="w-3 h-3 ml-auto opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-blue-500" />
                  </a>
                ))}
              </div>

              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-3 bg-white text-slate-950 font-bold py-4 rounded-2xl hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-white/5"
              >
                <Download className="w-5 h-5" />
                Ekspor Semua Slide
              </button>
            </div>
          )}
        </section>

        {/* Right Column: Preview */}
        <section className="flex flex-col items-center w-full min-w-0">
          {!result?.slides ? (
            <div className="w-full h-[450px] sm:h-[650px] bg-slate-900/20 backdrop-blur-sm border-2 border-dashed border-slate-800/50 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-500 p-8 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-slate-900 p-6 rounded-3xl border border-slate-800 mb-6 group-hover:scale-110 transition-transform duration-500">
                <Search className="w-10 h-10 sm:w-12 sm:h-12 opacity-20" />
              </div>
              <p className="text-sm sm:text-lg font-medium text-slate-400 max-w-xs leading-relaxed">
                Menunggu ide brilian Anda untuk diproses...
              </p>
            </div>
          ) : (
            <div className="w-full space-y-10 sm:space-y-12 flex flex-col items-center animate-in zoom-in-95 duration-700">
              {/* Responsive Scale for the preview */}
              <div className="w-full flex justify-center perspective-1000">
                <div className="relative group">
                  {/* Decorative glow behind the carousel */}
                  <div className="absolute -inset-4 bg-blue-500/10 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative overflow-hidden rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-white/5">
                    <div className="scale-[0.28] min-[400px]:scale-[0.35] sm:scale-[0.4] md:scale-[0.45] lg:scale-[0.5] origin-top h-[380px] min-[400px]:h-[480px] sm:h-[540px] md:h-[610px] lg:h-[680px] transition-all duration-500 ease-out">
                      <CarouselSlide
                        title={result.slides[activeSlide].title}
                        content={result.slides[activeSlide].content}
                        slideNumber={activeSlide + 1}
                        totalSlides={result.slides.length}
                        brandName={result.brandName}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center w-full justify-center">
                <div className="flex items-center gap-6 sm:gap-10 bg-slate-900/80 backdrop-blur-xl px-5 py-3 sm:px-8 sm:py-4 rounded-3xl border border-slate-800 shadow-2xl relative">
                  <button
                    onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
                    disabled={activeSlide === 0}
                    className="p-2.5 hover:bg-slate-800 rounded-2xl disabled:opacity-10 transition-all active:scale-90"
                  >
                    <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  </button>

                  <div className="flex flex-col items-center">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                      Halaman
                    </div>
                    <div className="text-sm sm:text-base font-bold tabular-nums text-white flex items-center gap-2">
                      <span className="text-blue-500">{activeSlide + 1}</span>
                      <span className="text-slate-700">/</span>
                      <span>{result.slides.length}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveSlide((prev) => Math.min(result.slides!.length - 1, prev + 1))}
                    disabled={activeSlide === result.slides.length - 1}
                    className="p-2.5 hover:bg-slate-800 rounded-2xl disabled:opacity-10 transition-all active:scale-90"
                  >
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  </button>
                </div>
              </div>

              {/* Caption Section */}
              {result.caption && (
                <div className="w-full max-w-xl animate-in slide-in-from-top-8 duration-700 delay-200">
                  <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-[2rem] overflow-hidden shadow-2xl">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-5 gap-4 border-b border-slate-800/50 bg-slate-900/40">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                          Copywriting AI
                        </h3>
                      </div>
                      <button
                        onClick={handleCopyCaption}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-xs font-bold transition-all active:scale-95 border border-blue-500/20"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Berhasil Disalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 opacity-60" />
                            <span>Salin Caption</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-8">
                      <p className="text-slate-400 text-sm sm:text-base leading-relaxed whitespace-pre-wrap selection:bg-blue-500/40 first-letter:text-2xl first-letter:font-bold first-letter:text-blue-500 first-letter:mr-1">
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
