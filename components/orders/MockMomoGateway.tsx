"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { CircleNotchIcon, DeviceMobileIcon, FlaskIcon, WalletIcon } from "@phosphor-icons/react";
import { apiRequest } from "@/lib/api";
import { formatVND } from "@/lib/format";
import { getOrderPhone } from "@/lib/recent-orders";
import type { Order } from "@/lib/types";
import { useAuth } from "@/components/providers/AuthProvider";
import { buttonClass } from "@/components/ui/styles";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const noopSubscribe = () => () => {};

/**
 * Trang cổng thanh toán giả lập khi backend bật MOMO_MOCK (Mục 7).
 * Hiện mã QR; quét bằng điện thoại mở trang xác nhận, trang này tự kiểm tra đơn và chuyển
 * sang trang kết quả khi đã thanh toán, giống luồng MoMo thật.
 */
export function MockMomoGateway() {
  const params = useSearchParams();
  const { token, ready } = useAuth();
  const orderCode = params.get("orderId") ?? "";
  const amount = Number(params.get("amount") ?? 0);
  const requestId = params.get("requestId") ?? "";
  const orderInfo = params.get("orderInfo") ?? `Thanh toan don hang ${orderCode}`;
  const [paying, setPaying] = useState(false);
  const origin = useSyncExternalStore(noopSubscribe, () => window.location.origin, () => "");

  // Cùng tham số MoMo gắn vào redirectUrl sau giao dịch; trang kết quả chỉ đọc orderId và resultCode
  const resultHref = (resultCode: number, message: string) =>
    `/orders/payment-result?${new URLSearchParams({ orderId: orderCode, amount: String(amount), requestId, resultCode: String(resultCode), message })}`;
  const successHref = resultHref(0, "Success");
  const scanUrl = `${origin}/payments/momo/scan?${new URLSearchParams({ orderId: orderCode, amount: String(amount) })}`;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?${new URLSearchParams({ size: "440x440", margin: "8", data: scanUrl })}`;

  // Chờ điện thoại quét và xác nhận: đơn chuyển sang đã thanh toán thì về trang kết quả
  useEffect(() => {
    if (!ready || !orderCode) return;
    let cancelled = false;
    const phone = getOrderPhone(orderCode);
    const query = phone ? `?phone=${encodeURIComponent(phone)}` : "";

    (async () => {
      while (!cancelled) {
        try {
          const order = await apiRequest<Order>(`/api/v1/orders/${encodeURIComponent(orderCode)}${query}`, { token });
          if (order.payment_status === "paid" || order.status === "paid") {
            window.location.assign(successHref);
            return;
          }
        } catch {
          // thử lại ở lượt sau
        }
        await wait(2000);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [ready, orderCode, token, successHref]);

  const pay = () => {
    setPaying(true);
    window.location.assign(successHref);
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
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 py-12">
      <div className="flex items-center justify-between gap-3">
        <h1 className="inline-flex items-center gap-2 text-xl font-semibold tracking-tight text-ink">
          <WalletIcon weight="fill" className="size-6 text-accent" aria-hidden />
          Thanh toán ví MoMo
        </h1>
        <span className="inline-flex items-center gap-1.5 rounded-sm bg-muted px-2.5 py-1 text-xs font-medium text-ink-2">
          <FlaskIcon className="size-4" aria-hidden />
          Môi trường thử
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col items-center gap-4 rounded-md border border-line bg-surface p-6 text-center">
          <p className="font-semibold text-ink">Quét mã để thanh toán</p>
          <div className="grid size-[220px] place-items-center rounded-sm border border-line bg-white p-2">
            {origin ? (
              <Image src={qrSrc} alt={`Mã QR thanh toán đơn ${orderCode}`} width={220} height={220} unoptimized className="size-full" />
            ) : (
              <CircleNotchIcon className="size-8 animate-spin text-ink-3" aria-hidden />
            )}
          </div>
          <p className="inline-flex items-center gap-2 text-sm text-ink-2">
            <DeviceMobileIcon className="size-5 shrink-0" aria-hidden />
            Dùng camera điện thoại quét mã, rồi bấm xác nhận
          </p>
          <p className="inline-flex items-center gap-2 text-sm text-ink-3" role="status">
            <CircleNotchIcon className="size-4 animate-spin" aria-hidden />
            Đang chờ thanh toán
          </p>
        </div>

        <div className="flex flex-col gap-5">
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
            <button type="button" onClick={pay} disabled={paying} className={buttonClass("secondary", "lg")}>
              {paying && <CircleNotchIcon className="size-5 animate-spin" />}
              Thanh toán thử trên máy này
            </button>
            <Link href={resultHref(1006, "Giao dịch bị từ chối bởi người dùng")} className={buttonClass("ghost", "lg")}>
              Hủy giao dịch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
