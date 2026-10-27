import { cx, formatVND } from "@/lib/format";

interface PriceProps {
  price: number;
  originalPrice?: number | null;
  size?: "sm" | "md" | "lg";
  /** Ẩn phần trăm giảm khi thẻ sản phẩm đã có nhãn % trên ảnh */
  showPercent?: boolean;
  className?: string;
}

/** Giá bán: khi đang giảm, giá hiện tại tô đỏ và giá gốc gạch ngang (kiểu cửa hàng thể thao). */
export function Price({ price, originalPrice, size = "md", showPercent = true, className }: PriceProps) {
  const hasDiscount = !!originalPrice && originalPrice > price;
  const percent = hasDiscount ? Math.round(((originalPrice! - price) / originalPrice!) * 100) : 0;

  return (
    <div className={cx("flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 tabular", className)}>
      <span
        className={cx(
          "font-semibold tracking-tight",
          hasDiscount ? "text-accent-text" : "text-ink",
          size === "sm" && "text-[17px]",
          size === "md" && "text-lg",
          size === "lg" && "text-3xl"
        )}
      >
        {formatVND(price)}
      </span>
      {hasDiscount && (
        <span className={cx("text-ink-3 line-through", size === "lg" ? "text-base" : "text-sm")}>{formatVND(originalPrice!)}</span>
      )}
      {hasDiscount && showPercent && (
        <span className={cx("rounded-sm bg-accent px-1.5 py-0.5 font-bold text-on-accent", size === "lg" ? "text-sm" : "text-xs")}>-{percent}%</span>
      )}
    </div>
  );
}
