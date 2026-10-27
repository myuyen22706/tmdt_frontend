"use client";

import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import { cx } from "@/lib/format";

interface QuantityStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  size?: "sm" | "md";
  label?: string;
}

export function QuantityStepper({ value, onChange, min = 1, max = 99, disabled, size = "md", label = "Số lượng" }: QuantityStepperProps) {
  const btn = cx(
    "inline-flex items-center justify-center text-ink-2 transition-colors hover:bg-muted hover:text-ink disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer",
    size === "sm" ? "size-8" : "size-11"
  );
  return (
    <div
      className={cx("inline-flex items-center rounded-lg border border-line bg-surface", disabled && "opacity-60")}
      role="group"
      aria-label={label}
    >
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={disabled || value <= min} aria-label="Giảm số lượng">
        <MinusIcon className="size-4" />
      </button>
      <span className={cx("text-center font-medium text-ink tabular", size === "sm" ? "w-7 text-sm" : "w-10 text-[15px]")} aria-live="polite">
        {value}
      </span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={disabled || value >= max} aria-label="Tăng số lượng">
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
}
