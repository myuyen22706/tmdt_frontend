/**
 * Ghi nhớ mã đơn và SĐT đặt hàng trên trình duyệt để khách vãng lai mở lại đơn mà không phải nhập lại.
 * Backend yêu cầu SĐT khớp khi xem đơn không đăng nhập (chống dò mã đơn).
 */
const KEY = "recent_orders";

interface RecentOrder {
  code: string;
  phone: string;
  at: number;
}

function read(): RecentOrder[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveRecentOrder(code: string, phone: string) {
  try {
    const rest = read().filter((o) => o.code !== code);
    localStorage.setItem(KEY, JSON.stringify([{ code, phone, at: Date.now() }, ...rest].slice(0, 10)));
  } catch {
    // Bộ nhớ trình duyệt không khả dụng
  }
}

export function getOrderPhone(code: string): string | null {
  return read().find((o) => o.code === code)?.phone ?? null;
}

export function listRecentOrders(): RecentOrder[] {
  return read();
}
