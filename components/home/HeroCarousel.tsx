"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { cx } from "@/lib/format";

/**
 * Băng chuyền banner toàn chiều ngang: tự chuyển sau 6 giây, dừng khi rê chuột / focus,
 * vuốt trên di động, chấm chỉ vị trí phía dưới. Tắt tự chuyển khi bật giảm chuyển động.
 */
export function HeroCarousel({ children }: { children: ReactNode }) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (paused || count < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => window.clearInterval(id);
  }, [paused, count]);

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);
  const arrow =
    "absolute top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-surface/85 text-ink shadow-soft backdrop-blur transition-[background-color,opacity] duration-200 hover:bg-surface md:grid cursor-pointer";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Chương trình nổi bật"
      className="group/hero relative overflow-hidden bg-navy"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex transition-transform duration-700 ease-out-soft" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((slide, i) => (
          <div key={i} className="w-full shrink-0" aria-roledescription="slide" aria-label={`${i + 1} / ${count}`} aria-hidden={i !== index} inert={i !== index}>
            {slide}
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <button type="button" onClick={() => go(-1)} className={cx(arrow, "left-5 opacity-0 group-hover/hero:opacity-100 focus-visible:opacity-100")} aria-label="Banner trước">
            <CaretLeftIcon className="size-5" />
          </button>
          <button type="button" onClick={() => go(1)} className={cx(arrow, "right-5 opacity-0 group-hover/hero:opacity-100 focus-visible:opacity-100")} aria-label="Banner tiếp theo">
            <CaretRightIcon className="size-5" />
          </button>
          <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Xem banner ${i + 1}`}
                aria-current={i === index}
                className={cx("size-2.5 rounded-full shadow-[0_0_0_1px_rgb(21_33_61/0.35)] transition-[transform,background-color] duration-300 cursor-pointer", i === index ? "scale-125 bg-on-navy" : "bg-on-navy/45 hover:bg-on-navy/70")}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
