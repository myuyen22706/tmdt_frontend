"use client";

import Link from "next/link";
import { cx } from "@/lib/format";
import { buttonClass, container } from "@/components/ui/styles";

export default function StoreError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className={cx(container, "flex flex-col items-center py-24 text-center lg:py-32")}>
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Trang gặp sự cố khi tải</h1>
      <p className="mt-3 max-w-md text-ink-2">Máy chủ có thể đang khởi động lại. Thử tải lại sau vài giây.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <button type="button" onClick={reset} className={buttonClass("dark", "lg")}>
          Thử lại
        </button>
        <Link href="/" className={buttonClass("secondary", "lg")}>
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
