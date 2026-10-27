"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { CheckCircleIcon, CircleNotchIcon } from "@phosphor-icons/react";
import { apiRequest, ApiError } from "@/lib/api";
import { EMBROIDERY_FEE, EMBROIDERY_MAX_LENGTH } from "@/lib/catalog";
import { cx, formatDate, formatVND, isValidVNPhone, normalizePhone } from "@/lib/format";
import type { DojoCampaign, Product, ProductDetail } from "@/lib/types";
import { Field } from "@/components/ui/Field";
import { Skeleton } from "@/components/ui/Skeleton";
import { buttonClass, chipClass, inputClass } from "@/components/ui/styles";
import { ProductImage } from "@/components/product/ProductImage";

interface StudentOrder {
  order_code: string;
  student_name: string;
  product_name: string;
  size: string;
  total_amount: number;
  payment_method: string;
}

export function CampaignOrder({ code }: { code: string }) {
  const [campaign, setCampaign] = useState<DojoCampaign | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadError, setLoadError] = useState<{ status: number; message: string } | null>(null);

  const [productId, setProductId] = useState<string | null>(null);
  const [sku, setSku] = useState<string | null>(null);
  const [studentName, setStudentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [embroider, setEmbroider] = useState(false);
  const [embName, setEmbName] = useState("");
  const [payByClub, setPayByClub] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [result, setResult] = useState<StudentOrder | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const c = await apiRequest<DojoCampaign>(`/api/v1/dojos/campaigns/${encodeURIComponent(code)}`);
        const details = await Promise.all(
          c.applicable_product_ids.map((id) => apiRequest<ProductDetail>(`/api/v1/products/${encodeURIComponent(id)}`).catch(() => null))
        );
        if (!active) return;
        const list = details.filter((d): d is ProductDetail => !!d).map((d) => d.product);
        setCampaign(c);
        setProducts(list);
        setProductId(list[0]?.id ?? null);
        setPayByClub(c.allow_club_consolidated_payment);
      } catch (err) {
        if (active) setLoadError({ status: err instanceof ApiError ? err.status : 0, message: err instanceof ApiError ? err.message : "Không tải được đợt đặt hàng" });
      }
    })();
    return () => {
      active = false;
    };
  }, [code]);

  if (loadError) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{loadError.status === 404 ? "Không tìm thấy đợt đặt hàng" : "Chưa tải được đợt đặt hàng"}</h1>
        <p className="max-w-md text-ink-2">{loadError.status === 404 ? `Mã ${code} không tồn tại. Kiểm tra lại đường dẫn huấn luyện viên đã gửi.` : loadError.message}</p>
        <Link href="/dojos" className={buttonClass("secondary", "lg")}>
          Nhập mã khác
        </Link>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="grid gap-10 py-10 lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 w-4/5" />
          <Skeleton className="h-24 rounded-md" />
        </div>
        <Skeleton className="h-96 rounded-md" />
      </div>
    );
  }

  const product = products.find((p) => p.id === productId) ?? null;
  const variant = product?.variants.find((v) => v.sku === sku) ?? null;
  const unit = product ? Math.floor((product.price * (100 - campaign.discount_percent)) / 100) : 0;
  const total = unit + (embroider ? EMBROIDERY_FEE : 0);
  const progress = Math.min(campaign.total_ordered / Math.max(campaign.target_quantity, 1), 1);
  const isOpen = campaign.status === "open";

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (studentName.trim().length < 2) next.studentName = "Nhập họ tên võ sinh";
    if (!isValidVNPhone(parentPhone)) next.parentPhone = "Số điện thoại gồm 10 số, bắt đầu bằng 0";
    if (!variant) next.size = "Chọn size cho võ sinh";
    if (embroider && !embName.trim()) next.embName = "Nhập tên cần thêu";
    setErrors(next);
    if (Object.keys(next).length || !product || !variant) return;

    setSubmitting(true);
    setFormError(null);
    try {
      const order = await apiRequest<StudentOrder>(`/api/v1/dojos/campaigns/${encodeURIComponent(campaign.campaign_code)}/orders`, {
        method: "POST",
        body: {
          student_name: studentName.trim(),
          parent_phone: normalizePhone(parentPhone),
          product_id: product.id,
          sku: variant.sku,
          size: variant.size,
          color: variant.color,
          is_embroidered: embroider,
          embroidery_name: embroider ? embName.trim() : undefined,
          club_consolidated_payment: payByClub,
        },
      });
      setResult(order);
      setCampaign((c) => (c ? { ...c, total_ordered: c.total_ordered + 1 } : c));
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Chưa đặt được. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-10 py-8 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-12">
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-sm text-ink-3">{campaign.club_name}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink md:text-4xl">{campaign.campaign_title}</h1>
          <p className="mt-3 text-ink-2">
            Giá sỉ giảm <span className="font-semibold text-ink">{campaign.discount_percent}%</span>
            {campaign.deadline ? `, hạn chốt ${formatDate(campaign.deadline)}` : ""}.
            {campaign.has_custom_logo ? " Đồng phục có thêu logo câu lạc bộ." : ""}
          </p>
        </div>

        <div className="rounded-md border border-line bg-surface p-5">
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-ink-2">Đã đặt trong đợt</span>
            <span className="font-semibold text-ink tabular">
              {campaign.total_ordered} / {campaign.target_quantity} bộ
            </span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full origin-left rounded-full bg-accent transition-transform duration-700 ease-out-soft" style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>

        {products.length > 0 && (
          <ul className="flex flex-col gap-3">
            {products.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => {
                    setProductId(p.id);
                    setSku(null);
                  }}
                  aria-pressed={productId === p.id}
                  className={cx(
                    "flex w-full items-center gap-4 rounded-md border p-3 text-left transition-[border-color,box-shadow] duration-200 cursor-pointer",
                    productId === p.id ? "border-ink shadow-[0_0_0_1px_var(--ink)]" : "border-line hover:border-line-strong"
                  )}
                >
                  <ProductImage product={p} sizes="80px" compact className="size-20 shrink-0 rounded-sm" />
                  <div className="min-w-0">
                    <p className="font-medium text-ink">{p.name}</p>
                    <p className="mt-1 text-sm tabular">
                      <span className="font-semibold text-ink">{formatVND(Math.floor((p.price * (100 - campaign.discount_percent)) / 100))}</span>
                      <span className="ml-2 text-ink-3 line-through">{formatVND(p.price)}</span>
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        {result ? (
          <div className="fade-in flex flex-col gap-4 rounded-md border border-line bg-surface p-6">
            <CheckCircleIcon weight="fill" className="size-9 text-success" aria-hidden />
            <div>
              <p className="text-lg font-semibold text-ink">Đã đặt cho {result.student_name}</p>
              <p className="mt-1 text-sm text-ink-2">
                Mã đơn <span className="font-medium text-ink tabular">{result.order_code}</span>. {result.product_name}, {result.size}.
              </p>
            </div>
            <p className="text-sm text-ink-2">
              {result.payment_method === "CLUB_CONSOLIDATED"
                ? `Võ đường thanh toán gộp. Phụ huynh gửi ${formatVND(result.total_amount)} cho huấn luyện viên.`
                : `Đã ghi nhận thanh toán ${formatVND(result.total_amount)}.`}
            </p>
            <button
              type="button"
              onClick={() => {
                setResult(null);
                setStudentName("");
                setEmbName("");
                setEmbroider(false);
                setSku(null);
              }}
              className={buttonClass("secondary", "lg")}
            >
              Đặt thêm cho võ sinh khác
            </button>
          </div>
        ) : !isOpen ? (
          <div className="rounded-md bg-muted p-6 text-ink-2">Đợt đặt hàng này đã chốt sổ. Liên hệ huấn luyện viên để được hỗ trợ.</div>
        ) : (
          <form onSubmit={submit} noValidate className="flex flex-col gap-5 rounded-md border border-line bg-surface p-5 sm:p-7">
            <h2 className="text-lg font-semibold text-ink">Thông tin võ sinh</h2>
            <Field label="Họ tên võ sinh" value={studentName} onChange={(e) => setStudentName(e.target.value)} autoComplete="off" error={errors.studentName} />
            <Field label="Số điện thoại phụ huynh" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} inputMode="tel" autoComplete="tel" error={errors.parentPhone} />

            {product && (
              <div>
                <p className="mb-3 text-sm font-medium text-ink">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button key={v.sku} type="button" disabled={!v.in_stock} onClick={() => setSku(v.sku)} aria-pressed={sku === v.sku} className={chipClass(sku === v.sku, !v.in_stock)}>
                      {v.size}
                    </button>
                  ))}
                </div>
                {errors.size && <p className="mt-2 text-sm text-accent-text">{errors.size}</p>}
                <Link href="/size-guide" target="_blank" className="mt-2 inline-block text-[13px] font-medium text-accent-text">
                  Chưa biết size? Mở trang tư vấn size
                </Link>
              </div>
            )}

            <label className="flex cursor-pointer items-start gap-3 text-sm">
              <input type="checkbox" checked={embroider} onChange={(e) => setEmbroider(e.target.checked)} className="mt-0.5 size-4 accent-accent" />
              <span>
                <span className="font-medium text-ink">Thêu tên võ sinh</span> <span className="text-ink-2">(+{formatVND(EMBROIDERY_FEE)})</span>
              </span>
            </label>
            {embroider && (
              <div className="flex flex-col gap-2 pl-7">
                <label htmlFor="camp-emb" className="sr-only">
                  Tên cần thêu
                </label>
                <input id="camp-emb" value={embName} maxLength={EMBROIDERY_MAX_LENGTH} onChange={(e) => setEmbName(e.target.value)} aria-invalid={!!errors.embName || undefined} className={inputClass} />
                <p className={cx("text-[13px]", errors.embName ? "text-accent-text" : "text-ink-3")}>{errors.embName ?? `${embName.length}/${EMBROIDERY_MAX_LENGTH} ký tự`}</p>
              </div>
            )}

            {campaign.allow_club_consolidated_payment && (
              <fieldset className="flex flex-col gap-2">
                <legend className="mb-2 text-sm font-medium text-ink">Thanh toán</legend>
                {[
                  { value: true, label: "Gửi tiền cho huấn luyện viên", hint: "Võ đường thanh toán gộp cho cả lớp" },
                  { value: false, label: "Thanh toán MoMo ngay", hint: "Ghi nhận thanh toán tức thì" },
                ].map((opt) => (
                  <label key={String(opt.value)} className={cx("flex cursor-pointer items-start gap-3 rounded-sm border p-3.5 text-sm transition-colors", payByClub === opt.value ? "border-ink" : "border-line hover:border-line-strong")}>
                    <input type="radio" name="pay" checked={payByClub === opt.value} onChange={() => setPayByClub(opt.value)} className="mt-0.5 size-4 accent-accent" />
                    <span>
                      <span className="font-medium text-ink">{opt.label}</span>
                      <span className="block text-[13px] text-ink-3">{opt.hint}</span>
                    </span>
                  </label>
                ))}
              </fieldset>
            )}

            <div className="flex items-baseline justify-between border-t border-line pt-4">
              <span className="text-sm text-ink-2">Thành tiền</span>
              <span className="text-2xl font-semibold text-ink tabular">{formatVND(total)}</span>
            </div>
            {formError && (
              <p role="alert" className="rounded-lg bg-accent-soft px-3 py-2.5 text-sm text-accent-text">
                {formError}
              </p>
            )}
            <button type="submit" disabled={submitting || !product} className={buttonClass("primary", "lg")}>
              {submitting && <CircleNotchIcon className="size-5 animate-spin" />}
              Đặt võ phục cho con
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
