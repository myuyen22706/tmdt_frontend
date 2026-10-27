const vnd = new Intl.NumberFormat("vi-VN");

/** 240000 -> "240.000₫" */
export function formatVND(value: number): string {
  return `${vnd.format(Math.round(value))}₫`;
}

/** 240000 -> "240k" dùng cho nhãn khoảng giá ngắn gọn */
export function formatVNDShort(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toLocaleString("vi-VN", { maximumFractionDigits: 1 })}tr`;
  if (value >= 1000) return `${Math.round(value / 1000)}k`;
  return String(value);
}

export function formatDate(value?: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function formatDateTime(value?: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Số điện thoại Việt Nam: 10 số, bắt đầu bằng 0 */
export function isValidVNPhone(value: string): boolean {
  return /^0\d{9}$/.test(value.replace(/[\s.]/g, ""));
}

export function normalizePhone(value: string): string {
  return value.replace(/[\s.]/g, "");
}
