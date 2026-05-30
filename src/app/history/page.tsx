"use client";

import { useEffect, useState } from "react";
import { History, ArrowLeft, Calendar, User, MessageSquare, ExternalLink, Sparkles, Download, Loader2 } from "lucide-react";
import Link from "next/link";
import { getHistory, GenerationHistory } from "../actions/history";
import { CarouselSlide } from "@/components/CarouselSlide";

export default function HistoryPage() {
  const [history, setHistory] = useState<GenerationHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<GenerationHistory | null>(null);
  const [activeModalSlide, setActiveModalSlide] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const handleSelectItem = (item: GenerationHistory) => {
    setSelectedItem(item);
    setActiveModalSlide(0);
  };

  const handleDownload = async (item: GenerationHistory) => {
    if (!item.slides) return;
    setIsExporting(true);

    try {
      const response = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slides: item.slides,
          brandName: item.brandName,
          theme: item.theme || "financial"
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;

        // Generate a unique descriptive filename
        const sanitize = (text: string) => 
          text.toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");
        const cleanBrand = sanitize(item.brandName || "karusel");
        const cleanTopic = sanitize(item.topic || "konten");
        const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
        
        a.download = `${cleanBrand}-${cleanTopic}-${timestamp}.zip`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (error) {
      console.error("Download failed", error);
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getHistory();
      setHistory(data);
      setIsLoading(false);
    };
    fetchHistory();
  }, []);

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 p-4 sm:p-8 font-sans selection:bg-blue-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-indigo-600/10 blur-[100px] rounded-full" />
      </div>

      <header className="relative max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
        <div className="flex items-center gap-3">
          <Link href="/" className="bg-slate-800/50 p-2.5 rounded-xl hover:bg-slate-700 transition-all mr-2">
            <ArrowLeft className="w-5 h-5 text-blue-400" />
          </Link>
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
            <History className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Riwayat Konten
            </h1>
            <p className="text-[10px] sm:text-xs font-medium text-blue-400 uppercase tracking-[0.2em]">
              Koleksi Generasi Sebelumnya
            </p>
          </div>
        </div>
      </header>

      <div className="relative max-w-6xl mx-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-slate-500 font-medium">Memuat riwayat...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="bg-slate-900/40 backdrop-blur-xl border-2 border-dashed border-slate-800 p-20 rounded-[2.5rem] text-center">
            <div className="bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-800">
              <History className="w-8 h-8 text-slate-700" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Belum ada riwayat</h3>
            <p className="text-slate-500 max-w-xs mx-auto mb-8">
              Mulai buat konten karusel pertama Anda untuk melihatnya di sini.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-500 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              Buat Konten Sekarang
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleSelectItem(item)}
                className="group bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl hover:border-blue-500/50 transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <ExternalLink className="w-4 h-4 text-blue-400" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {item.topic}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <User className="w-3 h-3" />
                    <span>{item.brandName}</span>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-slate-800/50">
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-500/50" />
                      <span className="text-[10px] font-bold text-slate-500">
                        {item.slides?.length || 0} SLIDES
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full font-bold uppercase tracking-wider">
                      View
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal / Overlay for details */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          <div 
            className="absolute inset-0 bg-[#020617]/90 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          />
          <div className="relative bg-slate-900 border border-slate-800 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-all z-10"
            >
              <ArrowLeft className="w-5 h-5 rotate-90" />
            </button>

            <div className="p-8 sm:p-12">
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">{selectedItem.topic}</h2>
                    <p className="text-blue-400 font-medium">{selectedItem.brandName}</p>
                  </div>

                  <div className="bg-slate-950/50 border border-slate-800 p-6 rounded-3xl space-y-4">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Instagram Caption</h4>
                    <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap">
                      {selectedItem.caption}
                    </p>
                  </div>

                  {selectedItem.sources && selectedItem.sources.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sources</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.sources.map((s, i) => (
                          <a 
                            key={i} 
                            href={s} 
                            target="_blank" 
                            className="text-[10px] px-3 py-1.5 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors border border-slate-700"
                          >
                            {new URL(s).hostname}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center gap-6">
                  <div className="relative overflow-hidden w-[324px] sm:w-[432px] lg:w-[486px] h-[405px] sm:h-[540px] lg:h-[608px] rounded-3xl border border-slate-800 shadow-2xl">
                    <div className="scale-[0.3] sm:scale-[0.4] lg:scale-[0.45] origin-top-left transition-all duration-300 ease-out">
                      <CarouselSlide 
                        title={selectedItem.slides?.[activeModalSlide]?.title || ""}
                        content={selectedItem.slides?.[activeModalSlide]?.content || ""}
                        slideNumber={activeModalSlide + 1}
                        totalSlides={selectedItem.slides?.length || 0}
                        brandName={selectedItem.brandName}
                        theme={selectedItem.theme as any || "financial"}
                      />
                    </div>
                  </div>

                  {/* Navigation in Modal */}
                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-6 bg-slate-950/80 backdrop-blur-xl px-4 py-2 rounded-2xl border border-slate-800 shadow-lg">
                      <button
                        onClick={() => setActiveModalSlide((prev) => Math.max(0, prev - 1))}
                        disabled={activeModalSlide === 0}
                        className="p-2 hover:bg-slate-800 rounded-xl disabled:opacity-10 transition-all active:scale-90"
                      >
                        <ArrowLeft className="w-4 h-4 text-blue-400" />
                      </button>

                      <div className="flex items-center gap-1.5 text-xs font-bold text-white tabular-nums">
                        <span className="text-blue-500">{activeModalSlide + 1}</span>
                        <span className="text-slate-700">/</span>
                        <span>{selectedItem.slides?.length || 0}</span>
                      </div>

                      <button
                        onClick={() => setActiveModalSlide((prev) => Math.min((selectedItem.slides?.length || 1) - 1, prev + 1))}
                        disabled={activeModalSlide === (selectedItem.slides?.length || 1) - 1}
                        className="p-2 hover:bg-slate-800 rounded-xl disabled:opacity-10 transition-all active:scale-90"
                      >
                        <ArrowLeft className="w-4 h-4 text-blue-400 rotate-180" />
                      </button>
                    </div>
                  </div>

                  <div className="w-full space-y-3">
                    <button
                      onClick={() => handleDownload(selectedItem)}
                      disabled={isExporting}
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-2xl hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 transition-all active:scale-[0.98] shadow-lg shadow-blue-500/25 border border-blue-500/35"
                    >
                      {isExporting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin text-white" />
                          <span>Mengekspor Slide...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5 text-white" />
                          <span>Ekspor Semua Slide</span>
                        </>
                      )}
                    </button>

                    <Link
                      href={`/?topic=${encodeURIComponent(selectedItem.topic)}&brandName=${encodeURIComponent(selectedItem.brandName || "")}&theme=${encodeURIComponent(selectedItem.theme || "financial")}`}
                      className="w-full block bg-slate-800 text-slate-300 hover:text-white font-bold py-4 rounded-2xl text-center hover:bg-slate-700 transition-all border border-slate-700/50"
                    >
                      Gunakan Kembali Topik Ini
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
