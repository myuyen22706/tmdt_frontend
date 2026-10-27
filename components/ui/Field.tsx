import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cx } from "@/lib/format";
import { inputClass, labelClass } from "@/components/ui/styles";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: ReactNode;
  error?: string | null;
  optional?: boolean;
}

/** Ô nhập chuẩn: nhãn phía trên, gợi ý và lỗi phía dưới (không dùng placeholder làm nhãn). */
export function Field({ label, hint, error, optional, className, id, ...props }: FieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className={cx("flex flex-col gap-2", className)}>
      <label htmlFor={inputId} className={labelClass}>
        {label}
        {optional && <span className="ml-1 font-normal text-ink-3">(không bắt buộc)</span>}
      </label>
      <input id={inputId} aria-invalid={error ? true : undefined} aria-describedby={describedBy} className={inputClass} {...props} />
      {error ? (
        <p id={`${inputId}-error`} className="text-sm text-accent-text">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-sm text-ink-3">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
