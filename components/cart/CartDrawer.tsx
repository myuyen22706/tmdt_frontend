"use client";

import Link from "next/link";
import { HandbagSimpleIcon } from "@phosphor-icons/react";
import { formatVND } from "@/lib/format";
import { useCart } from "@/components/providers/CartProvider";
import { Drawer } from "@/components/ui/Drawer";
import { buttonClass } from "@/components/ui/styles";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { CartTotals, FreeshipProgress } from "@/components/cart/CartSummary";

export function CartDrawer() {
  const { cart, isOpen, close, ready } = useCart();
  const empty = cart.items.length === 0;

  return (
    <Drawer
      open={isOpen}
      onClose={close}
      title={empty ? "Giỏ hàng" : `Giỏ hàng (${cart.total_items})`}
      footer={
        !empty && (
          <div className="flex flex-col gap-4">
            <CartTotals cart={cart} />
            <div className="flex items-baseline justify-between border-t border-line pt-4">
              <span className="text-sm font-medium text-ink">Tạm tính</span>
              <span className="text-xl font-semibold text-ink tabular">{formatVND(cart.subtotal + cart.embroidery_total)}</span>
            </div>
            <div className="grid grid-cols-[1fr_1.4fr] gap-2">
              <Link href="/cart" onClick={close} className={buttonClass("secondary", "lg")}>
                Xem giỏ
              </Link>
              <Link href="/checkout" onClick={close} className={buttonClass("primary", "lg")}>
                Thanh toán
              </Link>
            </div>
          </div>
        )
      }
    >
      {!ready ? (
        <div className="flex flex-col gap-4 p-5" aria-label="Đang tải giỏ hàng">
          {[0, 1].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="size-24 rounded-sm bg-muted motion-safe:animate-pulse" />
              <div className="flex flex-1 flex-col gap-2 pt-1">
                <div className="h-4 w-4/5 rounded bg-muted motion-safe:animate-pulse" />
                <div className="h-3 w-1/3 rounded bg-muted motion-safe:animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : empty ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
          <span className="grid size-16 place-items-center rounded-md bg-muted text-ink-3">
            <HandbagSimpleIcon weight="light" className="size-8" />
          </span>
          <div>
            <p className="font-medium text-ink">Giỏ hàng đang trống</p>
            <p className="mt-1 text-sm text-ink-2">Chọn võ phục theo môn võ hoặc nhờ tư vấn size trước khi mua.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link href="/products" onClick={close} className={buttonClass("dark")}>
              Xem sản phẩm
            </Link>
            <Link href="/size-guide" onClick={close} className={buttonClass("secondary")}>
              Tư vấn size
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 p-5">
          <FreeshipProgress subtotal={cart.subtotal} />
          <ul className="flex flex-col gap-6">
            {cart.items.map((item) => (
              <CartLineItem key={`${item.sku}|${item.embroidery_name ?? ""}`} item={item} onNavigate={close} compact />
            ))}
          </ul>
        </div>
      )}
    </Drawer>
  );
}
