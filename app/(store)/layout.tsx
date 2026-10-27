import type { ReactNode } from "react";
import { CartProvider } from "@/components/providers/CartProvider";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { FloatingWidgets } from "@/components/site/FloatingWidgets";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <div id="dau-trang" aria-hidden />
      <SiteHeader />
      <main id="noi-dung" className="min-h-[60dvh]">
        {children}
      </main>
      <SiteFooter />
      <CartDrawer />
      <FloatingWidgets />
    </CartProvider>
  );
}
