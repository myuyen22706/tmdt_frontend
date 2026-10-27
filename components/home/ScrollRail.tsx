"use client";

import { useRef, type ReactNode } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { cx } from "@/lib/format";

/**
 * Hàng cuộn ngang có điểm dừng (scroll-snap), mũi tên hai bên như băng chuyền sản phẩm của cửa hàng thể thao.
 * `arrowTop` canh mũi tên theo vùng ảnh (mặc định giữa ô ảnh vuông của thẻ sản phẩm).
 */
export function ScrollRail({ children, label, arrowTop = "38%", className }: { children: ReactNode; label: string; arrowTop?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  const arrow =
    "absolute z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-surface text-ink shadow-soft transition-[background-color,transform] duration-200 hover:bg-navy hover:text-on-navy active:scale-95 md:grid cursor-pointer";

  return (
    <div className={cx("relative", className)}>
      <button type="button" onClick={() => scrollBy(-1)} className={cx(arrow, "-left-5")} style={{ top: arrowTop }} aria-label={`Cuộn ${label} sang trái`}>
        <CaretLeftIcon className="size-5" />
      </button>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:gap-5 lg:px-0"
      >
        {children}
      </div>
      <button type="button" onClick={() => scrollBy(1)} className={cx(arrow, "-right-5")} style={{ top: arrowTop }} aria-label={`Cuộn ${label} sang phải`}>
        <CaretRightIcon className="size-5" />
      </button>
    </div>
  );
}
