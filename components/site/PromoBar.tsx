"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { cx } from "@/lib/format";

const MESSAGES = [
  { text: "Nhập mã VOVINAM10 giảm 10% cho đơn từ 300.000₫", href: "/products?martial_art=vovinam", cta: "Mua ngay" },
  { text: "Miễn phí giao hàng toàn quốc cho đơn từ 500.000₫", href: "/products", cta: "Xem ngay" },
  { text: "Võ đường đặt đồng phục từ 10 bộ được giảm đến 25%", href: "/dojos", cta: "Đăng ký" },
];

/** Dải khuyến mãi trên cùng, tự chuyển tin sau mỗi 5 giây (tạm dừng khi rê chuột hoặc khi bật giảm chuyển động). */
export function PromoBar() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % MESSAGES.length), 5000);
    return () => window.clearInterval(id);
  }, [paused]);

  const go = (delta: number) => setIndex((i) => (i + delta + MESSAGES.length) % MESSAGES.length);
  const arrow = "grid size-9 place-items-center text-on-accent/80 transition-colors hover:text-on-accent cursor-pointer";

  return (
    <div className="bg-accent text-on-accent" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="mx-auto flex h-10 max-w-[1360px] items-center justify-between gap-2 px-2 sm:px-4">
        <button type="button" onClick={() => go(-1)} className={arrow} aria-label="Ưu đãi trước">
          <CaretLeftIcon className="size-4" />
        </button>
        <div className="relative h-full flex-1 overflow-hidden" aria-live="polite">
          {MESSAGES.map((m, i) => (
            <div
              key={m.text}
              aria-hidden={i !== index}
              className={cx(
                "absolute inset-0 flex items-center justify-center gap-3 transition-[opacity,transform] duration-500 ease-out-soft",
                i === index ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
              )}
            >
              <span className="truncate text-[13px] font-semibold tracking-wide uppercase">{m.text}</span>
              <Link
                href={m.href}
                tabIndex={i === index ? 0 : -1}
                className="hidden shrink-0 rounded-sm bg-navy px-2.5 py-1 text-xs font-semibold text-on-navy transition-colors hover:bg-navy-2 sm:inline-block"
              >
                {m.cta}
              </Link>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => go(1)} className={arrow} aria-label="Ưu đãi tiếp theo">
          <CaretRightIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
