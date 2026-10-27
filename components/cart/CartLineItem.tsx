"use client";

import Link from "next/link";
import { TrashIcon } from "@phosphor-icons/react";
import { cx, formatVND } from "@/lib/format";
import type { CartItem } from "@/lib/types";
import { lineKey, useCart } from "@/components/providers/CartProvider";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { ProductImage } from "@/components/product/ProductImage";

export function CartLineItem({ item, onNavigate, compact, className }: { item: CartItem; onNavigate?: () => void; compact?: boolean; className?: string }) {
  const { updateQuantity, remove, pendingLine } = useCart();
  const pending = pendingLine === lineKey(item);
  const slug = item.thumbnail?.match(/\/images\/products\/([^/]+)\.jpg$/)?.[1];

  return (
    <li className={cx("flex gap-4 transition-opacity", pending && "opacity-70", className)}>
      <ProductImage
        product={{ thumbnail: item.thumbnail ?? "", slug: slug ?? "", name: item.product_name, category_id: "vo_phuc", martial_art_id: "" }}
        sizes="96px"
        compact
        className={cx("shrink-0 rounded-sm", compact ? "size-20" : "size-24")}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-3">
          {slug ? (
            <Link href={`/products/${slug}`} onClick={onNavigate} className="line-clamp-2 text-sm font-medium text-ink hover:underline underline-offset-4">
              {item.product_name}
            </Link>
          ) : (
            <p className="line-clamp-2 text-sm font-medium text-ink">{item.product_name}</p>
          )}
          <p className="shrink-0 text-sm font-semibold text-ink tabular">{formatVND(item.price * item.quantity)}</p>
        </div>
        <p className="text-[13px] text-ink-3">
          {item.size}
          {item.color ? `, ${item.color}` : ""}
        </p>
        {item.is_embroidered && (
          <p className="text-[13px] text-ink-2">
            Thêu tên: <span className="font-medium text-ink">{item.embroidery_name}</span> (+{formatVND(item.embroidery_fee)})
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-2">
          <QuantityStepper size="sm" value={item.quantity} onChange={(q) => updateQuantity(item, q)} disabled={pending} />
          <button
            type="button"
            onClick={() => remove(item)}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[13px] text-ink-3 transition-colors hover:text-accent-text cursor-pointer"
            aria-label={`Xóa ${item.product_name} khỏi giỏ`}
          >
            <TrashIcon className="size-4" aria-hidden /> Xóa
          </button>
        </div>
      </div>
    </li>
  );
}
