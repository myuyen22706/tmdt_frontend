"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Filter,
  Star,
  ShoppingBag,
  Sparkles,
  Compass,
  Check,
  ShieldCheck,
  Tag,
  SlidersHorizontal,
} from "lucide-react";

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  martial_art: "vovinam" | "taekwondo" | "karate" | "vo_co_truyen";
  martial_art_label: string;
  category: "vo_phuc" | "dai" | "bao_ho" | "phu_kien";
  belt_rank?: "lam_dai" | "hoang_dai" | "dai_den" | "dai_trang" | "dai_do";
  belt_rank_label?: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  material: string;
  sizes: string[];
  isCustomizable: boolean;
}

const CATALOG_DATA: ProductItem[] = [
  {
    id: "prod-vov-1",
    name: "Võ Phục Vovinam Tiêu Chuẩn Việt Võ Đạo (Kaki Cotton)",
    slug: "vo-phuc-vovinam-tieu-chuan",
    martial_art: "vovinam",
    martial_art_label: "Vovinam",
    category: "vo_phuc",
    belt_rank: "lam_dai",
    belt_rank_label: "Lam đai",
    price: 240000,
    originalPrice: 280000,
    rating: 4.9,
    reviewsCount: 124,
    material: "Vải Kaki 100% Cotton thấm mồ hôi",
    sizes: ["Size 0 (Trẻ em)", "Size 1", "Size 2", "Size 3 (S)", "Size 4 (M)", "Size 5 (L)", "Size 6 (XL)"],
    isCustomizable: true,
  },
  {
    id: "prod-vov-2",
    name: "Võ Phục Vovinam Cao Cấp Hoàng Đai / Huấn Luyện Viên",
    slug: "vo-phuc-vovinam-hoang-dai",
    martial_art: "vovinam",
    martial_art_label: "Vovinam",
    category: "vo_phuc",
    belt_rank: "hoang_dai",
    belt_rank_label: "Hoàng đai",
    price: 360000,
    originalPrice: 420000,
    rating: 5.0,
    reviewsCount: 89,
    material: "Vải Canvas 14oz dệt thoi gân nổi siêu bền",
    sizes: ["Size 3 (S)", "Size 4 (M)", "Size 5 (L)", "Size 6 (XL)", "Size 7 (XXL)"],
    isCustomizable: true,
  },
  {
    id: "prod-tkd-1",
    name: "Võ Phục Taekwondo Cổ Đen (WTF) Thoát Khí Siêu Nhẹ",
    slug: "vo-phuc-taekwondo-co-den",
    martial_art: "taekwondo",
    martial_art_label: "Taekwondo",
    category: "vo_phuc",
    belt_rank: "dai_den",
    belt_rank_label: "Đai đen",
    price: 320000,
    originalPrice: 380000,
    rating: 4.8,
    reviewsCount: 76,
    material: "Poly-Cotton dập gân tổ ong thoát khí",
    sizes: ["Size 1", "Size 2", "Size 3 (S)", "Size 4 (M)", "Size 5 (L)"],
    isCustomizable: true,
  },
  {
    id: "prod-tkd-2",
    name: "Võ Phục Taekwondo Cổ Trắng Cho Người Mới Bắt Đầu",
    slug: "vo-phuc-taekwondo-co-trang",
    martial_art: "taekwondo",
    martial_art_label: "Taekwondo",
    category: "vo_phuc",
    belt_rank: "dai_trang",
    belt_rank_label: "Đai trắng",
    price: 220000,
    originalPrice: 260000,
    rating: 4.7,
    reviewsCount: 45,
    material: "Vải Kaki mềm nhẹ cho thiếu nhi",
    sizes: ["Size 00 (Trẻ em)", "Size 0", "Size 1", "Size 2", "Size 3 (S)"],
    isCustomizable: false,
  },
  {
    id: "prod-kar-1",
    name: "Võ Phục Karatedo Kata Vải Nặng Dày Dặn Tiêu Chuẩn",
    slug: "vo-phuc-karatedo-kata",
    martial_art: "karate",
    martial_art_label: "Karatedo",
    category: "vo_phuc",
    belt_rank: "dai_trang",
    belt_rank_label: "Đai trắng",
    price: 290000,
    originalPrice: 340000,
    rating: 4.9,
    reviewsCount: 52,
    material: "Vải Canvas 12oz phát ra tiếng vút khi ra đòn",
    sizes: ["Size 2", "Size 3 (S)", "Size 4 (M)", "Size 5 (L)"],
    isCustomizable: true,
  },
  {
    id: "prod-kar-2",
    name: "Võ Phục Karate Kumite Thi Đấu Đối Kháng Co Giãn",
    slug: "vo-phuc-karate-kumite",
    martial_art: "karate",
    martial_art_label: "Karatedo",
    category: "vo_phuc",
    belt_rank: "dai_den",
    belt_rank_label: "Đai đen",
    price: 340000,
    originalPrice: 400000,
    rating: 5.0,
    reviewsCount: 38,
    material: "Microfiber thể thao siêu nhẹ không dính mồ hôi",
    sizes: ["Size 3 (S)", "Size 4 (M)", "Size 5 (L)", "Size 6 (XL)"],
    isCustomizable: true,
  },
  {
    id: "prod-vct-1",
    name: "Võ Phục Võ Cổ Truyền Màu Đen Cúc Bấm Kim Loại",
    slug: "vo-phuc-co-truyen-den",
    martial_art: "vo_co_truyen",
    martial_art_label: "Võ Cổ Truyền",
    category: "vo_phuc",
    belt_rank: "dai_den",
    belt_rank_label: "Đai đen",
    price: 230000,
    originalPrice: 270000,
    rating: 4.8,
    reviewsCount: 68,
    material: "Vải Kaki đen tuyền dệt chéo chống phai màu",
    sizes: ["Size 1", "Size 2", "Size 3 (S)", "Size 4 (M)", "Size 5 (L)"],
    isCustomizable: true,
  },
  {
    id: "prod-belt-1",
    name: "Đai Vovinam Lam Đai Tiêu Chuẩn Thêu Chữ Nổi",
    slug: "dai-vovinam-lam-dai",
    martial_art: "vovinam",
    martial_art_label: "Vovinam",
    category: "dai",
    belt_rank: "lam_dai",
    belt_rank_label: "Lam đai",
    price: 45000,
    originalPrice: 60000,
    rating: 4.9,
    reviewsCount: 198,
    material: "Vải đai nhiều lớp, may 8 đường chỉ thẳng tắp",
    sizes: ["2.0m", "2.2m", "2.5m", "2.8m"],
    isCustomizable: true,
  },
];

interface ProductCatalogSectionProps {
  onAddToCart: (product: ProductItem, size: string, isEmbroidered?: boolean, embroideredName?: string) => void;
  onOpenAdvisor: () => void;
  selectedMartialArtProp?: string;
}

export default function ProductCatalogSection({
  onAddToCart,
  onOpenAdvisor,
  selectedMartialArtProp,
}: ProductCatalogSectionProps) {
  const [selectedMartialArt, setSelectedMartialArt] = useState<string>(selectedMartialArtProp || "all");
  const [selectedBeltRank, setSelectedBeltRank] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");

  // State cho modal chọn size & thêu tên nhanh khi thêm vào giỏ
  const [selectedProductForCart, setSelectedProductForCart] = useState<ProductItem | null>(null);
  const [chosenSize, setChosenSize] = useState<string>("Size 4 (M)");
  const [isEmbroidered, setIsEmbroidered] = useState<boolean>(false);
  const [embroideredName, setEmbroideredName] = useState<string>("");

  // Lọc sản phẩm theo Môn võ & Cấp đai (USP #2)
  const filteredProducts = useMemo(() => {
    return CATALOG_DATA.filter((p) => {
      if (selectedMartialArt !== "all" && p.martial_art !== selectedMartialArt) return false;
      if (selectedBeltRank !== "all" && p.belt_rank !== selectedBeltRank) return false;
      if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      return b.rating - a.rating;
    });
  }, [selectedMartialArt, selectedBeltRank, selectedCategory, sortBy]);

  const handleOpenQuickAdd = (product: ProductItem) => {
    setSelectedProductForCart(product);
    setChosenSize(product.sizes[2] || product.sizes[0]);
    setIsEmbroidered(false);
    setEmbroideredName("");
  };

  const handleConfirmAddToCart = () => {
    if (!selectedProductForCart) return;
    onAddToCart(selectedProductForCart, chosenSize, isEmbroidered, embroideredName);
    setSelectedProductForCart(null);
  };

  return (
    <section id="products-catalog" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            ⭐ Tính Năng Điểm Nhấn #2: Lọc Môn Võ & Cấp Đai
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 mt-2">
            Võ Phục & Phụ Kiện Chuẩn Quy Cách
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Chọn môn võ và cấp đai của bạn để tìm võ phục chuẩn form, bền đẹp, được bảo hành đổi size miễn phí.
          </p>
        </div>

        {/* 1. TABS CHỌN MÔN VÕ (USP #2) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          {[
            { id: "all", label: "🥋 Tất Cả Môn Võ" },
            { id: "vovinam", label: "Vovinam (Việt Võ Đạo)" },
            { id: "taekwondo", label: "Taekwondo (WTF)" },
            { id: "karate", label: "Karatedo (Kata/Kumite)" },
            { id: "vo_co_truyen", label: "Võ Cổ Truyền" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedMartialArt(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedMartialArt === tab.id
                  ? "bg-blue-700 text-white shadow-md shadow-blue-700/20 scale-102"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 2. THANH BỘ LỌC CẤP ĐAI & LOẠI SẢN PHẨM (USP #2) */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
          
          {/* Lọc theo Cấp Đai */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-red-600" /> Cấp đai:
            </span>
            {[
              { id: "all", label: "Tất cả" },
              { id: "lam_dai", label: "Lam đai (Xanh)" },
              { id: "hoang_dai", label: "Hoàng đai (Vàng)" },
              { id: "dai_do", label: "Đai đỏ" },
              { id: "dai_den", label: "Đai đen" },
              { id: "dai_trang", label: "Đai trắng" },
            ].map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBeltRank(b.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  selectedBeltRank === b.id
                    ? "bg-red-600 text-white shadow-xs font-bold"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* Sắp xếp */}
          <div className="flex items-center gap-2 ml-auto text-xs">
            <span className="text-slate-500 font-medium">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="popular">Bán chạy nhất</option>
              <option value="price_asc">Giá: Thấp đến Cao</option>
              <option value="price_desc">Giá: Cao đến Thấp</option>
            </select>
          </div>

        </div>

        {/* 3. LƯỚI SẢN PHẨM CHÍNH (SỬ DỤNG HÌNH MẪU mau_1.jpg) */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-sm">Không tìm thấy sản phẩm phù hợp với bộ lọc đã chọn.</p>
            <button
              onClick={() => {
                setSelectedMartialArt("all");
                setSelectedBeltRank("all");
              }}
              className="mt-3 text-xs font-bold text-blue-600 hover:underline"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
              >
                {/* Badge Môn võ & Cấp đai */}
                <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1">
                  <span className="bg-blue-700 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                    {prod.martial_art_label}
                  </span>
                  {prod.belt_rank_label && (
                    <span className="bg-yellow-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                      {prod.belt_rank_label}
                    </span>
                  )}
                </div>

                {/* HÌNH ẢNH MẪU SẢN PHẨM: mau_1.jpg */}
                <div className="relative w-full h-56 bg-slate-50 flex items-center justify-center p-4 overflow-hidden border-b border-slate-100">
                  <Image
                    src="/mau_1.jpg"
                    alt={prod.name}
                    fill
                    className="object-contain p-2 group-hover:scale-108 transition-transform duration-500"
                  />
                  
                  {/* Nút hành động nhanh khi hover */}
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenQuickAdd(prod)}
                      className="flex-1 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-transform hover:scale-102"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Thêm giỏ
                    </button>
                    <button
                      onClick={onOpenAdvisor}
                      className="px-3 py-2 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs uppercase rounded-xl shadow-md flex items-center gap-1 transition-transform hover:scale-102"
                      title="Tư vấn size phù hợp"
                    >
                      <Compass className="w-3.5 h-3.5 text-red-700" /> Size
                    </button>
                  </div>
                </div>

                {/* THÔNG TIN CHI TIẾT */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
                  <div>
                    {/* Đánh giá sao */}
                    <div className="flex items-center gap-1 mb-1">
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-3.5 h-3.5 fill-yellow-400" />
                        <Star className="w-3.5 h-3.5 fill-yellow-400" />
                        <Star className="w-3.5 h-3.5 fill-yellow-400" />
                        <Star className="w-3.5 h-3.5 fill-yellow-400" />
                        <Star className="w-3.5 h-3.5 fill-yellow-400" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-700">
                        {prod.rating}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        ({prod.reviewsCount})
                      </span>
                    </div>

                    {/* Tên sản phẩm */}
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                      {prod.name}
                    </h3>

                    {/* Chất liệu */}
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                      {prod.material}
                    </p>
                  </div>

                  {/* Giá tiền */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black text-red-600">
                        {prod.price.toLocaleString("vi-VN")}₫
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        {prod.originalPrice.toLocaleString("vi-VN")}₫
                      </span>
                    </div>

                    {/* Tag thêu tên theo yêu cầu */}
                    {prod.isCustomizable && (
                      <span className="text-[10px] text-blue-700 font-semibold bg-blue-50 px-1.5 py-0.5 rounded mt-1.5 inline-block">
                        ✨ Hỗ trợ thêu tên võ sinh
                      </span>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* MODAL CHỌN SIZE & TÙY CHỌN THÊU TÊN NHANH KHI BẤM "THÊM GIỎ" */}
        {selectedProductForCart && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl p-6 border border-slate-200 space-y-4">
              <div className="flex items-start justify-between border-b pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-slate-50 rounded-xl p-1 border">
                    <Image src="/mau_1.jpg" alt="Võ phục" width={56} height={56} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{selectedProductForCart.name}</h4>
                    <span className="text-base font-black text-red-600">
                      {selectedProductForCart.price.toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProductForCart(null)}
                  className="text-slate-400 hover:text-slate-700"
                >
                  ✕
                </button>
              </div>

              {/* Chọn Size */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Chọn size võ phục:</label>
                <div className="grid grid-cols-3 gap-2">
                  {selectedProductForCart.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setChosenSize(s)}
                      className={`py-2 px-1 text-xs rounded-xl font-bold border transition-colors ${
                        chosenSize === s
                          ? "bg-blue-700 text-white border-blue-700 shadow-xs"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tùy chọn thêu tên võ sinh */}
              {selectedProductForCart.isCustomizable && (
                <div className="bg-blue-50/80 p-3 rounded-2xl border border-blue-200 text-xs space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-blue-900">
                    <input
                      type="checkbox"
                      checked={isEmbroidered}
                      onChange={(e) => setIsEmbroidered(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span>Thêu tên võ sinh lên áo (+20.000₫)</span>
                  </label>
                  {isEmbroidered && (
                    <input
                      type="text"
                      placeholder="Nhập họ tên võ sinh cần thêu (VD: Nguyễn Minh Quân)..."
                      value={embroideredName}
                      onChange={(e) => setEmbroideredName(e.target.value)}
                      className="w-full bg-white border border-blue-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  )}
                </div>
              )}

              {/* Cam kết */}
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>Cam kết đổi size miễn phí 1 lần trong 7 ngày nếu không vừa</span>
              </div>

              {/* Nút hoàn tất */}
              <button
                onClick={handleConfirmAddToCart}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase rounded-xl tracking-wider shadow-lg transition-transform hover:scale-102"
              >
                Xác nhận thêm vào giỏ hàng
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
