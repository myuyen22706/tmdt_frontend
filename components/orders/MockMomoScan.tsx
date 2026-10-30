"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CheckCircleIcon, CircleNotchIcon, FlaskIcon, WalletIcon } from "@phosphor-icons/react";
import { apiRequest, ApiError } from "@/lib/api";
import { formatVND } from "@/lib/format";
import { buttonClass } from "@/components/ui/styles";

/**
 * Trang mở ra khi quét QR của cổng MoMo giả lập, đóng vai ứng dụng MoMo trên điện thoại.
 * Phải bấm xác nhận mới gọi IPN giả lập, để việc mở link (xem trước, quét nhầm) không tự trả tiền.
 */
export function MockMomoScan() {
  const params = useSearchParams();
  const orderCode = params.get("orderId") ?? "";
  const amount = Number(params.get("amount") ?? 0);
  const [state, setState] = useState<"idle" | "paying" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const confirm = async () => {
    setState("paying");
    setError(null);
    try {
      await apiRequest("/api/v1/payments/momo/mock-callback", { method: "POST", body: { order_code: orderCode, result_code: 0 } });
      setState("done");
    } catch (err) {
      setState("idle");
      setError(err instanceof ApiError ? err.message : "Chưa xác nhận được thanh toán. Vui lòng thử lại.");
    }
  };

  if (!orderCode) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Mã QR không hợp lệ</h1>
      </div>
    );
  }

  if (state === "done") {
    return (
      <div className="mx-auto flex max-w-sm flex-col items-center gap-4 py-24 text-center" role="status">
        <CheckCircleIcon weight="fill" className="size-14 text-success" aria-hidden />
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Thanh toán thành công</h1>
        <p className="text-ink-2">
          Đã thanh toán {formatVND(amount)} cho đơn {orderCode}. Màn hình đặt hàng sẽ tự chuyển sang đơn hàng của bạn.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6 py-12">
      <div className="flex items-center justify-between gap-3">
        <h1 className="inline-flex items-center gap-2 text-xl font-semibold tracking-tight text-ink">
          <WalletIcon weight="fill" className="size-6 text-accent" aria-hidden />
          Xác nhận thanh toán
        </h1>
        <span className="inline-flex items-center gap-1.5 rounded-sm bg-muted px-2.5 py-1 text-xs font-medium text-ink-2">
          <FlaskIcon className="size-4" aria-hidden />
          Thử
        </span>
      </div>

      <div className="rounded-md border border-line bg-surface p-6">
        <p className="text-sm text-ink-3">Thanh toán cho VÕ SPORT</p>
        <p className="mt-1 text-3xl font-semibold tracking-tight text-ink tabular">{formatVND(amount)}</p>
        <p className="mt-4 border-t border-line pt-4 text-sm text-ink-2">Đơn hàng {orderCode}</p>
      </div>

      {error && <p className="text-sm text-accent-text">{error}</p>}

      <button type="button" onClick={confirm} disabled={state === "paying"} className={buttonClass("primary", "lg")}>
        {state === "paying" && <CircleNotchIcon className="size-5 animate-spin" />}
        Xác nhận thanh toán
      </button>
      <p className="text-center text-xs text-ink-3">Môi trường giả lập, không trừ tiền thật.</p>
    </div>
  );
}
