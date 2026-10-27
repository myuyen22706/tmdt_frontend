import { cx } from "@/lib/format";

type ButtonVariant = "primary" | "dark" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-semibold select-none " +
  "transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-out-soft " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-hover shadow-[inset_0_1px_0_rgb(255_255_255/0.12)]",
  dark: "bg-navy text-on-navy hover:bg-navy-2",
  secondary: "bg-surface text-ink border border-line hover:border-line-strong hover:bg-muted",
  ghost: "text-ink-2 hover:text-ink hover:bg-muted",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md", extra?: string) {
  return cx(base, variants[variant], sizes[size], extra);
}

export const inputClass =
  "h-11 w-full rounded-sm border border-line bg-surface px-3.5 text-[15px] text-ink placeholder:text-ink-3 " +
  "transition-[border-color,box-shadow] duration-200 hover:border-line-strong " +
  "focus:border-ink focus:outline-none focus:ring-4 focus:ring-ink/10 " +
  "aria-[invalid=true]:border-accent aria-[invalid=true]:ring-accent/15";

export const labelClass = "text-sm font-medium text-ink";

export const chipClass = (active: boolean, disabled = false) =>
  cx(
    "inline-flex h-10 min-w-12 items-center justify-center rounded-sm border px-3 text-sm font-medium tabular",
    "transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.97] cursor-pointer",
    active ? "border-navy bg-navy text-on-navy" : "border-line bg-surface text-ink hover:border-line-strong",
    disabled && "pointer-events-none border-dashed text-ink-3 line-through opacity-60"
  );

export const container = "mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8";

/** Tab lọc dạng viên thuốc (pill), dùng để chuyển giữa các hàng sản phẩm */
export const pillClass = (active: boolean) =>
  cx(
    "inline-flex h-11 items-center justify-center rounded-full border px-6 text-[13px] font-medium uppercase tracking-wide whitespace-nowrap",
    "transition-[background-color,border-color,color] duration-200 cursor-pointer",
    active ? "border-navy bg-navy text-on-navy" : "border-ink-3/50 bg-surface text-ink hover:border-navy"
  );

/** Tiêu đề khu vực: in hoa, đậm, màu navy */
export const sectionTitle = "text-2xl font-bold uppercase tracking-wide text-heading md:text-[32px] md:leading-tight";
