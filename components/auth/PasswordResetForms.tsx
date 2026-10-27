"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { CircleNotchIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react";
import { apiRequest, ApiError } from "@/lib/api";
import { normalizePhone } from "@/lib/format";
import { useToast } from "@/components/ui/Toast";
import { Field } from "@/components/ui/Field";
import { buttonClass } from "@/components/ui/styles";
import { PasswordField } from "@/components/auth/AuthForms";

function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-lg bg-accent-soft px-4 py-3 text-sm text-accent-text">
      {message}
    </p>
  );
}

/** Bước 1: nhập SĐT hoặc email, backend gửi link đặt lại mật khẩu tới email của tài khoản. */
export function ForgotPasswordForm() {
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const value = identifier.trim();
    if (!value) {
      setFieldError("Nhập số điện thoại hoặc email");
      return;
    }
    setFieldError(undefined);
    setLoading(true);
    setError(null);
    try {
      const body = value.includes("@") ? { email: value } : { phone: normalizePhone(value) };
      await apiRequest("/api/v1/auth/forgot-password", { method: "POST", body });
      setSent(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Chưa gửi được yêu cầu. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col gap-5 rounded-lg border border-line p-6">
        <EnvelopeSimpleIcon weight="light" className="size-10 text-accent" aria-hidden />
        <div>
          <p className="font-medium text-ink">Kiểm tra hộp thư của bạn</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-2">
            Nếu tài khoản có email, chúng tôi đã gửi liên kết đặt lại mật khẩu, hiệu lực trong 30 phút. Nhớ xem cả mục Spam.
            Tài khoản chưa khai báo email thì vui lòng liên hệ cửa hàng để được hỗ trợ.
          </p>
        </div>
        <Link href="/login" className={buttonClass("dark", "lg")}>
          Quay lại đăng nhập
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      <FormError message={error} />
      <Field
        label="Số điện thoại hoặc email"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        autoComplete="username"
        error={fieldError}
      />
      <button type="submit" disabled={loading} className={buttonClass("dark", "lg", "mt-1")}>
        {loading && <CircleNotchIcon className="size-5 animate-spin" />}
        Gửi liên kết đặt lại
      </button>
      <Link href="/login" className="text-center text-sm text-ink-2 underline-offset-4 hover:text-ink hover:underline">
        Quay lại đăng nhập
      </Link>
    </form>
  );
}

/** Bước 2: mở link trong email (?token=...) và đặt mật khẩu mới. */
export function ResetPasswordForm() {
  const router = useRouter();
  const token = useSearchParams().get("token") ?? "";
  const { notify } = useToast();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!token) {
    return (
      <div className="flex flex-col gap-5">
        <FormError message="Liên kết đặt lại mật khẩu không hợp lệ hoặc thiếu mã xác nhận." />
        <Link href="/forgot-password" className={buttonClass("dark", "lg")}>
          Gửi lại liên kết mới
        </Link>
      </div>
    );
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (password.length < 8) nextErrors.password = "Mật khẩu tối thiểu 8 ký tự";
    if (confirm !== password) nextErrors.confirm = "Mật khẩu nhập lại chưa khớp";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    setError(null);
    try {
      await apiRequest("/api/v1/auth/reset-password", { method: "POST", body: { token, new_password: password } });
      notify({ tone: "success", title: "Đã đặt lại mật khẩu", description: "Đăng nhập bằng mật khẩu mới của bạn." });
      router.push("/login");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Chưa đặt lại được mật khẩu. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      <FormError message={error} />
      <PasswordField id="reset-password" label="Mật khẩu mới" value={password} onChange={setPassword} error={errors.password} autoComplete="new-password" />
      <PasswordField id="reset-password-confirm" label="Nhập lại mật khẩu mới" value={confirm} onChange={setConfirm} error={errors.confirm} autoComplete="new-password" />
      <button type="submit" disabled={loading} className={buttonClass("dark", "lg", "mt-1")}>
        {loading && <CircleNotchIcon className="size-5 animate-spin" />}
        Đặt lại mật khẩu
      </button>
      {error && (
        <Link href="/forgot-password" className="text-center text-sm text-ink-2 underline-offset-4 hover:text-ink hover:underline">
          Liên kết hết hạn? Gửi lại liên kết mới
        </Link>
      )}
    </form>
  );
}
