"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type ReactNode } from "react";
import { CircleNotchIcon, FunnelIcon } from "@phosphor-icons/react";
import { SORT_OPTIONS } from "@/lib/catalog";
import { cx } from "@/lib/format";
import { Drawer } from "@/components/ui/Drawer";
import { buttonClass } from "@/components/ui/styles";

/** Chọn thứ tự sắp xếp: đổi URL bằng transition để giữ lưới cũ trong lúc tải, kèm biểu tượng đang tải. */
export function SortSelect({ value, hrefFor }: { value: string; hrefFor: Record<string, string> }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2">
      {pending && <CircleNotchIcon className="size-4 animate-spin text-ink-3" aria-label="Đang sắp xếp" />}
      <label htmlFor="catalog-sort" className="text-sm text-ink-3 max-sm:sr-only">
        Sắp xếp
      </label>
      <select
        id="catalog-sort"
        value={value}
        onChange={(e) => startTransition(() => router.push(hrefFor[e.target.value], { scroll: false }))}
        className="h-10 cursor-pointer rounded-lg border border-line bg-surface pr-8 pl-3 text-sm font-medium text-ink transition-colors hover:border-line-strong focus:border-ink focus:outline-none"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function MobileFilters({ children, activeCount }: { children: ReactNode; activeCount: number }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={buttonClass("secondary", "sm", "h-10 lg:hidden")}>
        <FunnelIcon className="size-4" aria-hidden />
        Bộ lọc
        {activeCount > 0 && (
          <span className="grid size-5 place-items-center rounded-md bg-ink text-[11px] font-semibold text-bg tabular">{activeCount}</span>
        )}
      </button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Bộ lọc sản phẩm"
        side="left"
        footer={
          <button type="button" onClick={() => setOpen(false)} className={buttonClass("dark", "lg", "w-full")}>
            Xem kết quả
          </button>
        }
      >
        <div className={cx("p-5")} onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
          {children}
        </div>
      </Drawer>
    </>
  );
}
