import type { Metadata } from "next";
import { Suspense } from "react";
import { cx } from "@/lib/format";
import { container } from "@/components/ui/styles";
import { Skeleton } from "@/components/ui/Skeleton";
import { ResetPasswordForm } from "@/components/auth/PasswordResetForms";

export const metadata: Metadata = {
  title: "Đặt lại mật khẩu",
  description: "Đặt mật khẩu mới cho tài khoản VÕ.",
  robots: { index: false },
};

export default function ResetPasswordPage() {
  return (
    <div className={cx(container, "py-10 lg:py-16")}>
      <div className="mx-auto w-full max-w-md">
        <h1 className="text-3xl font-semibold tracking-tight text-ink">Đặt lại mật khẩu</h1>
        <p className="mt-2 text-ink-2">Chọn mật khẩu mới, tối thiểu 8 ký tự.</p>
        <div className="mt-8">
          {/* Đọc ?token= qua useSearchParams nên phải nằm trong Suspense (Cache Components) */}
          <Suspense
            fallback={
              <div className="flex flex-col gap-5">
                <Skeleton className="h-11" />
                <Skeleton className="h-11" />
                <Skeleton className="h-12" />
              </div>
            }
          >
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
