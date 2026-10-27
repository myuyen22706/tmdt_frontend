"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CaretDownIcon } from "@phosphor-icons/react";
import { cx } from "@/lib/format";
import { NAV_ITEMS } from "@/components/site/nav";

/**
 * Menu chính có bảng menu lớn: rê chuột (có độ trễ để không bật nhầm), bấm hoặc dùng bàn phím để mở;
 * Esc hoặc rời khỏi vùng menu để đóng. Bảng menu định vị theo header (header dính có position: sticky).
 */
export function MegaNav() {
  const [open, setOpen] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  const schedule = (next: string | null, delay: number) => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(next), delay);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const active = NAV_ITEMS.find((item) => item.label === open);

  return (
    <nav aria-label="Điều hướng chính" className="hidden h-full items-stretch lg:flex" onMouseLeave={() => schedule(null, 140)}>
      {NAV_ITEMS.map((item) => {
        const isOpen = open === item.label;
        const textClass = cx(
          "relative flex h-full items-center gap-1.5 px-3 text-[15px] font-semibold transition-colors xl:px-4",
          item.highlight ? "text-accent-on-navy hover:text-on-navy" : "text-on-navy hover:text-accent-on-navy",
          isOpen && "text-accent-on-navy after:absolute after:inset-x-3 after:bottom-0 after:h-[3px] after:bg-accent-on-navy xl:after:inset-x-4"
        );
        if (!item.columns) {
          return (
            <Link key={item.label} href={item.href} className={textClass} onMouseEnter={() => schedule(null, 80)}>
              {item.label}
            </Link>
          );
        }
        return (
          <button
            key={item.label}
            type="button"
            aria-expanded={isOpen}
            aria-haspopup="true"
            onMouseEnter={() => schedule(item.label, open ? 0 : 90)}
            onClick={() => setOpen(isOpen ? null : item.label)}
            className={cx(textClass, "cursor-pointer")}
          >
            {item.label}
            <CaretDownIcon weight="bold" className={cx("size-3 transition-transform duration-200", isOpen && "rotate-180")} aria-hidden />
          </button>
        );
      })}

      <div
        className={cx(
          "absolute inset-x-0 top-full border-t border-line bg-surface shadow-lift transition-[opacity,transform] duration-200 ease-out-soft",
          active ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        )}
        onMouseEnter={() => timer.current && window.clearTimeout(timer.current)}
        inert={!active}
      >
        {active?.columns && (
          <div className={cx("mx-auto grid max-w-[1360px] gap-10 px-8 py-8", active.columns.length >= 4 ? "grid-cols-5" : "grid-cols-4")}>
            {active.columns.map((col) => (
              <div key={col.title}>
                {col.href ? (
                  <Link href={col.href} onClick={() => setOpen(null)} className="text-sm font-bold tracking-wide text-heading uppercase hover:text-accent-text">
                    {col.title}
                  </Link>
                ) : (
                  <p className="text-sm font-bold tracking-wide text-heading uppercase">{col.title}</p>
                )}
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link href={link.href} onClick={() => setOpen(null)} className="text-[15px] text-ink-2 transition-colors hover:text-accent-text">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Link
              href={active.href}
              onClick={() => setOpen(null)}
              className="row-start-1 flex flex-col [grid-column-end:-1] justify-end self-stretch rounded-sm bg-navy p-6 text-on-navy transition-colors hover:bg-navy-2"
            >
              <span className="text-xs tracking-widest text-on-navy-2 uppercase">VÕ SPORT</span>
              <span className="mt-2 text-xl font-bold uppercase">Xem tất cả {active.label.toLowerCase()}</span>
              <span className="mt-3 text-sm text-accent-on-navy">Mua ngay ▸</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
