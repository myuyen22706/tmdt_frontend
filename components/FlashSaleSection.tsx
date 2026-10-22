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
    <section id="flash-deal" className="py-12 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Khối chính Flash Sale */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* CỘT TRÁI: BANNER THÔNG BÁO FLASH SALE & ĐỒNG HỒ ĐẾM NGƯỢC */}
          <div className="lg:col-span-4 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="space-y-3 relative z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-600 text-white text-[11px] font-semibold uppercase rounded-md tracking-wider">
                Ưu đãi có hạn
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Tuần Lễ Trang Bị <br />
                <span className="text-amber-400">Võ Sinh Mới</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Trợ giá trực tiếp cho học viên chuẩn bị kỳ thi lên đai hoặc gia nhập võ đường. Cam kết chuẩn form liên đoàn, 1 đổi 1 tận nơi.
              </p>
            </div>

            {/* Khối đồng hồ đếm ngược thiết kế tinh gọn, sang trọng */}
            <div className="my-6 relative z-10">
              <span className="text-xs font-medium text-slate-400 block mb-2.5 flex items-center gap-1.5">
                <Timer className="w-4 h-4 text-amber-400" /> Kết thúc trong:
              </span>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-2.5">
                  <span className="text-xl sm:text-2xl font-bold text-white block tracking-tight">
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase font-medium text-slate-400 block mt-0.5">
                    Ngày
                  </span>
                </div>
                <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-2.5">
                  <span className="text-xl sm:text-2xl font-bold text-white block tracking-tight">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase font-medium text-slate-400 block mt-0.5">
                    Giờ
                  </span>
                </div>
                <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-2.5">
                  <span className="text-xl sm:text-2xl font-bold text-white block tracking-tight">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase font-medium text-slate-400 block mt-0.5">
                    Phút
                  </span>
                </div>
                <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-2.5">
                  <span className="text-xl sm:text-2xl font-bold text-amber-400 block tracking-tight">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase font-medium text-slate-400 block mt-0.5">
                    Giây
                  </span>
                </div>
              </div>
            </div>

            {/* Nút Tư vấn size nhanh */}
            <button
              type="button"
              onClick={onOpenAdvisor}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs tracking-wide transition-all border border-slate-700 hover:border-slate-600 flex items-center justify-center gap-2 relative z-10 cursor-pointer"
            >
              <span>Xem bảng tính size cho võ sinh</span>
            </button>
          </div>

          {/* CỘT PHẢI: DANH SÁCH SẢN PHẨM FLASH SALE - NÚT MUA HIỆN LUÔN */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {FLASH_PRODUCTS.slice(0, 3).map((prod) => (
              <div
                key={prod.id}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
              >
                {/* KHUNG ẢNH SẢN PHẨM */}
                <div className="relative w-full h-52 sm:h-56 bg-slate-50 flex items-center justify-center p-4 overflow-hidden border-b border-slate-100">
                  {/* Badge giảm giá */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-xs">
                      -{prod.discount}%
                    </span>
                  </div>

                  {/* Badge Môn võ */}
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <span className="bg-white/95 border border-slate-200 text-slate-700 font-semibold text-[10px] px-2 py-0.5 rounded shadow-xs">
                      {prod.martial_art}
                    </span>
                  </div>

                  <Image
                    src="/mau_1.jpg"
                    alt={prod.name}
                    fill
                    className="object-contain p-3 group-hover:scale-104 transition-transform duration-300"
                  />
                </div>

                {/* THÔNG TIN SẢN PHẨM */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  
                  <div>
                    {/* Tùy chọn màu sắc & Đã bán */}
                    <div className="flex items-center justify-between mb-1.5 text-xs">
                      <div className="flex items-center gap-1.5">
                        {prod.colors.map((color, idx) => (
                          <span
                            key={idx}
                            className="w-3 h-3 rounded-full border border-slate-300 inline-block"
                            style={{ backgroundColor: color }}
                            title="Tùy chọn đai/màu"
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">
                        Đã bán {prod.soldCount}
                      </span>
                    </div>

                    {/* Tên sản phẩm */}
                    <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                      {prod.name}
                    </h3>
                  </div>

                  {/* GIÁ TIỀN & NÚT MUA HIỆN LUÔN */}
                  <div className="pt-2 border-t border-slate-100 space-y-2.5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                        {prod.price.toLocaleString("vi-VN")}₫
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        {prod.originalPrice.toLocaleString("vi-VN")}₫
                      </span>
                    </div>

                    {/* HÀNG NÚT MUA LUÔN HIỆN SẴN */}
                    <div className="flex items-center gap-2 pt-0.5">
                      <button
                        type="button"
                        onClick={() => onAddToCart(prod, "Size 4 (M)")}
                        className="flex-1 py-2 px-3 bg-slate-900 hover:bg-red-600 active:scale-[0.98] text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-white" />
                        <span>Thêm vào giỏ</span>
                      </button>

                      <button
                        type="button"
                        onClick={onOpenAdvisor}
                        className="p-2 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-700 rounded-xl transition-colors cursor-pointer flex-shrink-0"
                        title="Tư vấn size cho sản phẩm này"
                        aria-label="Tư vấn size"
                      >
                        <Eye className="w-4 h-4 text-slate-600" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-slate-500 pt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>Đổi size 7 ngày miễn phí</span>
                    </div>
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
