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
} from "lucide-react";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAdvisor: () => void;
  onOpenAuth?: () => void;
  user?: any;
  onLogout?: () => void;
  onSearch?: (q: string) => void;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenAdvisor,
  onOpenAuth,
  user,
  onLogout,
  onSearch,
}: NavbarProps) {

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    onSearch?.(q);
    // Luôn cuộn đến khu catalog để người dùng thấy kết quả
    const el = document.getElementById("products-catalog");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-40 w-full shadow-xs">
      {/* 2. MAIN HEADER */}
      <div className="bg-slate-900 text-white py-3.5 px-4 border-b border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 md:gap-6">
          
          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* BRAND LOGO */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-lg text-white group-hover:border-slate-500 transition-colors shadow-xs">
              VÕ
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center">
                VÕ THUẬT <span className="text-red-500 ml-1">VIỆT NAM</span>
              </span>
              <span className="text-[10px] uppercase font-medium tracking-widest text-slate-400">
                Võ Phục & Trang Bị
              </span>
            </div>
          </Link>

          {/* SEARCH BAR */}
          <form onSubmit={submitSearch} className="flex-1 max-w-2xl hidden md:block">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Tìm võ phục Vovinam, Taekwondo, Karate, Cổ Truyền, đai, bảo hộ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/90 text-white placeholder-slate-400 text-xs rounded-xl pl-4 pr-11 py-2.5 border border-slate-700/80 focus:outline-none focus:border-slate-400 focus:bg-slate-800 transition-all"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Tìm kiếm"
              >
                <Search className="w-3.5 h-3.5 text-slate-200" />
              </button>
            </div>
          </form>

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
            
            {/* Nút Tư vấn Size */}
            <button
              onClick={onOpenAdvisor}
              className="hidden lg:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Bảng tính size</span>
            </button>

            {/* Hotline hỗ trợ */}
            <div className="hidden xl:flex items-center gap-2 text-left">
              <div className="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center border border-slate-700">
                <PhoneCall className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex flex-col text-xs leading-tight">
                <span className="text-slate-400 text-[11px]">Hotline:</span>
                <strong className="text-white font-semibold">1900 6868</strong>
              </div>
            </div>

            {/* Tài khoản */}
            {user ? (
              <div className="flex items-center gap-2.5 text-xs text-slate-200 bg-slate-800/90 py-1.5 px-3 rounded-xl border border-slate-700">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                  user.role === 'admin' ? 'bg-red-600 text-white shadow-sm shadow-red-600/50' :
                  user.role === 'coach' ? 'bg-amber-500 text-slate-950 font-black' :
                  user.role === 'staff' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'
                }`}>
                  {user.role === 'admin' ? '👑' : user.role === 'coach' ? '🥋' : user.role === 'staff' ? '📦' : '👤'}
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white text-xs max-w-[120px] truncate">{user.full_name || 'Thành viên'}</span>
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase ${
                      user.role === 'admin' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      user.role === 'coach' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      user.role === 'staff' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                      'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {(user.role === "admin" || user.role === "staff") && (
                      <Link
                        href="/admin"
                        className="font-extrabold text-[10px] bg-red-600 hover:bg-red-700 text-white px-2 py-0.5 rounded shadow-xs hover:scale-105 transition-all flex items-center gap-1"
                      >
                        <span>⚙️ Quản trị</span>
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        onLogout?.();
                      }}
                      className="font-semibold text-[10px] text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenAuth}
                id="login-button"
                className="flex items-center gap-2 text-xs cursor-pointer text-white transition-all bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-4 py-2 rounded-xl shadow-md hover:scale-105 active:scale-95 border border-red-500 font-bold"
                title="Bấm để Đăng nhập hoặc Đăng ký tài khoản"
              >
                <User className="w-4 h-4 text-white" />
                <span>Đăng nhập</span>
              </button>
            )}

            {/* Giỏ hàng với Badge */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-xl border border-slate-700 transition-all cursor-pointer text-white"
              aria-label="Giỏ hàng"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-semibold text-xs text-white">
                Giỏ hàng
              </span>
            </button>

          </div>
        </div>

        {/* Mobile search bar */}
        <form onSubmit={submitSearch} className="mt-2.5 md:hidden">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Tìm võ phục, đai, giáp theo môn võ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 text-white placeholder-slate-400 text-xs rounded-xl pl-3.5 pr-10 py-2 border border-slate-700 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3 bg-slate-700 text-white rounded-lg flex items-center justify-center"
            >
              <Search className="w-3.5 h-3.5 text-slate-200" />
            </button>
          </div>
        </form>
      </div>

      {/* 3. SUB NAVIGATION (Dải danh mục & Lối tắt) */}
      <nav className="bg-white border-b border-slate-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs font-medium text-slate-700">
          <div className="flex items-center gap-7 py-2.5">
            <Link href="#martial-categories" className="text-slate-900 font-semibold hover:text-blue-700 flex items-center gap-1.5 transition-colors">
              <Menu className="w-3.5 h-3.5" /> Môn võ
            </Link>
            <Link href="#flash-deal" className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-red-600" /> Tuần lễ ưu đãi
            </Link>
            <Link href="#products-catalog" className="hover:text-slate-900 transition-colors">
              Vovinam
            </Link>
            <Link href="#products-catalog" className="hover:text-slate-900 transition-colors">
              Taekwondo (WTF)
            </Link>
            <Link href="#products-catalog" className="hover:text-slate-900 transition-colors">
              Karatedo
            </Link>
            <Link href="#products-catalog" className="hover:text-slate-900 transition-colors">
              Võ Cổ Truyền
            </Link>
            <Link href="#dojo-b2b" className="text-blue-700 hover:text-blue-900 font-semibold border-l pl-5 border-slate-200 transition-colors">
              Cổng đặt CLB Võ Đường
            </Link>
          </div>
          <div className="py-2 text-[11px] font-normal text-slate-500 flex items-center gap-3">
            <span>Tư vấn: 0987.654.321</span>
            <span className="text-emerald-700 font-medium">Đổi size 7 ngày miễn phí</span>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-950 text-white border-b border-slate-800 p-4 space-y-3">
          {user ? (
            <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-600/30 text-red-400 flex items-center justify-center font-bold text-xs">
                  {user.role === 'admin' ? '👑' : user.role === 'coach' ? '🥋' : user.role === 'staff' ? '📦' : '👤'}
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-white">{user.full_name}</div>
                  <div className="text-[10px] text-red-400 uppercase font-bold">{user.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {(user.role === "admin" || user.role === "staff") && (
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[10px] bg-red-600 text-white font-bold px-2 py-1 rounded"
                  >
                    Quản trị
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => {
                    onLogout?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-xs text-red-400 hover:text-red-300 font-medium"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                onOpenAuth();
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <User className="w-4 h-4" /> Đăng nhập / Đăng ký tài khoản
            </button>
          )}

          <button
            onClick={() => {
              onOpenAdvisor();
              setIsMobileMenuOpen(false);
            }}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 border border-slate-700"
          >
            <Compass className="w-4 h-4 text-amber-400" /> Bảng tính size chuẩn xác
          </button>
          <div className="grid grid-cols-2 gap-2 text-xs font-medium pt-1">
            <Link href="#martial-categories" onClick={() => setIsMobileMenuOpen(false)} className="bg-slate-900 p-2.5 rounded-xl text-center border border-slate-800">
              Môn Võ
            </Link>
            <Link href="#flash-deal" onClick={() => setIsMobileMenuOpen(false)} className="bg-slate-900 p-2.5 rounded-xl text-center border border-slate-800 text-red-400">
              Ưu Đãi
            </Link>
            <Link href="#products-catalog" onClick={() => setIsMobileMenuOpen(false)} className="bg-slate-900 p-2.5 rounded-xl text-center border border-slate-800">
              Võ Phục
            </Link>
            <Link href="#dojo-b2b" onClick={() => setIsMobileMenuOpen(false)} className="bg-slate-900 p-2.5 rounded-xl text-center border border-slate-800 text-blue-400">
              Võ Đường
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
