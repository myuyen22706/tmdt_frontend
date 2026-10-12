"use client";

import React, { useState, useEffect } from "react";
import { Compass, PhoneCall, ArrowUp, MessageSquare } from "lucide-react";

interface FloatingWidgetsProps {
  onOpenAdvisor: () => void;
}

export default function FloatingWidgets({ onOpenAdvisor }: FloatingWidgetsProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Nút Tư vấn Size nổi bật */}
      <button
        onClick={onOpenAdvisor}
        className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase px-4 py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-transform border-2 border-white group"
        title="Tư vấn chọn size thông minh"
      >
        <Compass className="w-5 h-5 text-red-700 animate-spin-slow" />
        <span className="hidden sm:inline">Tư vấn Size (AI)</span>
      </button>

      {/* Nút Zalo / Hỗ trợ */}
      <a
        href="https://zalo.me"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform border-2 border-white"
        title="Chat Zalo tư vấn võ phục"
      >
        <MessageSquare className="w-5 h-5" />
      </a>

      {/* Nút Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 border border-white/20"
          title="Lên đầu trang"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
