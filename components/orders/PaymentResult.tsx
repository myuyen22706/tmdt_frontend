"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CircleNotchIcon, XCircleIcon } from "@phosphor-icons/react";
import { apiRequest, ApiError } from "@/lib/api";
import { getOrderPhone } from "@/lib/recent-orders";
import type { Order } from "@/lib/types";
import { useAuth } from "@/components/providers/AuthProvider";
import { buttonClass } from "@/components/ui/styles";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Trang MoMo chuyển về sau thanh toán: chờ IPN xác nhận rồi mở trang chi tiết đơn. */
export function PaymentResult() {
  const router = useRouter();
  const params = useSearchParams();
  const { token, ready } = useAuth();
  const orderCode = params.get("orderId") ?? "";
  const success = params.get("resultCode") === "0";
  const [state, setState] = useState<"checking" | "failed" | "timeout">(success ? "checking" : "failed");
  const [retrying, setRetrying] = useState(false);
  const [retryError, setRetryError] = useState<string | null>(null);

  useEffect(() => {
    if (!ready || !success || !orderCode) return;
    let cancelled = false;
    const phone = getOrderPhone(orderCode);
    const query = phone ? `?phone=${encodeURIComponent(phone)}` : "";

    (async () => {
      // Ở chế độ MOMO_MOCK backend không nhận IPN thật, nên giả lập IPN; chế độ thật trả 403 và ta chỉ chờ IPN
      await apiRequest("/api/v1/payments/momo/mock-callback", { method: "POST", body: { order_code: orderCode, result_code: 0 } }).catch(() => null);
      for (let attempt = 0; attempt < 8 && !cancelled; attempt++) {
        try {
          const order = await apiRequest<Order>(`/api/v1/orders/${encodeURIComponent(orderCode)}${query}`, { token });
          if (order.payment_status === "paid" || order.status === "paid") {
            router.replace(`/orders/${orderCode}?placed=1`);
            return;
          }
        } catch {
          // thử lại
        }
        await wait(1500);
      }
      if (!cancelled) setState("timeout");
    })();

    return () => {
      cancelled = true;
    };
  }, [ready, success, orderCode, token, router]);

  const retry = async () => {
    setRetrying(true);
    try {
      const payment = await apiRequest<{ pay_url: string }>("/api/v1/payments/momo/create", { method: "POST", token, body: { order_code: orderCode } });
      if (payment.pay_url) window.location.assign(payment.pay_url);
    } catch (err) {
      setRetrying(false);
      setRetryError(err instanceof ApiError ? err.message : "Không tạo được thanh toán mới");
    }
  };

  if (!orderCode) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Không tìm thấy thông tin thanh toán</h1>
        <Link href="/orders" className={buttonClass("secondary", "lg")}>
          Tra cứu đơn hàng
        </Link>
      </div>
    );
  }

  if (state === "checking") {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center" role="status">
        <CircleNotchIcon className="size-10 animate-spin text-ink-3" aria-hidden />
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Đang xác nhận thanh toán</h1>
        <p className="text-ink-2">Đơn {orderCode}. Vui lòng không đóng trang trong vài giây.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-24 text-center">
      <XCircleIcon weight="fill" className="size-12 text-accent" aria-hidden />
      <h1 className="text-2xl font-semibold tracking-tight text-ink">{state === "timeout" ? "Chưa nhận được xác nhận thanh toán" : "Thanh toán chưa hoàn tất"}</h1>
      <p className="text-ink-2">
        {state === "timeout"
          ? `MoMo chưa gửi kết quả cho đơn ${orderCode}. Kiểm tra lại trạng thái đơn sau ít phút.`
          : `Giao dịch cho đơn ${orderCode} đã bị hủy hoặc thất bại. Đơn được giữ trong 15 phút để bạn thanh toán lại.`}
      </p>
      {retryError && <p className="text-sm text-accent-text">{retryError}</p>}
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {state === "failed" && (
          <button type="button" onClick={retry} disabled={retrying} className={buttonClass("primary", "lg")}>
            {retrying && <CircleNotchIcon className="size-5 animate-spin" />}
            Thanh toán lại
          </button>
        )}
        <Link href={`/orders/${orderCode}`} className={buttonClass("secondary", "lg")}>
          Xem đơn hàng
        </Link>
      </div>
    </div>
  );
}
