"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, Sparkles, Users, Award } from "lucide-react";

interface HeroBannerProps {
  onOpenAdvisor: () => void;
}

export default function HeroBanner({ onOpenAdvisor }: HeroBannerProps) {
  return (
    <section className="relative w-full bg-slate-900 overflow-hidden">
      {/* Container Banner to theo phong cách vi_du.png */}
      <div className="relative min-h-[460px] md:min-h-[540px] lg:min-h-[580px] w-full flex items-center">
        
        {/* HÌNH ẢNH BANNER TO CHÍNH: vovi.jpg */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/vovi.jpg"
            alt="Đội tuyển Vovinam Việt Võ Đạo"
            fill
            priority
            className="object-cover object-center md:object-right opacity-85 scale-105 transition-transform duration-1000 ease-out hover:scale-100"
          />
          {/* Lớp phủ gradient chuyển sắc xanh dương - đỏ - đen tinh tế để làm nổi chữ */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-[#002f5e]/90 to-transparent w-full md:w-3/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent md:hidden" />
        </div>

        {/* NỘI DUNG OVERLAY TRÊN BANNER (Theo đúng cấu trúc Hot Deal như vi_du.png) */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full z-10">
          <div className="max-w-xl text-white space-y-4 md:space-y-6">
            
            {/* Tag Hot Deal */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-black uppercase tracking-widest backdrop-blur-sm border border-red-400/40 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              HOT DEAL • MÙA TỰU TRƯỜNG VÕ SINH
            </div>

            {/* Headline to và ấn tượng như vi_du.png: CÀNG MUA CÀNG GIẢM */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none text-white drop-shadow-md">
                CÀNG MUA <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500">
                  CÀNG GIẢM
                </span>
              </h1>
              <p className="text-sm md:text-base text-blue-100/90 font-medium pt-2">
                Thời gian áp dụng: <strong className="text-yellow-300 font-bold">01/10 – 31/10/2026</strong>
              </p>
            </div>

            {/* Mô tả giá trị cốt lõi */}
            <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed font-light line-clamp-3">
              Chuyên cung cấp võ phục <strong>Vovinam, Taekwondo, Karate, Võ Cổ Truyền</strong> chuẩn quy cách liên đoàn. Chất vải Kaki cotton 100% thấm hút mồ hôi, đòn thế vút sáng uy lực.
            </p>

            {/* 3 cam kết chất lượng */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-[11px] md:text-xs text-blue-200">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Đổi size miễn phí 1 lần</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10">
                <Award className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>Vải dệt thoi bền bỉ</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10 col-span-2 sm:col-span-1">
                <Users className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>Chiết khấu sỉ Võ đường</span>
              </div>
            </div>

            {/* NÚT KÊU GỌI HÀNH ĐỘNG (CTA) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Nút Tư vấn Size AI (Điểm nhấn lớn) */}
              <button
                onClick={onOpenAdvisor}
                className="px-5 py-3 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-yellow-500/20 transition-all hover:scale-105 active:scale-95"
              >
                <Compass className="w-4 h-4 text-red-700" />
                <span>Tư vấn Size Cho Tôi</span>
              </button>

              {/* Nút Xem chi tiết (Style đúng như vi_du.png) */}
              <Link
                href="#products-catalog"
                className="px-5 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all hover:translate-x-0.5"
              >
                <span>Xem chi tiết</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Nút Đặt Võ Đường B2B */}
              <Link
                href="#dojo-b2b"
                className="px-4 py-3 rounded-lg bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/20 backdrop-blur-sm transition-all"
              >
                Đặt Đơn Cho Võ Đường
              </Link>
            </div>

          </div>
        </div>

        {/* Thanh trượt indicators nhỏ ở đáy banner (như vi_du.png) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          <span className="w-6 h-2 rounded-full bg-yellow-400 transition-all" />
          <span className="w-2 h-2 rounded-full bg-white/50 hover:bg-white transition-all cursor-pointer" />
          <span className="w-2 h-2 rounded-full bg-white/50 hover:bg-white transition-all cursor-pointer" />
        </div>
      </div>
    </section>
  );
}
