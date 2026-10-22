"use client";

import React from "react";
import Image from "next/image";
import { Swords, Shield, Medal, Briefcase, Shirt, Activity } from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  count: string;
  iconBg: string;
  badge?: string;
  martial_art_filter?: string;
  category_filter?: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: "vovinam",
    name: "Vovinam",
    count: "18 sản phẩm",
    iconBg: "from-blue-600 to-blue-800",
    badge: "Bán chạy",
    martial_art_filter: "vovinam",
  },
  {
    id: "taekwondo",
    name: "Taekwondo",
    count: "14 sản phẩm",
    iconBg: "from-red-600 to-rose-700",
    badge: "WTF",
    martial_art_filter: "taekwondo",
  },
  {
    id: "karate",
    name: "Karatedo",
    count: "12 sản phẩm",
    iconBg: "from-slate-700 to-slate-900",
    badge: "Kata/Kumite",
    martial_art_filter: "karate",
  },
  {
    id: "vct",
    name: "Võ Cổ Truyền",
    count: "16 sản phẩm",
    iconBg: "from-amber-600 to-amber-800",
    badge: "Truyền thống",
    martial_art_filter: "vo_co_truyen",
  },
  {
    id: "dai",
    name: "Đai Võ Thuật",
    count: "25 sản phẩm",
    iconBg: "from-yellow-500 to-amber-600",
    badge: "Đủ màu",
    category_filter: "dai",
  },
  {
    id: "baoho",
    name: "Đồ Bảo Hộ & Giáp",
    count: "19 sản phẩm",
    iconBg: "from-emerald-600 to-teal-800",
    badge: "An toàn",
    category_filter: "bao_ho",
  },
  {
    id: "tui",
    name: "Túi Đựng Võ Phục",
    count: "8 sản phẩm",
    iconBg: "from-indigo-600 to-blue-900",
    category_filter: "phu_kien",
  },
  {
    id: "phukien",
    name: "Binh Khí & Phụ Kiện",
    count: "22 sản phẩm",
    iconBg: "from-purple-600 to-purple-900",
    category_filter: "phu_kien",
  },
];

interface MartialCategoryGridProps {
  onSelectCategory: (martialArt?: string, category?: string) => void;
  selectedMartialArt?: string;
}

export default function MartialCategoryGrid({
  onSelectCategory,
  selectedMartialArt,
}: MartialCategoryGridProps) {
  return (
    <section id="martial-categories" className="py-10 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tiêu đề mục */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-slate-100">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Phân loại theo môn
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1">
              Môn Võ & Danh Mục Trang Bị
            </h2>
          </div>
          <span className="text-xs text-slate-500 mt-1 sm:mt-0 font-normal">
            Bấm chọn để lọc nhanh võ phục và đai chuẩn quy cách
          </span>
        </div>

        {/* Hàng 8 ô danh mục */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedMartialArt === cat.martial_art_filter;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.martial_art_filter, cat.category_filter)}
                className={`group flex flex-col items-center p-3 rounded-2xl transition-all duration-200 text-center relative border cursor-pointer ${
                  isSelected
                    ? "border-slate-900 bg-slate-50 shadow-xs"
                    : "border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                {/* Badge nhỏ */}
                {cat.badge && (
                  <span className="absolute -top-2 right-2 bg-slate-900 text-white text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded shadow-xs">
                    {cat.badge}
                  </span>
                )}

                {/* Vùng icon */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 mb-2 group-hover:scale-104 transition-transform overflow-hidden relative">
                  <Image
                    src="/mau_1.jpg"
                    alt={cat.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Tên môn võ / danh mục */}
                <h3 className="text-xs sm:text-sm font-semibold text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors line-clamp-1">
                  {cat.name}
                </h3>

                {/* Số lượng sản phẩm */}
                <span className="text-[11px] text-slate-400 mt-0.5 font-normal">
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
