"use client";

import Link from "next/link";
import { HandbagSimpleIcon, LockKeyIcon } from "@phosphor-icons/react";
import { cx, formatVND } from "@/lib/format";
import { useCart } from "@/components/providers/CartProvider";
import { Skeleton } from "@/components/ui/Skeleton";
import { buttonClass, container } from "@/components/ui/styles";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { CartTotals, FreeshipProgress } from "@/components/cart/CartSummary";

export function CartView() {
  const { cart, ready, clear } = useCart();

  return (
    <div className={cx(container, "py-8 lg:py-12")}>
      <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">Giỏ hàng</h1>

      {!ready ? (
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-6">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
          </div>
          <Skeleton className="h-64 rounded-md" />
        </div>
      ) : cart.items.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-5 rounded-md border border-dashed border-line px-6 py-20 text-center">
          <span className="grid size-16 place-items-center rounded-md bg-muted text-ink-3">
            <HandbagSimpleIcon weight="light" className="size-8" />
          </span>
          <div>
            <p className="text-lg font-medium text-ink">Giỏ hàng đang trống</p>
            <p className="mt-1 max-w-md text-sm text-ink-2">Bắt đầu với võ phục theo môn võ của bạn. Chưa chắc size thì để chúng tôi tính giúp.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/products" className={buttonClass("dark", "lg")}>
              Xem sản phẩm
            </Link>
            <Link href="/size-guide" className={buttonClass("secondary", "lg")}>
              Tư vấn size
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
          <div>
            <div className="flex items-center justify-between border-b border-line pb-4">
              <p className="text-sm text-ink-2">{cart.total_items} sản phẩm</p>
              <button type="button" onClick={clear} className="text-sm text-ink-3 underline-offset-4 hover:text-accent-text hover:underline cursor-pointer">
                Xóa toàn bộ
              </button>
            </div>
            <ul className="flex flex-col divide-y divide-line">
              {cart.items.map((item) => (
                <CartLineItem key={`${item.sku}|${item.embroidery_name ?? ""}`} item={item} className="py-6" />
              ))}
            </ul>
            <Link href="/products" className="mt-2 inline-block text-sm font-medium text-ink-2 hover:text-ink">
              Tiếp tục mua sắm
            </Link>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex flex-col gap-5 rounded-md border border-line bg-surface p-6">
              <h2 className="font-semibold text-ink">Tóm tắt đơn hàng</h2>
              <FreeshipProgress subtotal={cart.subtotal} />
              <CartTotals cart={cart} />
              <div className="flex items-baseline justify-between border-t border-line pt-4">
                <span className="font-medium text-ink">Tạm tính</span>
                <span className="text-2xl font-semibold text-ink tabular">{formatVND(cart.subtotal + cart.embroidery_total)}</span>
              </div>
              {cart.has_embroidery && (
                <p className="rounded-lg bg-warning-soft px-3 py-2 text-[13px] text-warning">
                  Giỏ có hàng thêu tên nên cần thanh toán trước qua MoMo.
                </p>
              )}
              <Link href="/checkout" className={buttonClass("primary", "lg", "w-full")}>
                Thanh toán
              </Link>
              <p className="flex items-center justify-center gap-1.5 text-[13px] text-ink-3">
                <LockKeyIcon className="size-3.5" aria-hidden /> Mã giảm giá nhập ở bước thanh toán
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
