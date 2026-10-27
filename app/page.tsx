"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import MartialCategoryGrid from "@/components/MartialCategoryGrid";
import FlashSaleSection from "@/components/FlashSaleSection";
import ProductCatalogSection, { ProductItem } from "@/components/ProductCatalogSection";
import DojoB2BSection from "@/components/DojoB2BSection";
import BlogSection from "@/components/BlogSection";
import SizeAdvisorModal from "@/components/SizeAdvisorModal";
import CartDrawer, { CartItemType } from "@/components/CartDrawer";
import FloatingWidgets from "@/components/FloatingWidgets";
import AuthModal from "@/components/AuthModal";

export default function HomePage() {
  // Trạng thái người dùng đăng nhập
  const [user, setUser] = useState<any>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user_info");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_info");
    setUser(null);
  };
  // Trạng thái giỏ hàng
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    {
      id: "cart-item-default",
      productId: "prod-vov-1",
      name: "Võ Phục Vovinam Tiêu Chuẩn (Kaki Cotton)",
      price: 240000,
      size: "Size 4 (M)",
      quantity: 1,
      isEmbroidered: true,
      embroideredName: "Nguyễn Văn Tuấn",
      embroideryFee: 20000,
    },
  ]);

  // Trạng thái Drawer và Modal
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [selectedMartialArt, setSelectedMartialArt] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Xử lý thêm vào giỏ
  const handleAddToCart = (
    product: any,
    size: string,
    isEmbroidered: boolean = false,
    embroideredName?: string
  ) => {
    const newItem: CartItemType = {
      id: `cart-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      size: size,
      quantity: 1,
      isEmbroidered: isEmbroidered,
      embroideredName: embroideredName,
      embroideryFee: isEmbroidered ? 20000 : 0,
    };
    setCartItems((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  // Cập nhật số lượng
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItemType[]
    );
  };

  // Xóa sản phẩm
  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Làm sạch giỏ sau khi đặt hàng
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Chọn môn võ từ hàng Icon trên để lọc xuống catalog
  const handleSelectCategory = (martialArt?: string) => {
    if (martialArt) {
      setSelectedMartialArt(martialArt);
      const catalogEl = document.getElementById("products-catalog");
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* 1. Header & Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        user={user}
        onLogout={handleLogout}
        onSearch={(q) => setSearchQuery(q)}
      />

      {/* Hero Greeting Bar: Hiển thị ngay khi đăng nhập thành công */}
      {user && (
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-red-950 border-b border-red-500/30 text-white py-3 px-4 sm:px-8 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xl shrink-0 shadow-md ${
                user.role === 'admin' ? 'bg-red-600/30 text-red-400 border border-red-500/50' :
                user.role === 'coach' ? 'bg-amber-500/30 text-amber-400 border border-amber-500/50' :
                user.role === 'staff' ? 'bg-purple-600/30 text-purple-400 border border-purple-500/50' :
                'bg-blue-600/30 text-blue-400 border border-blue-500/50'
              }`}>
                {user.role === 'admin' ? '👑' : user.role === 'coach' ? '🥋' : user.role === 'staff' ? '📦' : '👤'}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-white">Xin chào, {user.full_name}!</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                    user.role === 'admin' ? 'bg-red-600 text-white' :
                    user.role === 'coach' ? 'bg-amber-500 text-slate-950' :
                    user.role === 'staff' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'
                  }`}>
                    {user.role === 'admin' && '👑 Quản Trị Viên (Admin)'}
                    {user.role === 'coach' && '🥋 Huấn Luyện Viên CLB'}
                    {user.role === 'staff' && '📦 Nhân Viên Vận Hành'}
                    {user.role === 'customer' && '👤 Thành Viên Võ Sinh'}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  {user.role === 'admin' || user.role === 'staff'
                    ? 'Bạn có toàn quyền truy cập cơ sở dữ liệu MongoDB Atlas, quản lý 24 sản phẩm, duyệt đơn võ đường và kiểm soát tồn kho.'
                    : user.role === 'coach'
                    ? 'Tài khoản HLV được hưởng chiết khấu đến 30% khi mở chiến dịch may đồng phục cho võ đường.'
                    : 'Chào mừng bạn đến với Đai Trắng. Tận hưởng chính sách đổi size 1 đổi 1 trong 7 ngày.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {(user.role === 'admin' || user.role === 'staff') && (
                <Link
                  href="/admin"
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-red-600/30 hover:scale-105 transition-all flex items-center gap-1.5"
                >
                  <span>🚀 Truy Cập Trang Quản Trị</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
              {user.role === 'coach' && (
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("dojo-b2b-section");
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-md hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>🥋 Mở Cổng Võ Đường (B2B)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Banner */}
        <HeroBanner onOpenAdvisor={() => setIsAdvisorOpen(true)} />

        {/* 3. Lối tắt theo Môn võ */}
        <MartialCategoryGrid
          onSelectCategory={handleSelectCategory}
          selectedMartialArt={selectedMartialArt}
        />

        {/* 4. Tuần lễ ưu đãi võ sinh */}
        <FlashSaleSection
          onAddToCart={handleAddToCart}
          onOpenAdvisor={() => setIsAdvisorOpen(true)}
        />

        {/* 5. Danh mục Võ Phục & Bộ Lọc Môn Võ + Cấp Đai */}
        <ProductCatalogSection
          onAddToCart={handleAddToCart}
          onOpenAdvisor={() => setIsAdvisorOpen(true)}
          selectedMartialArtProp={selectedMartialArt}
          searchQuery={searchQuery}
        />

        {/* 6. Cổng Đặt Đồng Phục Võ Đường & HLV (B2B) */}
        <DojoB2BSection />

        {/* 7. Cẩm nang & Kiến thức võ sinh */}
        <BlogSection />
      </main>


      {/* 9. Modal Bảng Tính & Tư Vấn Size */}
      <SizeAdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        onSelectSizeForCart={(recommendedSize) => {
          handleAddToCart(
            {
              id: "prod-vov-recommended",
              name: "Võ Phục Vovinam Tiêu Chuẩn (Đã tư vấn size)",
              price: 240000,
            },
            recommendedSize
          );
        }}
      />

      {/* 10. Drawer Giỏ Hàng mini */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 11. Nút hành động nổi */}
      <FloatingWidgets onOpenAdvisor={() => setIsAdvisorOpen(true)} />

      {/* 12. Modal Đăng nhập / Đăng ký tài khoản (F01) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(u) => setUser(u)}
      />
    </div>
  );
}
