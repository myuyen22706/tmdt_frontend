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
    <section id="martial-categories" className="py-8 md:py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tiêu đề mục giống vidu_2.png */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 flex items-center gap-1.5">
              <Medal className="w-4 h-4 text-red-600" /> Danh mục chuyên biệt
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900 mt-1">
              Môn Võ & Phụ Kiện Bạn Yêu Thích
            </h2>
          </div>
          <span className="text-xs text-slate-500 mt-1 sm:mt-0 font-medium">
            Chọn môn phái để xem võ phục và đai chuẩn quy cách
          </span>
        </div>

        {/* Hàng 8 ô danh mục thiết kế chuẩn như vidu_2.png */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedMartialArt === cat.martial_art_filter;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.martial_art_filter, cat.category_filter)}
                className={`group flex flex-col items-center p-3 rounded-2xl transition-all duration-300 text-center relative border ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/70 shadow-md ring-2 ring-blue-500/30 scale-102"
                    : "border-slate-200/80 bg-slate-50 hover:bg-white hover:border-blue-400 hover:shadow-lg"
                }`}
              >
                {/* Badge nhỏ */}
                {cat.badge && (
                  <span className="absolute -top-2 right-2 bg-red-600 text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full shadow-sm">
                    {cat.badge}
                  </span>
                )}

                {/* Vùng icon khối đa giác / hình ảnh như vidu_2.png */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-white shadow-inner border border-slate-100 flex items-center justify-center p-2 mb-2.5 group-hover:scale-108 transition-transform overflow-hidden relative">
                  {/* Sử dụng ảnh sản phẩm mẫu mau_1.jpg cho các môn võ phục */}
                  <Image
                    src="/mau_1.jpg"
                    alt={cat.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain filter group-hover:contrast-105"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-tr ${cat.iconBg} opacity-15 mix-blend-multiply group-hover:opacity-25 transition-opacity`}
                  />
                </div>

                {/* Tên môn võ / danh mục */}
                <h3 className="text-xs sm:text-sm font-black text-slate-800 tracking-tight group-hover:text-blue-700 transition-colors line-clamp-1">
                  {cat.name}
                </h3>

                {/* Số lượng sản phẩm */}
                <span className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {cat.count}
                </span>

                <span className="text-[10px] text-blue-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                  Xem ngay →
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
