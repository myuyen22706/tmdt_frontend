"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import MartialCategoryGrid from "@/components/MartialCategoryGrid";
import FlashSaleSection from "@/components/FlashSaleSection";
import ProductCatalogSection, { ProductItem } from "@/components/ProductCatalogSection";
import DojoB2BSection from "@/components/DojoB2BSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import SizeAdvisorModal from "@/components/SizeAdvisorModal";
import CartDrawer, { CartItemType } from "@/components/CartDrawer";
import FloatingWidgets from "@/components/FloatingWidgets";

export default function HomePage() {
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
      />

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
        />

        {/* 6. Cổng Đặt Đồng Phục Võ Đường & HLV (B2B) */}
        <DojoB2BSection />

        {/* 7. Cẩm nang & Kiến thức võ sinh */}
        <BlogSection />
      </main>

      {/* 8. Footer */}
      <Footer />

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
    </div>
  );
}
