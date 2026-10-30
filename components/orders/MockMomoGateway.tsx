"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  ArrowLeftIcon,
  BarcodeIcon,
  CircleNotchIcon,
  ClockIcon,
  FlaskIcon,
  InfoIcon,
  MoneyIcon,
  QrCodeIcon,
  StorefrontIcon,
  WalletIcon,
} from "@phosphor-icons/react";
import { apiRequest, ApiError } from "@/lib/api";
import { formatVND } from "@/lib/format";
import { getOrderPhone } from "@/lib/recent-orders";
import type { Order } from "@/lib/types";
import { useAuth } from "@/components/providers/AuthProvider";
import { buttonClass } from "@/components/ui/styles";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const noopSubscribe = () => () => {};

/** Backend tự hủy đơn MoMo chưa thanh toán sau 15 phút (POST /payments/momo/check-expired). */
const ORDER_TTL_MS = 15 * 60 * 1000;

/** Mongo trả datetime UTC không kèm múi giờ; thêm "Z" để trình duyệt không hiểu nhầm là giờ địa phương. */
function parseServerTime(value: string): number {
  const hasZone = /(?:Z|[+-]\d{2}:?\d{2})$/.test(value);
  return new Date(hasZone ? value : `${value}Z`).getTime();
}

function formatCountdown(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

/**
 * Trang cổng thanh toán giả lập khi backend bật MOMO_MOCK (Mục 7), bố cục giống cổng MoMo.
 * Bấm "Thanh toán" là gọi IPN giả lập rồi chuyển thẳng sang trang đơn hàng (?placed=1).
 * Quét mã QR bằng điện thoại vẫn dùng được: trang này kiểm tra đơn và tự chuyển khi đã thanh toán.
 */
export function MockMomoGateway() {
  const router = useRouter();
  const params = useSearchParams();
  const { token, ready } = useAuth();
  const orderCode = params.get("orderId") ?? "";
  const amount = Number(params.get("amount") ?? 0);
  const requestId = params.get("requestId") ?? "";
  const orderInfo = params.get("orderInfo") ?? `Thanh toan don hang ${orderCode}`;
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const origin = useSyncExternalStore(noopSubscribe, () => window.location.origin, () => "");

  const orderHref = `/orders/${encodeURIComponent(orderCode)}?placed=1`;
  // Cùng tham số MoMo gắn vào redirectUrl khi khách hủy; trang kết quả cho phép thanh toán lại
  const cancelHref = `/orders/payment-result?${new URLSearchParams({
    orderId: orderCode,
    amount: String(amount),
    requestId,
    resultCode: "1006",
    message: "Giao dịch bị từ chối bởi người dùng",
  })}`;
  const scanUrl = `${origin}/payments/momo/scan?${new URLSearchParams({ orderId: orderCode, amount: String(amount) })}`;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?${new URLSearchParams({ size: "320x320", margin: "8", data: scanUrl })}`;

  const remaining = expiresAt === null ? null : expiresAt - now;
  const expired = remaining !== null && remaining <= 0;

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Đọc hạn thanh toán của đơn, và chờ trường hợp khách quét QR rồi xác nhận trên điện thoại
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
            router.replace(orderHref);
            return;
          }
          if (order.created_at && !cancelled) setExpiresAt(parseServerTime(order.created_at) + ORDER_TTL_MS);
        } catch {
          // thử lại ở lượt sau
        }
        await wait(2000);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [ready, orderCode, token, orderHref, router]);

  const pay = async () => {
    setPaying(true);
    setError(null);
    try {
      // MOMO_MOCK: gọi IPN giả lập (có chữ ký) để backend ghi nhận thanh toán, rồi về trang đơn hàng
      await apiRequest("/api/v1/payments/momo/mock-callback", {
        method: "POST",
        body: { order_code: orderCode, result_code: 0 },
      });
      router.replace(orderHref);
    } catch (err) {
      setPaying(false);
      setError(err instanceof ApiError ? err.message : "Chưa thanh toán được. Vui lòng thử lại.");
    }
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
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 py-10">
      <div className="grid overflow-hidden rounded-lg border border-line bg-surface shadow-soft md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        {/* Cột thông tin đơn, màu hồng MoMo như cổng thật */}
        <aside className="flex flex-col gap-6 bg-[#a50064] p-6 text-white sm:p-8">
          <div>
            <p className="inline-flex items-center gap-2 text-sm text-white/80">
              <ClockIcon className="size-4" aria-hidden />
              Đơn hàng hết hạn sau
            </p>
            <p className="mt-1 text-3xl font-semibold tabular" aria-live="off">
              {remaining === null ? "--:--" : formatCountdown(remaining)}
            </p>
          </div>

          <dl className="grid gap-5 text-sm">
            <div className="grid gap-1 border-b border-white/20 pb-4">
              <dt className="inline-flex items-center gap-2 text-white/80">
                <StorefrontIcon className="size-4" aria-hidden />
                Nhà cung cấp
              </dt>
              <dd className="text-base font-semibold">VÕ SPORT</dd>
            </div>
            <div className="grid gap-1 border-b border-white/20 pb-4">
              <dt className="inline-flex items-center gap-2 text-white/80">
                <MoneyIcon className="size-4" aria-hidden />
                Số tiền
              </dt>
              <dd className="text-base font-semibold tabular">{formatVND(amount)}</dd>
            </div>
            <div className="grid gap-1 border-b border-white/20 pb-4">
              <dt className="inline-flex items-center gap-2 text-white/80">
                <InfoIcon className="size-4" aria-hidden />
                Thông tin
              </dt>
              <dd className="break-words">{orderInfo}</dd>
            </div>
            <div className="grid gap-1">
              <dt className="inline-flex items-center gap-2 text-white/80">
                <BarcodeIcon className="size-4" aria-hidden />
                Đơn hàng
              </dt>
              <dd className="font-medium tabular">{orderCode}</dd>
            </div>
          </dl>

          <Link
            href={cancelHref}
            className="mt-auto inline-flex items-center gap-2 self-start rounded-sm px-2 py-1.5 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white"
          >
            <ArrowLeftIcon className="size-4" aria-hidden />
            Quay lại
          </Link>
        </aside>

        <section className="flex flex-col gap-6 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <p className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-[#a50064]">
              <WalletIcon weight="fill" className="size-7" aria-hidden />
              Ví MoMo
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-sm bg-muted px-2.5 py-1 text-xs font-medium text-ink-2">
              <FlaskIcon className="size-4" aria-hidden />
              Môi trường thử
            </span>
          </div>

          <div className="text-center">
            <h1 className="text-xl font-semibold tracking-tight text-ink">Xác nhận thanh toán</h1>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-ink tabular">{formatVND(amount)}</p>
          </div>

          {error && (
            <p className="rounded-sm bg-muted px-3 py-2 text-sm text-accent-text" role="alert">
              {error}
            </p>
          )}

          {expired ? (
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="text-sm text-ink-2">Đơn đã quá hạn thanh toán và được hệ thống tự hủy.</p>
              <Link href={`/orders/${encodeURIComponent(orderCode)}`} className={buttonClass("secondary", "lg")}>
                Xem đơn hàng
              </Link>
            </div>
          ) : (
            <button
              type="button"
              onClick={pay}
              disabled={paying}
              className={buttonClass("primary", "lg", "w-full bg-[#a50064] hover:bg-[#8c0055]")}
            >
              {paying && <CircleNotchIcon className="size-5 animate-spin" aria-hidden />}
              {paying ? "Đang thanh toán" : `Thanh toán ${formatVND(amount)}`}
            </button>
          )}

          {!expired && (
            <>
              <div className="flex items-center gap-3 text-xs text-ink-3" aria-hidden>
                <span className="h-px flex-1 bg-line" />
                Hoặc
                <span className="h-px flex-1 bg-line" />
              </div>

              <div className="flex items-center gap-4">
                <div className="grid size-[120px] shrink-0 place-items-center rounded-sm border border-line bg-white p-1.5">
                  {origin ? (
                    <Image src={qrSrc} alt={`Mã QR thanh toán đơn ${orderCode}`} width={120} height={120} unoptimized className="size-full" />
                  ) : (
                    <CircleNotchIcon className="size-6 animate-spin text-ink-3" aria-hidden />
                  )}
                </div>
                <p className="inline-flex items-start gap-2 text-sm text-ink-2">
                  <QrCodeIcon className="mt-0.5 size-5 shrink-0" aria-hidden />
                  Quét mã bằng camera điện thoại rồi bấm xác nhận. Trang này tự chuyển khi thanh toán xong.
                </p>
              </div>
            </>
          )}
        </section>
      </div>

      <p className="text-center text-xs text-ink-3">
        Cổng MoMo giả lập để demo, không trừ tiền thật. Đơn chưa thanh toán sẽ tự hủy sau 15 phút.
      </p>
    </div>
  );
}
