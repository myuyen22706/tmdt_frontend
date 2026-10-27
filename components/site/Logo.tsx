import Link from "next/link";
import { cx } from "@/lib/format";

/** Logo chữ VÕ SPORT; `inverse` dùng trên nền navy của header và chân trang. */
export function Logo({ className, inverse }: { className?: string; inverse?: boolean }) {
  return (
    <Link href="/" className={cx("group inline-flex shrink-0 items-center gap-2.5", className)} aria-label="VÕ SPORT, về trang chủ">
      <span
        className={cx(
          "grid size-9 place-items-center rounded-sm text-[13px] font-bold tracking-tight transition-transform duration-300 ease-out-soft group-hover:-rotate-3",
          inverse ? "bg-accent text-on-accent" : "bg-navy text-on-navy"
        )}
      >
        VÕ
      </span>
      <span className={cx("text-lg font-bold tracking-tight italic", inverse ? "text-on-navy" : "text-heading")}>
        VÕ<span className={inverse ? "text-accent-on-navy" : "text-accent"}>SPORT</span>
      </span>
    </Link>
  );
}
