"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  Search,
  PhoneCall,
  Store,
  User,
  ShoppingBag,
  Sparkles,
  ChevronDown,
  X,
  Compass,
  ShieldCheck,
  Award,
} from "lucide-react";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAdvisor: () => void;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenAdvisor,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm">
      {/* 1. TOP PROMOTION ANNOUNCEMENT BAR (Vàng & Đỏ nổi bật như vi_du.png) */}
      <div className="bg-[#ccff00] text-slate-900 py-1.5 px-4 text-xs md:text-sm font-semibold tracking-wide border-b border-lime-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto md:mx-0 text-center">
            <span className="bg-red-600 text-white text-[11px] uppercase px-2 py-0.5 rounded font-black tracking-wider animate-pulse">
              Ưu đãi độc quyền
            </span>
            <span>
              Giảm <strong className="text-red-700 font-extrabold">20% - 30%</strong> cho võ sinh mùa tựu trường & Đổi size miễn phí 1 lần!
            </span>
          </div>
          <div className="hidden md:flex items-center gap-5 text-xs text-slate-800">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-700" /> Chuẩn quy cách Liên đoàn
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-red-600" /> Cam kết vải Kaki 100% Cotton
            </span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (Tông màu Xanh dương đậm / Trắng đậm chất thể thao Sudes Sport) */}
      <div className="bg-[#002f5e] text-white py-3 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 md:gap-6">
          
          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* BRAND LOGO */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-red-600 via-blue-600 to-yellow-500 flex items-center justify-center shadow-lg shadow-blue-900/50 p-0.5">
              <div className="w-full h-full bg-[#002f5e] rounded-[10px] flex items-center justify-center font-black text-xl md:text-2xl tracking-tighter text-yellow-400 group-hover:scale-105 transition-transform">
                VÕ
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black italic tracking-wider leading-none text-white flex items-center">
                VÕ<span className="text-yellow-400">SPORT</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-blue-200">
                Võ Phục & Phụ Kiện
              </span>
            </div>
          </Link>

          {/* SEARCH BAR (To và rõ ràng như vidu_2.png) */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Tìm võ phục Vovinam, Taekwondo, Karate, đai, bảo hộ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-slate-800 placeholder-slate-400 text-sm rounded-lg pl-4 pr-12 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-inner"
              />
              <button
                type="button"
                className="absolute right-1 top-1 bottom-1 px-3.5 bg-blue-700 hover:bg-blue-800 text-white rounded-md flex items-center justify-center transition-colors shadow-sm"
                aria-label="Tìm kiếm"
              >
                <Search className="w-4 h-4 text-yellow-300" />
              </button>
            </div>
          </div>

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex items-center gap-3 md:gap-5 flex-shrink-0">
            
            {/* Nút Tư vấn Size AI (Điểm nhấn đặc biệt) */}
            <button
              onClick={onOpenAdvisor}
              className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-bold text-xs uppercase px-3 py-2 rounded-lg shadow-md hover:brightness-105 transition-all animate-glow"
            >
              <Compass className="w-4 h-4 text-red-700" />
              <span>Tư vấn Size (AI)</span>
            </button>

            {/* Hotline hỗ trợ */}
            <div className="hidden xl:flex items-center gap-2 text-left">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-xs leading-tight">
                <span className="text-slate-300">Hotline hỗ trợ:</span>
                <strong className="text-emerald-300 text-sm font-black">1900 6868</strong>
              </div>
            </div>

            {/* Hệ thống cửa hàng / Đối tác võ đường */}
            <div className="hidden lg:flex items-center gap-2 text-left">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <Store className="w-4 h-4 text-yellow-300" />
              </div>
              <div className="flex flex-col text-xs leading-tight">
                <span className="text-slate-300">Hệ thống CLB:</span>
                <span className="text-white font-bold text-xs">24 Võ đường</span>
              </div>
            </div>

            {/* Tài khoản */}
            <div className="flex items-center gap-1.5 text-xs cursor-pointer hover:text-yellow-300 transition-colors">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-[11px] text-slate-300">Tài khoản</span>
                <span className="font-bold text-xs flex items-center">
                  Đăng nhập <ChevronDown className="w-3 h-3 ml-0.5 opacity-70" />
                </span>
              </div>
            </div>

            {/* Giỏ hàng với Badge */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-blue-800/80 hover:bg-blue-700/80 px-3 py-2 rounded-lg border border-blue-500/40 transition-all cursor-pointer"
              aria-label="Giỏ hàng"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-yellow-400" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold text-xs text-white">
                Giỏ hàng
              </span>
            </button>

          </div>
        </div>

        {/* Mobile search bar */}
        <div className="mt-2.5 md:hidden">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Tìm võ phục, đai, giáp theo môn võ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-slate-800 placeholder-slate-400 text-xs rounded-lg pl-3 pr-10 py-2 focus:outline-none shadow-inner"
            />
            <button
              type="button"
              className="absolute right-1 top-1 bottom-1 px-3 bg-blue-700 text-white rounded-md flex items-center justify-center"
            >
              <Search className="w-3.5 h-3.5 text-yellow-300" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. SUB NAVIGATION (Dải danh mục & Lối tắt) */}
      <nav className="bg-white border-b border-slate-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wide">
          <div className="flex items-center gap-6 py-2.5">
            <Link href="#martial-categories" className="text-blue-800 hover:text-red-600 flex items-center gap-1 transition-colors">
              <Menu className="w-3.5 h-3.5" /> Danh mục môn võ
            </Link>
            <Link href="#flash-deal" className="text-red-600 hover:text-red-700 font-extrabold flex items-center gap-1 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> Bão Deal Hôm Nay
            </Link>
            <Link href="#products-catalog" className="hover:text-blue-700 transition-colors">
              Võ Phục Vovinam
            </Link>
            <Link href="#products-catalog" className="hover:text-blue-700 transition-colors">
              Taekwondo (WTF)
            </Link>
            <Link href="#products-catalog" className="hover:text-blue-700 transition-colors">
              Karatedo
            </Link>
            <Link href="#products-catalog" className="hover:text-blue-700 transition-colors">
              Võ Cổ Truyền
            </Link>
            <Link href="#dojo-b2b" className="text-blue-700 hover:text-blue-900 font-black border-l pl-4 border-slate-300 transition-colors">
              Đặt Đồng Phục Võ Đường (B2B)
            </Link>
          </div>
          <div className="py-2 text-[11px] font-medium text-slate-500 flex items-center gap-3">
            <span>📞 CSKH: 0987.654.321</span>
            <span className="text-emerald-600 font-semibold">● Miễn phí đổi size 1 lần</span>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 text-white border-b border-slate-800 p-4 space-y-3">
          <button
            onClick={() => {
              onOpenAdvisor();
              setIsMobileMenuOpen(false);
            }}
            className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-bold text-sm py-2.5 rounded-lg flex items-center justify-center gap-2 shadow"
          >
            <Compass className="w-4 h-4 text-red-700" /> Tư vấn Size thông minh (AI)
          </button>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold pt-2">
            <Link href="#martial-categories" onClick={() => setIsMobileMenuOpen(false)} className="bg-white/10 p-2.5 rounded text-center">
              Môn Võ
            </Link>
            <Link href="#flash-deal" onClick={() => setIsMobileMenuOpen(false)} className="bg-red-900/60 text-red-200 p-2.5 rounded text-center">
              Bão Deal
            </Link>
            <Link href="#products-catalog" onClick={() => setIsMobileMenuOpen(false)} className="bg-white/10 p-2.5 rounded text-center">
              Võ Phục
            </Link>
            <Link href="#dojo-b2b" onClick={() => setIsMobileMenuOpen(false)} className="bg-blue-900/60 text-blue-200 p-2.5 rounded text-center">
              Đặt Võ Đường
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
