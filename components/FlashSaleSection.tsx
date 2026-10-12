"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Timer, ShoppingBag, Eye, Heart, Sparkles, ShieldCheck } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  martial_art: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  soldCount: number;
  colors: string[];
}

const FLASH_PRODUCTS: Product[] = [
  {
    id: "vov-flash-1",
    name: "Võ Phục Vovinam Tiêu Chuẩn Kaki Cotton 100%",
    category: "Võ phục",
    martial_art: "Vovinam",
    price: 240000,
    originalPrice: 295000,
    discount: 19,
    rating: 4.9,
    soldCount: 148,
    colors: ["#005baa", "#facc15", "#dc2626"],
  },
  {
    id: "tkd-flash-2",
    name: "Võ Phục Taekwondo Cổ Đen (WTF) Thoát Khí Siêu Nhẹ",
    category: "Võ phục",
    martial_art: "Taekwondo",
    price: 310000,
    originalPrice: 420000,
    discount: 26,
    rating: 4.8,
    soldCount: 92,
    colors: ["#ffffff", "#000000", "#dc2626"],
  },
  {
    id: "kar-flash-3",
    name: "Võ Phục Karatedo Vải Canvas 12oz Quyền & Đối Kháng",
    category: "Võ phục",
    martial_art: "Karate",
    price: 280000,
    originalPrice: 420000,
    discount: 33,
    rating: 5.0,
    soldCount: 65,
    colors: ["#ffffff", "#000000"],
  },
  {
    id: "vct-flash-4",
    name: "Võ Phục Võ Cổ Truyền Màu Đen Nút Bấm Chắc Chắn",
    category: "Võ phục",
    martial_art: "Võ Cổ Truyền",
    price: 235000,
    originalPrice: 290000,
    discount: 19,
    rating: 4.7,
    soldCount: 84,
    colors: ["#1e293b", "#dc2626"],
  },
  {
    id: "belt-flash-5",
    name: "Combo Đai Vovinam & Túi Đựng Võ Phục Chống Thấm",
    category: "Phụ kiện",
    martial_art: "Vovinam",
    price: 99000,
    originalPrice: 150000,
    discount: 34,
    rating: 4.9,
    soldCount: 210,
    colors: ["#005baa", "#facc15"],
  },
];

interface FlashSaleSectionProps {
  onAddToCart: (product: any, size: string) => void;
  onOpenAdvisor: () => void;
}

export default function FlashSaleSection({
  onAddToCart,
  onOpenAdvisor,
}: FlashSaleSectionProps) {
  // Đồng hồ đếm ngược sống động
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="flash-deal" className="py-10 bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Khối chính cấu trúc giống vidu_2.png */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* CỘT TRÁI: BANNER THÔNG BÁO FLASH SALE & ĐỒNG HỒ ĐẾM NGƯỢC (Tương tự vidu_2.png) */}
          <div className="lg:col-span-3 bg-gradient-to-br from-[#003875] via-[#002f5e] to-slate-950 text-white rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            {/* Họa tiết mờ chìm */}
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-red-600/20 rounded-full blur-2xl" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-xl" />

            <div className="space-y-4 relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600 text-white text-xs font-black uppercase rounded-md tracking-wider shadow">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> SIÊU KHUYẾN MÃI
              </span>

              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none text-white">
                &apos;BÃO DEAL&apos; <br />
                <span className="text-yellow-400">GIẢM GIÁ</span>
              </h2>

              <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full" />

              <p className="text-xs text-blue-100/90 leading-relaxed font-light">
                Cơ hội trang bị trọn bộ võ phục và đai chuẩn quy cách với mức trợ giá đặc biệt từ VÕ SPORT.
              </p>
            </div>

            {/* Khối đồng hồ đếm ngược (Style chuẩn như vidu_2.png: 73 Ngày | 15 Giờ | 11 Phút | 47 Giây) */}
            <div className="my-6 relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2.5 flex items-center gap-1.5">
                <Timer className="w-4 h-4 text-yellow-400" /> Chương trình kết thúc sau:
              </span>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-2 shadow-inner">
                  <span className="text-xl sm:text-2xl font-black text-white block">
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-lime-400 block mt-0.5">
                    Ngày
                  </span>
                </div>
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-2 shadow-inner">
                  <span className="text-xl sm:text-2xl font-black text-white block">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-lime-400 block mt-0.5">
                    Giờ
                  </span>
                </div>
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-2 shadow-inner">
                  <span className="text-xl sm:text-2xl font-black text-white block">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-lime-400 block mt-0.5">
                    Phút
                  </span>
                </div>
                <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-2 shadow-inner">
                  <span className="text-xl sm:text-2xl font-black text-yellow-400 block">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-lime-400 block mt-0.5">
                    Giây
                  </span>
                </div>
              </div>
            </div>

            {/* Nút Tư vấn size nhanh */}
            <button
              onClick={onOpenAdvisor}
              className="w-full py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-102 flex items-center justify-center gap-1.5 relative z-10"
            >
              <span>Tư vấn size miễn phí</span>
            </button>
          </div>

          {/* CỘT PHẢI: DANH SÁCH SẢN PHẨM FLASH SALE (Sử dụng ảnh mẫu mau_1.jpg) */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {FLASH_PRODUCTS.slice(0, 3).map((prod) => (
              <div
                key={prod.id}
                className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between relative"
              >
                {/* Góc badge giảm giá màu đỏ (giống vidu_2.png: Giảm 19%, Giảm 33%) */}
                <div className="absolute top-0 left-0 z-20">
                  <span className="bg-red-600 text-white text-xs font-black uppercase px-3 py-1.5 rounded-br-2xl shadow-md block">
                    Giảm {prod.discount}%
                  </span>
                </div>

                {/* Huy hiệu nhỏ Giảm ngay / Freeship */}
                <div className="absolute top-3 right-3 z-20">
                  <span className="w-10 h-10 rounded-full bg-yellow-400 text-slate-950 font-black text-[10px] flex items-center justify-center shadow text-center leading-tight">
                    HOT
                  </span>
                </div>

                {/* KHUNG ẢNH SẢN PHẨM: SỬ DỤNG HÌNH MẪU mau_1.jpg */}
                <div className="relative w-full h-56 sm:h-64 bg-slate-50 flex items-center justify-center p-4 overflow-hidden">
                  <Image
                    src="/mau_1.jpg"
                    alt={prod.name}
                    fill
                    className="object-contain p-2 group-hover:scale-108 transition-transform duration-500"
                  />
                  
                  {/* Action buttons hover */}
                  <div className="absolute inset-x-4 bottom-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onAddToCart(prod, "Size 4 (M)")}
                      className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase rounded-xl shadow-lg flex items-center gap-1.5 transition-transform hover:scale-105"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Mua ngay
                    </button>
                    <button
                      onClick={onOpenAdvisor}
                      className="p-2 bg-white hover:bg-slate-100 text-slate-700 rounded-xl shadow-md transition-colors"
                      title="Tư vấn size cho sản phẩm này"
                    >
                      <Eye className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                </div>

                {/* THÔNG TIN SẢN PHẨM */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  
                  {/* Chấm tròn cấp đai / màu sắc (như vidu_2.png) */}
                  <div className="flex items-center gap-1.5">
                    {prod.colors.map((color, idx) => (
                      <span
                        key={idx}
                        className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-xs inline-block"
                        style={{ backgroundColor: color }}
                        title="Tùy chọn đai/màu"
                      />
                    ))}
                    <span className="text-[11px] text-slate-400 ml-1">
                      • {prod.martial_art}
                    </span>
                  </div>

                  {/* Tên sản phẩm */}
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                    {prod.name}
                  </h3>

                  {/* Giá tiền nổi bật màu đỏ to */}
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-lg sm:text-xl font-black text-red-600">
                      {prod.price.toLocaleString("vi-VN")}₫
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      {prod.originalPrice.toLocaleString("vi-VN")}₫
                    </span>
                  </div>

                  {/* Cam kết & Đã bán */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" /> Đổi size miễn phí
                    </span>
                    <span>Đã bán {prod.soldCount}</span>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
