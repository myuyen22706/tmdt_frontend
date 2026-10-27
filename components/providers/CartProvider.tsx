"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { apiRequest, ApiError } from "@/lib/api";
import { FREESHIP_THRESHOLD } from "@/lib/catalog";
import type { Cart, CartItem } from "@/lib/types";
import { useAuth } from "@/components/providers/AuthProvider";
import { useToast } from "@/components/ui/Toast";

const SESSION_KEY = "cart_session_id";

const EMPTY_CART: Cart = {
  items: [],
  total_items: 0,
  subtotal: 0,
  embroidery_total: 0,
  has_embroidery: false,
  shipping_fee: 0,
  grand_total: 0,
};

export interface AddToCartInput {
  product_id: string;
  sku: string;
  quantity: number;
  is_embroidered?: boolean;
  embroidery_name?: string;
  productName?: string;
}

interface CartContextValue {
  cart: Cart;
  ready: boolean;
  isOpen: boolean;
  pendingLine: string | null;
  open: () => void;
  close: () => void;
  add: (input: AddToCartInput, options?: { openDrawer?: boolean }) => Promise<boolean>;
  updateQuantity: (item: CartItem, quantity: number) => Promise<void>;
  remove: (item: CartItem) => Promise<void>;
  clear: () => Promise<void>;
  refresh: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export const lineKey = (item: Pick<CartItem, "sku" | "embroidery_name">) => `${item.sku}|${item.embroidery_name ?? ""}`;

/** Tính lại tổng tiền phía client để cập nhật lạc quan (cùng quy tắc với backend /cart). */
function recompute(items: CartItem[]): Cart {
  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const embroidery_total = items.reduce((sum, it) => sum + (it.is_embroidered ? it.embroidery_fee * it.quantity : 0), 0);
  const shipping_fee = subtotal === 0 || subtotal >= FREESHIP_THRESHOLD ? 0 : 30000;
  return {
    items,
    total_items: items.reduce((sum, it) => sum + it.quantity, 0),
    subtotal,
    embroidery_total,
    has_embroidery: items.some((it) => it.is_embroidered),
    shipping_fee,
    grand_total: subtotal + embroidery_total + shipping_fee,
  };
}

/** Endpoint sửa/xóa đúng một dòng hàng (cùng SKU có thể có nhiều dòng thêu tên khác nhau). */
const lineQuery = (item: CartItem) =>
  `/api/v1/cart/items/${encodeURIComponent(item.sku)}?embroidery_name=${encodeURIComponent(item.embroidery_name ?? "")}`;

function getSessionId(): string {
  try {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `sess-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "guest_default";
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { token, ready: authReady } = useAuth();
  const { notify } = useToast();
  const [cart, setCart] = useState<Cart>(EMPTY_CART);
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pendingLine, setPendingLine] = useState<string | null>(null);
  const sessionRef = useRef<string | null>(null);
  const mergeRef = useRef<Promise<void> | null>(null);
  const cartRef = useRef(cart);

  useEffect(() => {
    cartRef.current = cart;
  }, [cart]);

  const auth = useCallback(() => {
    if (!sessionRef.current) sessionRef.current = getSessionId();
    return { token, sessionId: sessionRef.current };
  }, [token]);

  const refresh = useCallback(async () => {
    try {
      const data = await apiRequest<Cart>("/api/v1/cart", auth());
      setCart(data);
    } catch {
      // Giữ giỏ hiện tại nếu mất kết nối tạm thời
    } finally {
      setReady(true);
    }
  }, [auth]);

  // Tải giỏ khi biết trạng thái đăng nhập và mỗi khi đổi tài khoản; chờ lượt gộp giỏ (nếu có) xong trước
  useEffect(() => {
    if (!authReady) return;
    let active = true;
    (mergeRef.current ?? Promise.resolve())
      .then(() => apiRequest<Cart>("/api/v1/cart", auth()))
      .then((data) => {
        if (active) setCart(data);
      })
      .catch(() => {
        // Giữ giỏ hiện tại nếu mất kết nối tạm thời
      })
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, [authReady, auth]);

  // Gộp giỏ khách vãng lai vào tài khoản ngay sau khi đăng nhập (F06)
  useEffect(() => {
    const onLogin = (e: Event) => {
      const detail = (e as CustomEvent<{ access_token: string }>).detail;
      if (!sessionRef.current) sessionRef.current = getSessionId();
      const merge = apiRequest<Cart>("/api/v1/cart/merge", {
        method: "POST",
        token: detail.access_token,
        body: { session_id: sessionRef.current },
      })
        .then((data) => setCart(data))
        .catch(() => {
          // Không gộp được thì vẫn giữ phiên đăng nhập; giỏ sẽ tải lại theo tài khoản
        })
        .finally(() => {
          if (mergeRef.current === merge) mergeRef.current = null;
        });
      mergeRef.current = merge;
    };
    window.addEventListener("auth:login", onLogin);
    return () => window.removeEventListener("auth:login", onLogin);
  }, []);

  const add = useCallback<CartContextValue["add"]>(
    async (input, options) => {
      const key = `${input.sku}|${input.is_embroidered ? input.embroidery_name ?? "" : ""}`;
      setPendingLine(key);
      try {
        const data = await apiRequest<Cart>("/api/v1/cart/items", {
          method: "POST",
          ...auth(),
          body: {
            product_id: input.product_id,
            sku: input.sku,
            quantity: input.quantity,
            is_embroidered: !!input.is_embroidered,
            embroidery_name: input.is_embroidered ? input.embroidery_name?.trim() : undefined,
          },
        });
        setCart(data);
        if (options?.openDrawer ?? true) setIsOpen(true);
        else notify({ tone: "success", title: "Đã thêm vào giỏ hàng", description: input.productName });
        return true;
      } catch (err) {
        notify({ tone: "error", title: "Chưa thêm được vào giỏ", description: err instanceof ApiError ? err.message : undefined });
        return false;
      } finally {
        setPendingLine(null);
      }
    },
    [auth, notify]
  );

  const updateQuantity = useCallback<CartContextValue["updateQuantity"]>(
    async (item, quantity) => {
      if (quantity < 1) return;
      const previous = cartRef.current;
      const key = lineKey(item);
      setCart(recompute(previous.items.map((it) => (lineKey(it) === key ? { ...it, quantity } : it))));
      setPendingLine(key);
      try {
        const data = await apiRequest<Cart>(lineQuery(item), { method: "PUT", ...auth(), body: { quantity } });
        setCart(data);
      } catch (err) {
        setCart(previous);
        notify({ tone: "error", title: "Không cập nhật được số lượng", description: err instanceof ApiError ? err.message : undefined });
      } finally {
        setPendingLine(null);
      }
    },
    [auth, notify]
  );

  const remove = useCallback<CartContextValue["remove"]>(
    async (item) => {
      const previous = cartRef.current;
      const key = lineKey(item);
      setCart(recompute(previous.items.filter((it) => lineKey(it) !== key)));
      try {
        const data = await apiRequest<Cart>(lineQuery(item), { method: "DELETE", ...auth() });
        setCart(data);
      } catch (err) {
        setCart(previous);
        notify({ tone: "error", title: "Không xóa được sản phẩm", description: err instanceof ApiError ? err.message : undefined });
      }
    },
    [auth, notify]
  );

  const clear = useCallback(async () => {
    setCart(EMPTY_CART);
    try {
      await apiRequest("/api/v1/cart", { method: "DELETE", ...auth() });
    } catch {
      // Giỏ trên máy chủ sẽ được dọn ở lần tải sau
    }
  }, [auth]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({ cart, ready, isOpen, pendingLine, open, close, add, updateQuantity, remove, clear, refresh }),
    [cart, ready, isOpen, pendingLine, open, close, add, updateQuantity, remove, clear, refresh]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart phải nằm trong CartProvider");
  return ctx;
}
