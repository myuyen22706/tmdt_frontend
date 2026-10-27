"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { cx } from "@/lib/format";
import { useToast } from "@/components/ui/Toast";

export function CopyCodeButton({ code, onDark }: { code: string; onDark?: boolean }) {
  const { notify } = useToast();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      notify({ tone: "success", title: `Đã sao chép mã ${code}`, description: "Dán mã ở bước thanh toán." });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      notify({ tone: "info", title: `Mã của bạn: ${code}` });
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={cx(
        "inline-flex h-10 items-center gap-2 rounded-sm px-4 text-sm font-bold tracking-wide uppercase transition-colors cursor-pointer",
        onDark ? "bg-on-navy text-navy hover:bg-accent-on-navy" : "bg-navy text-on-navy hover:bg-navy-2"
      )}
    >
      {copied ? <CheckIcon weight="bold" className="size-4" aria-hidden /> : <CopyIcon className="size-4" aria-hidden />}
      {copied ? "Đã sao chép" : "Sao chép mã"}
    </button>
  );
}
