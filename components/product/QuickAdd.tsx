"use client";

import { useState } from "react";
import { CircleNotchIcon, PlusIcon, XIcon } from "@phosphor-icons/react";
import { cx } from "@/lib/format";
import type { Product } from "@/lib/types";
import { useCart } from "@/components/providers/CartProvider";

/** Thêm nhanh từ thẻ sản phẩm: một biến thể thì thêm ngay, nhiều size thì mở bảng chọn size ngay trên ảnh. */
export function QuickAdd({ product }: { product: Pick<Product, "id" | "name" | "variants"> }) {
  const { add, pendingLine } = useCart();
  const [open, setOpen] = useState(false);
  const variants = product.variants ?? [];
  const available = variants.filter((v) => v.in_stock);
  const busy = !!pendingLine && variants.some((v) => pendingLine.startsWith(`${v.sku}|`));

  if (available.length === 0) {
    return (
      <span className="sr-only">Tạm hết hàng</span>
    );
  }

  const addSku = async (sku: string) => {
    const ok = await add({ product_id: product.id, sku, quantity: 1, productName: product.name }, { openDrawer: false });
    if (ok) setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => (available.length === 1 ? addSku(available[0].sku) : setOpen(true))}
        disabled={busy}
        aria-label={`Thêm nhanh ${product.name} vào giỏ`}
        className={cx(
          "absolute right-2.5 bottom-2.5 grid size-10 place-items-center rounded-full bg-navy text-on-navy shadow-soft",
          "transition-[opacity,transform,background-color] duration-300 ease-out-soft hover:bg-accent active:scale-95 cursor-pointer",
          "lg:translate-y-1 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:focus-visible:translate-y-0 lg:focus-visible:opacity-100",
          open && "pointer-events-none opacity-0"
        )}
      >
        {busy ? <CircleNotchIcon className="size-5 animate-spin" /> : <PlusIcon weight="bold" className="size-[18px]" />}
      </button>

      <div
        className={cx(
          "absolute inset-x-2 bottom-2 rounded-sm bg-surface/95 p-3 shadow-lift backdrop-blur",
          "transition-[opacity,transform] duration-300 ease-out-soft",
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        )}
        inert={!open}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[13px] font-medium text-ink">Chọn size</span>
          <button type="button" onClick={() => setOpen(false)} className="-m-1 rounded-md p-1 text-ink-3 hover:text-ink cursor-pointer" aria-label="Đóng chọn size">
            <XIcon className="size-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {variants.map((v) => (
            <button
              key={v.sku}
              type="button"
              disabled={!v.in_stock || busy}
              onClick={() => addSku(v.sku)}
              className="h-8 min-w-11 rounded-sm border border-line bg-surface px-2 text-[13px] font-medium text-ink tabular transition-colors hover:border-ink disabled:border-dashed disabled:text-ink-3 disabled:line-through cursor-pointer"
            >
              {v.size.replace("Size ", "")}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
