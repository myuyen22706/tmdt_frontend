"use client";

import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { cx } from "@/lib/format";

/** Ô tìm kiếm gửi tới /products?search=..., vẫn hoạt động như form GET khi JavaScript chưa tải. */
export function SearchForm({ className, autoFocus, onSubmitted, onNavy }: { className?: string; autoFocus?: boolean; onSubmitted?: () => void; onNavy?: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputId = useId();

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/products?search=${encodeURIComponent(q)}` : "/products");
    onSubmitted?.();
  };

  return (
    <form action="/products" method="get" role="search" onSubmit={submit} className={cx("relative", className)}>
      <label htmlFor={inputId} className="sr-only">
        Tìm sản phẩm
      </label>
      <MagnifyingGlassIcon className={cx("pointer-events-none absolute top-1/2 size-[18px] -translate-y-1/2", onNavy ? "right-3 text-navy" : "left-3 text-ink-3")} aria-hidden />
      <input
        id={inputId}
        name="search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus={autoFocus}
        placeholder="Bạn đang tìm gì?"
        autoComplete="off"
        className={cx(
          "h-10 w-full rounded-sm border text-[15px] transition-[border-color,background-color,box-shadow] duration-200 focus:outline-none",
          onNavy
            ? "border-transparent bg-on-navy pr-10 pl-4 text-navy placeholder:text-navy/60 focus:ring-2 focus:ring-accent-on-navy"
            : "border-transparent bg-muted pr-3 pl-10 text-ink placeholder:text-ink-3 hover:border-line focus:border-ink focus:bg-surface focus:ring-4 focus:ring-ink/10"
        )}
      />
    </form>
  );
}
