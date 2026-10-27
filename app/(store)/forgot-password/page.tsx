import type { Metadata } from "next";
import { cx } from "@/lib/format";
import { container } from "@/components/ui/styles";
import { ForgotPasswordForm } from "@/components/auth/PasswordResetForms";

export const metadata: Metadata = {
  title: "Quên mật khẩu",
  description: "Nhận liên kết đặt lại mật khẩu tài khoản VÕ qua email.",
  robots: { index: false },
};

export default function ForgotPasswordPage() {
  return (
    <div className={cx(container, "py-10 lg:py-16")}>
      <div className="mx-auto w-full max-w-md">
        <h1 className="text-3xl font-semibold tracking-tight text-ink">Quên mật khẩu</h1>
        <p className="mt-2 text-ink-2">Nhập số điện thoại hoặc email đã đăng ký, chúng tôi sẽ gửi liên kết đặt lại mật khẩu tới email của bạn.</p>
        <div className="mt-8">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
