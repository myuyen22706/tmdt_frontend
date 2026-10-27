import { FREESHIP_THRESHOLD } from "@/lib/catalog";
import { formatVND } from "@/lib/format";
import type { Cart } from "@/lib/types";

/** Thanh tiến độ miễn phí giao hàng: phản hồi chức năng cho người mua, không phải biểu đồ so sánh. */
export function FreeshipProgress({ subtotal }: { subtotal: number }) {
  const remaining = Math.max(FREESHIP_THRESHOLD - subtotal, 0);
  const progress = Math.min(subtotal / FREESHIP_THRESHOLD, 1);
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[13px] text-ink-2">
        {remaining > 0 ? (
          <>
            Mua thêm <span className="font-semibold text-ink tabular">{formatVND(remaining)}</span> để được miễn phí giao hàng
          </>
        ) : (
          <span className="font-medium text-success">Đơn hàng được miễn phí giao hàng</span>
        )}
      </p>
      <div className="h-1 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full origin-left rounded-full bg-accent transition-transform duration-500 ease-out-soft"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </div>
  );
}

export function CartTotals({ cart, shippingNote = "Tính ở bước thanh toán" }: { cart: Cart; shippingNote?: string }) {
  return (
    <dl className="flex flex-col gap-2.5 text-sm">
      <div className="flex justify-between text-ink-2">
        <dt>Tạm tính ({cart.total_items} sản phẩm)</dt>
        <dd className="text-ink tabular">{formatVND(cart.subtotal)}</dd>
      </div>
      {cart.embroidery_total > 0 && (
        <div className="flex justify-between text-ink-2">
          <dt>Phí thêu tên</dt>
          <dd className="text-ink tabular">{formatVND(cart.embroidery_total)}</dd>
        </div>
      )}
      <div className="flex justify-between text-ink-2">
        <dt>Giao hàng</dt>
        <dd className="text-ink">{cart.subtotal >= FREESHIP_THRESHOLD ? "Miễn phí" : shippingNote}</dd>
      </div>
    </dl>
  );
}
