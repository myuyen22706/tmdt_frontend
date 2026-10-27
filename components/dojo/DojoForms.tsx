"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { CheckCircleIcon, CircleNotchIcon } from "@phosphor-icons/react";
import { apiRequest, ApiError } from "@/lib/api";
import { MARTIAL_ARTS } from "@/lib/catalog";
import { cx, isValidVNPhone, normalizePhone } from "@/lib/format";
import { useAuth } from "@/components/providers/AuthProvider";
import { Field } from "@/components/ui/Field";
import { buttonClass, inputClass, labelClass } from "@/components/ui/styles";

export function CampaignLookup() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const clean = code.trim().toUpperCase();
    if (clean.length < 4) {
      setError("Nhập mã đợt do huấn luyện viên gửi, ví dụ PHUDONG2026");
      return;
    }
    router.push(`/dojo/${encodeURIComponent(clean)}`);
  };

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-3">
      <label htmlFor="campaign-code" className={labelClass}>
        Mã đợt đặt hàng
      </label>
      <div className="flex gap-2">
        <input
          id="campaign-code"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError(null);
          }}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? "campaign-code-error" : undefined}
          className={cx(inputClass, "uppercase")}
          autoComplete="off"
        />
        <button type="submit" className={buttonClass("dark", "md")}>
          Mở đợt
        </button>
      </div>
      {error && (
        <p id="campaign-code-error" className="text-sm text-accent-text">
          {error}
        </p>
      )}
    </form>
  );
}

export function ClubRegisterForm() {
  const { user } = useAuth();
  const [form, setForm] = useState({ club_name: "", martial_art_id: "vovinam", address: "", coach_name: "", coach_phone: "", coach_email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  const set = (key: keyof typeof form) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.club_name.trim().length < 2) next.club_name = "Nhập tên câu lạc bộ, võ đường";
    if (form.address.trim().length < 5) next.address = "Nhập địa chỉ tập luyện";
    if (form.coach_name.trim().length < 2) next.coach_name = "Nhập tên huấn luyện viên";
    if (!isValidVNPhone(form.coach_phone)) next.coach_phone = "Số điện thoại gồm 10 số, bắt đầu bằng 0";
    if (form.coach_email && !/^\S+@\S+\.\S+$/.test(form.coach_email)) next.coach_email = "Email chưa đúng định dạng";
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;

    setLoading(true);
    setFormError(null);
    try {
      const club = await apiRequest<{ id: string; club_name: string }>("/api/v1/dojos/clubs", {
        method: "POST",
        token: user?.access_token,
        body: { ...form, coach_phone: normalizePhone(form.coach_phone), coach_email: form.coach_email.trim() || undefined },
      });
      setDone(club.club_name);
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Chưa gửi được đăng ký. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="fade-in flex flex-col items-start gap-3 rounded-md border border-line bg-surface p-6">
        <CheckCircleIcon weight="fill" className="size-8 text-success" aria-hidden />
        <p className="text-lg font-semibold text-ink">Đã nhận đăng ký {done}</p>
        <p className="text-sm leading-relaxed text-ink-2">
          Quản trị viên sẽ xét duyệt và liên hệ huấn luyện viên qua số điện thoại đã đăng ký. Sau khi được duyệt, bạn có thể mở đợt đặt đồng phục cho võ sinh.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5 rounded-md border border-line bg-surface p-5 sm:p-7">
      <Field label="Tên câu lạc bộ, võ đường" value={form.club_name} onChange={(e) => set("club_name")(e.target.value)} error={errors.club_name} />
      <div className="flex flex-col gap-2">
        <label htmlFor="club-art" className={labelClass}>
          Môn võ
        </label>
        <select id="club-art" value={form.martial_art_id} onChange={(e) => set("martial_art_id")(e.target.value)} className={cx(inputClass, "cursor-pointer")}>
          {MARTIAL_ARTS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </select>
      </div>
      <Field label="Địa chỉ tập luyện" value={form.address} onChange={(e) => set("address")(e.target.value)} autoComplete="street-address" error={errors.address} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Huấn luyện viên phụ trách" value={form.coach_name} onChange={(e) => set("coach_name")(e.target.value)} autoComplete="name" error={errors.coach_name} />
        <Field label="Số điện thoại" value={form.coach_phone} onChange={(e) => set("coach_phone")(e.target.value)} inputMode="tel" autoComplete="tel" error={errors.coach_phone} />
      </div>
      <Field label="Email" optional type="email" value={form.coach_email} onChange={(e) => set("coach_email")(e.target.value)} autoComplete="email" error={errors.coach_email} />
      {formError && (
        <p role="alert" className="rounded-lg bg-accent-soft px-3 py-2.5 text-sm text-accent-text">
          {formError}
        </p>
      )}
      <button type="submit" disabled={loading} className={buttonClass("primary", "lg")}>
        {loading && <CircleNotchIcon className="size-5 animate-spin" />}
        Gửi đăng ký võ đường
      </button>
    </form>
  );
}
