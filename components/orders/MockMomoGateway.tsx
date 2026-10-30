"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CircleNotchIcon, FlaskIcon, WalletIcon } from "@phosphor-icons/react";
import { formatVND } from "@/lib/format";
import { buttonClass } from "@/components/ui/styles";

/**
 * Trang cổng thanh toán giả lập khi backend bật MOMO_MOCK (Mục 7).
 * Khách xác nhận hoặc hủy tại đây, sau đó mới quay về trang kết quả giống luồng MoMo thật.
 */
export function MockMomoGateway() {
  const params = useSearchParams();
  const orderCode = params.get("orderId") ?? "";
  const amount = Number(params.get("amount") ?? 0);
  const requestId = params.get("requestId") ?? "";
  const orderInfo = params.get("orderInfo") ?? `Thanh toan don hang ${orderCode}`;
  const [paying, setPaying] = useState(false);

  // Cùng tham số MoMo gắn vào redirectUrl sau giao dịch; trang kết quả chỉ đọc orderId và resultCode
  const resultHref = (resultCode: number, message: string) =>
    `/orders/payment-result?${new URLSearchParams({ orderId: orderCode, amount: String(amount), requestId, resultCode: String(resultCode), message })}`;

  const pay = () => {
    setPaying(true);
    window.location.assign(resultHref(0, "Success"));
  };

  if (!orderCode) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Không tìm thấy giao dịch</h1>
        <Link href="/orders" className={buttonClass("secondary", "lg")}>
          Tra cứu đơn hàng
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 py-12">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-lg font-semibold text-ink">
          <WalletIcon weight="fill" className="size-6 text-accent" aria-hidden />
          Thanh toán ví MoMo
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-sm bg-muted px-2.5 py-1 text-xs font-medium text-ink-2">
          <FlaskIcon className="size-4" aria-hidden />
          Môi trường thử
        </span>
      </div>

      <div className="rounded-md border border-line bg-surface p-6">
        <p className="text-sm text-ink-3">Số tiền thanh toán</p>
        <p className="mt-1 text-3xl font-semibold tracking-tight text-ink tabular">{formatVND(amount)}</p>
        <dl className="mt-6 grid gap-3 border-t border-line pt-5 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-ink-3">Mã đơn hàng</dt>
            <dd className="font-medium text-ink">{orderCode}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-3">Nội dung</dt>
            <dd className="text-right text-ink">{orderInfo}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-3">Nhà cung cấp</dt>
            <dd className="text-ink">VÕ SPORT</dd>
          </div>
        </dl>
      </div>

      <p className="text-sm text-ink-2">
        Đây là cổng MoMo giả lập để demo, không trừ tiền thật. Đơn chưa thanh toán sẽ tự hủy sau 15 phút.
      </p>

      <div className="flex flex-col gap-2">
        <button type="button" onClick={pay} disabled={paying} className={buttonClass("primary", "lg")}>
          {paying && <CircleNotchIcon className="size-5 animate-spin" />}
          Xác nhận thanh toán
        </button>
        <Link href={resultHref(1006, "Giao dịch bị từ chối bởi người dùng")} className={buttonClass("ghost", "lg")}>
          Hủy giao dịch
        </Link>
      </div>
    </div>
  );
}
