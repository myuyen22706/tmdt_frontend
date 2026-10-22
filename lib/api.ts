/**
 * Cấu hình URL kết nối Backend API (Railway / Localhost).
 * Tự động chuẩn hóa dấu gạch chéo cuối để tránh lỗi double-slash khi ghép endpoint.
 */
const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
export const API_BASE_URL = rawApiUrl.replace(/\/+$/, "");

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const SITE_BASE_URL = rawSiteUrl.replace(/\/+$/, "");

export function getApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}
