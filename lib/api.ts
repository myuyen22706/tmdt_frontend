// Lấy base URL động theo hostname của trình duyệt.
// Trình duyệt mở trang qua localhost -> gọi API ở localhost:8000
// Trình duyệt mở trang qua LAN IP (ví dụ 10.224.209.168) -> gọi API ở đúng IP đó, cổng 8000.
// Nhờ vậy frontend chạy được từ điện thoại / máy khác trong cùng mạng mà không fail "localhost".
export function getApiBase(): string {
  if (typeof window === "undefined") {
    // SSR fallback
    return "http://localhost:8000";
  }
  const envUrl = process.env.NEXT_PUBLIC_API_BASE;
  if (envUrl) return envUrl.replace(/\/+$/, "");
  const { protocol, hostname } = window.location;
  return `${protocol}//${hostname}:8000`;
}

export const API_BASE = typeof window !== "undefined"
  ? `${window.location.protocol}//${window.location.hostname}:8000`
  : "http://localhost:8000";
