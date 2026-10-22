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
    <section id="products-catalog" className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Trang phục thi đấu & luyện tập
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-3">
            Võ Phục & Phụ Kiện Chuẩn Quy Cách
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Form chuẩn theo quy định của các Liên đoàn võ thuật. Vải dệt Kaki Cotton thoáng khí, đòn thế uyển chuyển và bền bỉ trong từng buổi tập.
          </p>
        </div>

        {/* 1. TABS CHỌN MÔN VÕ */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {[
            { id: "all", label: "Tất Cả Môn Võ" },
            { id: "vovinam", label: "Vovinam" },
            { id: "taekwondo", label: "Taekwondo (WTF)" },
            { id: "karate", label: "Karatedo" },
            { id: "vo_co_truyen", label: "Võ Cổ Truyền" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedMartialArt(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedMartialArt === tab.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 2. THANH BỘ LỌC CẤP ĐAI & SẮP XẾP */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 mb-8 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Lọc theo Cấp Đai */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-semibold text-slate-700 flex items-center gap-1 mr-1">
              <Tag className="w-3.5 h-3.5 text-slate-400" /> Cấp đai:
            </span>
            {[
              { id: "all", label: "Tất cả" },
              { id: "lam_dai", label: "Lam đai" },
              { id: "hoang_dai", label: "Hoàng đai" },
              { id: "dai_do", label: "Đai đỏ" },
              { id: "dai_den", label: "Đai đen" },
              { id: "dai_trang", label: "Đai trắng" },
            ].map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBeltRank(b.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedBeltRank === b.id
                    ? "bg-slate-900 text-white font-semibold"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* Sắp xếp */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-slate-500 font-medium">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-slate-400 cursor-pointer"
            >
              <option value="popular">Bán chạy nhất</option>
              <option value="price_asc">Giá: Thấp đến Cao</option>
              <option value="price_desc">Giá: Cao đến Thấp</option>
            </select>
          </div>

        </div>

        {/* 3. LƯỚI SẢN PHẨM CHÍNH - NÚT MUA HIỆN LUÔN */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-14 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-500 text-xs sm:text-sm">Không tìm thấy sản phẩm phù hợp với bộ lọc đã chọn.</p>
            <button
              onClick={() => {
                setSelectedMartialArt("all");
                setSelectedBeltRank("all");
              }}
              className="mt-3 text-xs font-semibold text-slate-900 hover:underline cursor-pointer"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
              >
                {/* HÌNH ẢNH MẪU SẢN PHẨM */}
                <div className="relative w-full h-56 bg-slate-50 flex items-center justify-center p-4 overflow-hidden border-b border-slate-100">
                  {/* Badge Môn võ & Cấp đai */}
                  <div className="absolute top-2.5 left-2.5 z-10 flex flex-wrap gap-1">
                    <span className="bg-slate-900 text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded shadow-xs">
                      {prod.martial_art_label}
                    </span>
                    {prod.belt_rank_label && (
                      <span className="bg-amber-100 text-amber-900 border border-amber-200/80 text-[10px] font-semibold uppercase px-2 py-0.5 rounded">
                        {prod.belt_rank_label}
                      </span>
                    )}
                  </div>

                  {prod.isCustomizable && (
                    <span className="absolute top-2.5 right-2.5 z-10 text-[10px] font-medium text-slate-600 bg-white/95 border border-slate-200 px-2 py-0.5 rounded shadow-xs">
                      Thêu tên
                    </span>
                  )}

                  <Image
                    src="/mau_1.jpg"
                    alt={prod.name}
                    fill
                    className="object-contain p-4 group-hover:scale-104 transition-transform duration-300"
                  />
                </div>

                {/* THÔNG TIN CHI TIẾT */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Đánh giá sao & Thông tin size */}
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-slate-800 text-[11px]">{prod.rating}</span>
                        <span className="text-slate-400 text-[11px]">({prod.reviewsCount})</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {prod.sizes.length} cỡ size
                      </span>
                    </div>

                    {/* Tên sản phẩm */}
                    <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                      {prod.name}
                    </h3>

                    {/* Chất liệu */}
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                      {prod.material}
                    </p>
                  </div>

                  {/* PHẦN GIÁ TIỀN & NÚT MUA HIỆN LUÔN */}
                  <div className="pt-3 border-t border-slate-100 space-y-2.5">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                          {prod.price.toLocaleString("vi-VN")}₫
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          {prod.originalPrice.toLocaleString("vi-VN")}₫
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                        -{Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100)}%
                      </span>
                    </div>

                    {/* NÚT MUA VÀ NÚT TƯ VẤN SIZE HIỆN SẴN LUÔN - KHÔNG BỊ ẨN */}
                    <div className="flex items-center gap-2 pt-0.5">
                      <button
                        type="button"
                        onClick={() => handleOpenQuickAdd(prod)}
                        className="flex-1 py-2 px-3 bg-slate-900 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-white" />
                        <span>Thêm vào giỏ</span>
                      </button>

                      <button
                        type="button"
                        onClick={onOpenAdvisor}
                        className="p-2 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-700 rounded-xl transition-colors cursor-pointer flex-shrink-0"
                        title="Tư vấn size phù hợp"
                        aria-label="Tư vấn size"
                      >
                        <Compass className="w-4 h-4 text-slate-600" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* MODAL CHỌN SIZE & TÙY CHỌN THÊU TÊN NHANH KHI BẤM "THÊM GIỎ" */}
        {selectedProductForCart && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full shadow-xl p-5 sm:p-6 border border-slate-200 space-y-4">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl p-1 border border-slate-200 flex-shrink-0">
                    <Image src="/mau_1.jpg" alt="Võ phục" width={48} height={48} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 line-clamp-1">{selectedProductForCart.name}</h4>
                    <span className="text-sm font-bold text-slate-900">
                      {selectedProductForCart.price.toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProductForCart(null)}
                  className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Chọn Size */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-700">Chọn cỡ size:</label>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProductForCart(null);
                      onOpenAdvisor();
                    }}
                    className="text-[11px] text-blue-700 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Compass className="w-3 h-3" /> Chưa rõ size? Tư vấn ngay
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {selectedProductForCart.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setChosenSize(s)}
                      className={`py-2 px-1 text-xs rounded-xl font-medium border transition-colors cursor-pointer ${
                        chosenSize === s
                          ? "bg-slate-900 text-white border-slate-900 shadow-xs"
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
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800">
                    <input
                      type="checkbox"
                      checked={isEmbroidered}
                      onChange={(e) => setIsEmbroidered(e.target.checked)}
                      className="w-4 h-4 text-slate-900 rounded accent-slate-900"
                    />
                    <span>Thêu họ tên võ sinh lên áo (+20.000₫)</span>
                  </label>
                  {isEmbroidered && (
                    <input
                      type="text"
                      placeholder="Nhập họ tên võ sinh (VD: Nguyễn Minh Quân)..."
                      value={embroideredName}
                      onChange={(e) => setEmbroideredName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                  )}
                </div>
              )}

              {/* Cam kết */}
              <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Hỗ trợ đổi size miễn phí trong 7 ngày nếu không vừa</span>
              </div>

              {/* Nút hoàn tất */}
              <button
                onClick={handleConfirmAddToCart}
                className="w-full py-2.5 bg-slate-900 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-xs uppercase rounded-xl tracking-wider shadow-sm transition-all cursor-pointer"
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
