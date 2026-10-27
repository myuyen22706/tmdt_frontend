"use client";

import Link from "next/link";
import { useState } from "react";
import { PlusIcon } from "@phosphor-icons/react";
import { formatVND } from "@/lib/format";
import type { Product } from "@/lib/types";
import { Drawer } from "@/components/ui/Drawer";
import { Price } from "@/components/ui/Price";
import { buttonClass } from "@/components/ui/styles";
import { ProductImage } from "@/components/product/ProductImage";

/** Thẻ "Hoàn thiện phong cách": ảnh món chính lớn + cột món đi kèm, nút "Xem trọn bộ" mở danh sách cả bộ. */
export function BundleCard({ title, items }: { title: string; items: Product[] }) {
  const [open, setOpen] = useState(false);
  const [main, ...extras] = items;
  const total = items.reduce((sum, p) => sum + p.price, 0);

  return (
    <>
      <article className="group relative grid h-[460px] grid-cols-[1fr_34%] gap-2 bg-muted p-3 lg:h-[520px]">
        <Link href={`/products/${main.slug}`} className="relative overflow-hidden" aria-label={main.name}>
          <ProductImage product={main} sizes="(min-width: 1024px) 22vw, 60vw" className="size-full bg-transparent transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]" />
        </Link>
        <div className="flex flex-col gap-2">
          {extras.slice(0, 3).map((p) => (
            <Link key={p.id} href={`/products/${p.slug}`} className="relative flex-1 overflow-hidden bg-surface" aria-label={p.name}>
              <ProductImage product={p} sizes="12vw" compact className="size-full bg-transparent" />
            </Link>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute bottom-6 left-6 inline-flex items-center gap-3 bg-surface/90 py-1.5 pr-4 pl-1.5 text-[15px] font-semibold tracking-wide text-heading uppercase backdrop-blur transition-colors hover:bg-surface cursor-pointer"
        >
          <span className="grid size-10 place-items-center rounded-full bg-navy text-on-navy">
            <PlusIcon weight="bold" className="size-4" aria-hidden />
          </span>
          Xem trọn bộ
        </button>
      </article>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        footer={
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-ink-2">Tổng cả bộ ({items.length} món)</span>
            <span className="text-xl font-bold text-ink tabular">{formatVND(total)}</span>
          </div>
        }
      >
        <ul className="flex flex-col divide-y divide-line p-5">
          {items.map((p) => (
            <li key={p.id} className="flex gap-4 py-4 first:pt-0">
              <ProductImage product={p} sizes="88px" compact className="size-22 shrink-0" />
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <Link href={`/products/${p.slug}`} onClick={() => setOpen(false)} className="line-clamp-2 text-[15px] font-medium text-ink hover:text-accent-text">
                  {p.name}
                </Link>
                <Price price={p.price} originalPrice={p.original_price} size="sm" />
                <Link href={`/products/${p.slug}`} onClick={() => setOpen(false)} className={buttonClass("secondary", "sm", "mt-1 self-start")}>
                  Chọn size và mua
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Drawer>
    </>
  );
}
