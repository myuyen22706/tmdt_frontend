"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { CircleNotchIcon, EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { ApiError } from "@/lib/api";
import { cx, isValidVNPhone, normalizePhone } from "@/lib/format";
import type { AuthUser } from "@/lib/types";
import { isStaffRole, useAuth } from "@/components/providers/AuthProvider";
import { useToast } from "@/components/ui/Toast";
import { Field } from "@/components/ui/Field";
import { buttonClass, inputClass, labelClass } from "@/components/ui/styles";

const DEMO_ACCOUNTS = [
  { role: "Quản trị viên", phone: "0988000001", password: "AdminPass123" },
  { role: "Nhân viên kho", phone: "0988000002", password: "StaffPass123" },
  { role: "Huấn luyện viên", phone: "0988000003", password: "CoachPass123" },
  { role: "Khách hàng", phone: "0988000004", password: "UserPass123" },
];

function PasswordField({ id, label, value, onChange, error, autoComplete }: { id: string; label: string; value: string; onChange: (v: string) => void; error?: string; autoComplete: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cx(inputClass, "pr-11")}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute top-1/2 right-1.5 grid size-8 -translate-y-1/2 place-items-center rounded-md text-ink-3 hover:text-ink cursor-pointer"
          aria-label={visible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
        >
          {visible ? <EyeSlashIcon className="size-[18px]" /> : <EyeIcon className="size-[18px]" />}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm text-accent-text">
          {error}
        </p>
      )}
    </div>
  );
}

export function AuthForms() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const { login, register } = useAuth();
  const { notify } = useToast();
  const [tab, setTab] = useState<"login" | "register">(searchParams.get("tab") === "register" ? "register" : "login");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isCoach, setIsCoach] = useState(false);

  const afterAuth = (user: AuthUser) => {
    notify({ tone: "success", title: `Xin chào, ${user.full_name}` });
    const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : null;
    router.push(safeNext ?? (isStaffRole(user.role) ? "/admin" : "/"));
  };

  const doLogin = async (p: string, pw: string) => {
    setLoading(true);
    setFormError(null);
    try {
      afterAuth(await login(normalizePhone(p), pw));
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const submitLogin = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!phone.trim()) nextErrors.phone = "Nhập số điện thoại hoặc email";
    if (!password) nextErrors.password = "Nhập mật khẩu";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) doLogin(phone, password);
  };

  const submitRegister = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (fullName.trim().length < 2) nextErrors.fullName = "Nhập họ và tên";
    if (!isValidVNPhone(phone)) nextErrors.phone = "Số điện thoại gồm 10 số, bắt đầu bằng 0";
    if (email && !/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Email chưa đúng định dạng";
    if (password.length < 8) nextErrors.password = "Mật khẩu tối thiểu 8 ký tự";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    setFormError(null);
    try {
      afterAuth(
        await register({ full_name: fullName.trim(), phone: normalizePhone(phone), password, email: email.trim() || undefined, role: isCoach ? "coach" : "customer" })
      );
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Chưa tạo được tài khoản. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (t: "login" | "register") => {
    setTab(t);
    setErrors({});
    setFormError(null);
  };

  return (
    <div className="flex flex-col gap-8">
      <div role="tablist" aria-label="Đăng nhập hoặc đăng ký" className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1">
        {(["login", "register"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            type="button"
            aria-selected={tab === t}
            onClick={() => switchTab(t)}
            className={cx(
              "h-10 rounded-md text-sm font-medium transition-[background-color,color,box-shadow] duration-200 cursor-pointer",
              tab === t ? "bg-surface text-ink shadow-soft" : "text-ink-2 hover:text-ink"
            )}
          >
            {t === "login" ? "Đăng nhập" : "Tạo tài khoản"}
          </button>
        ))}
      </div>

      {formError && (
        <p role="alert" className="rounded-lg bg-accent-soft px-4 py-3 text-sm text-accent-text">
          {formError}
        </p>
      )}

      {tab === "login" ? (
        <form onSubmit={submitLogin} noValidate className="flex flex-col gap-5">
          <Field label="Số điện thoại hoặc email" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="username" inputMode="tel" error={errors.phone} />
          <PasswordField id="login-password" label="Mật khẩu" value={password} onChange={setPassword} error={errors.password} autoComplete="current-password" />
          <button type="submit" disabled={loading} className={buttonClass("dark", "lg", "mt-1")}>
            {loading && <CircleNotchIcon className="size-5 animate-spin" />}
            Đăng nhập
          </button>
        </form>
      ) : (
        <form onSubmit={submitRegister} noValidate className="flex flex-col gap-5">
          <Field label="Họ và tên" value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete="name" error={errors.fullName} />
          <Field label="Số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" inputMode="tel" error={errors.phone} />
          <Field label="Email" optional type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" error={errors.email} />
          <PasswordField id="register-password" label="Mật khẩu" value={password} onChange={setPassword} error={errors.password} autoComplete="new-password" />
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-line p-3.5 text-sm text-ink-2 transition-colors hover:border-line-strong">
            <input type="checkbox" checked={isCoach} onChange={(e) => setIsCoach(e.target.checked)} className="mt-0.5 size-4 accent-accent" />
            <span>
              <span className="font-medium text-ink">Tôi là huấn luyện viên</span>
              <span className="mt-0.5 block text-[13px]">Để mở đợt đặt đồng phục cho võ đường với giá sỉ.</span>
            </span>
          </label>
          <button type="submit" disabled={loading} className={buttonClass("dark", "lg", "mt-1")}>
            {loading && <CircleNotchIcon className="size-5 animate-spin" />}
            Tạo tài khoản
          </button>
        </form>
      )}

      <div className="border-t border-line pt-6">
        <p className="text-sm font-medium text-ink">Tài khoản dùng thử</p>
        <p className="mt-1 text-[13px] text-ink-3">Dữ liệu mẫu của đồ án. Bấm để đăng nhập nhanh.</p>
        <ul className="mt-4 grid grid-cols-2 gap-2">
          {DEMO_ACCOUNTS.map((acc) => (
            <li key={acc.phone}>
              <button
                type="button"
                disabled={loading}
                onClick={() => doLogin(acc.phone, acc.password)}
                className="flex w-full flex-col items-start rounded-lg border border-line bg-surface px-3 py-2.5 text-left transition-[border-color,transform] duration-200 hover:border-ink active:scale-[0.98] disabled:opacity-60 cursor-pointer"
              >
                <span className="text-sm font-medium text-ink">{acc.role}</span>
                <span className="text-[13px] text-ink-3 tabular">{acc.phone}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
