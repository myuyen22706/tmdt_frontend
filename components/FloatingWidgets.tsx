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
      {/* Nút Bảng tính Size */}
      <button
        onClick={onOpenAdvisor}
        className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-3.5 py-2.5 rounded-full shadow-lg hover:scale-102 active:scale-98 transition-all border border-slate-700 group cursor-pointer"
        title="Bảng tính chọn size võ phục"
      >
        <Compass className="w-4 h-4 text-amber-400" />
        <span className="hidden sm:inline">Bảng tính size</span>
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
