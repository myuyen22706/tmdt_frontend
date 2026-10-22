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
    <section className="relative w-full bg-slate-950 overflow-hidden">
      <div className="relative min-h-[480px] md:min-h-[540px] lg:min-h-[580px] w-full flex items-center">
        
        {/* HÌNH ẢNH BANNER CHÍNH: vovi.jpg */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/vovi.jpg"
            alt="Đội tuyển Vovinam Việt Võ Đạo"
            fill
            priority
            className="object-cover object-center md:object-right opacity-75"
          />
          {/* Lớp phủ gradient sâu sang trọng làm nổi bật văn bản */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent w-full md:w-3/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent md:hidden" />
        </div>

        {/* NỘI DUNG HERO BANNER */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full z-10">
          <div className="max-w-xl text-white space-y-5">
            
            {/* Tag Nhận diện chất lượng */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 text-slate-200 text-xs font-medium tracking-wide border border-slate-700/80 backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Chuẩn quy cách Liên đoàn võ thuật 2026
            </div>

            {/* Headline chính sắc nét & đĩnh đạc */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
                Võ Phục Thi Đấu & <br className="hidden sm:inline" />
                <span className="text-slate-100">Luyện Tập Chuyên Nghiệp</span>
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-light pt-1">
                Chuyên cung cấp võ phục <strong>Vovinam, Taekwondo, Karate, Võ Cổ Truyền</strong> dệt thoi Kaki Cotton 100% thấm hút mồ hôi, đứng form quyền pháp và bền bỉ khi ra đòn.
              </p>
            </div>

            {/* 3 cam kết chất lượng */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs text-slate-300">
              <div className="flex items-center gap-2 bg-slate-900/70 backdrop-blur-xs px-3 py-2 rounded-xl border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Đổi size 7 ngày</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/70 backdrop-blur-xs px-3 py-2 rounded-xl border border-slate-800">
                <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Vải dệt thoi 100%</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/70 backdrop-blur-xs px-3 py-2 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                <Users className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Chiết khấu CLB</span>
              </div>
            </div>

            {/* NÚT KÊU GỌI HÀNH ĐỘNG (CTA) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Nút Xem danh mục sản phẩm */}
              <Link
                href="#products-catalog"
                className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-semibold text-xs sm:text-sm tracking-wide flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Xem bộ sưu tập</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Nút Bảng tính & Tư vấn size */}
              <button
                type="button"
                onClick={onOpenAdvisor}
                className="px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm border border-slate-700 backdrop-blur-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Bảng tính size</span>
              </button>

              {/* Nút Đặt đơn võ đường B2B */}
              <Link
                href="#dojo-b2b"
                className="px-4 py-3 text-slate-300 hover:text-white font-medium text-xs sm:text-sm transition-colors"
              >
                Dành cho HLV & Võ đường →
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
