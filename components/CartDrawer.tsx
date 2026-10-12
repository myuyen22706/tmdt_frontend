"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  QrCode,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export interface CartItemType {
  id: string;
  productId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  isEmbroidered?: boolean;
  embroideredName?: string;
  embroideryFee?: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemType[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("VietQR");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + (item.price + (item.embroideryFee || 0)) * item.quantity,
    0
  );
  const freeShipThreshold = 500000;
  const isFreeShip = subtotal >= freeShipThreshold || subtotal === 0;
  const shippingFee = isFreeShip ? 0 : 30000;
  const grandTotal = subtotal + shippingFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSuccess(true);
    setTimeout(() => {
      onClearCart();
      setIsCheckingOut(false);
      setOrderSuccess(false);
      onClose();
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200">
          
          {/* HEADER GIỎ HÀNG */}
          <div className="p-5 bg-gradient-to-r from-[#002f5e] to-blue-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-yellow-400 text-slate-950 flex items-center justify-center font-black">
                <ShoppingBag className="w-4 h-4 text-red-700" />
              </div>
              <div>
                <h3 className="text-base font-black uppercase tracking-tight text-white">
                  Giỏ Hàng Của Bạn
                </h3>
                <span className="text-[11px] text-blue-200">
                  {items.length} sản phẩm võ phục
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* NỘI DUNG SẢN PHẨM HOẶC FORM CHECKOUT */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            
            {/* Thanh tiến độ Freeship */}
            <div className="bg-blue-50 p-3.5 rounded-2xl border border-blue-200 text-xs">
              {isFreeShip && subtotal > 0 ? (
                <div className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Chúc mừng! Bạn đã đủ điều kiện FREESHIP toàn quốc!</span>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between text-slate-700 font-medium mb-1.5">
                    <span>Mua thêm {(freeShipThreshold - subtotal).toLocaleString("vi-VN")}₫ để được</span>
                    <strong className="text-red-600 uppercase font-black">Freeship</strong>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-yellow-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (subtotal / freeShipThreshold) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* DANH SÁCH SẢN PHẨM */}
            {!isCheckingOut ? (
              items.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-bold text-slate-600">Giỏ hàng đang trống</p>
                  <button
                    onClick={onClose}
                    className="text-xs font-bold text-blue-700 hover:underline"
                  >
                    Tiếp tục mua sắm ngay →
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 items-center justify-between"
                    >
                      {/* Ảnh mẫu mau_1.jpg */}
                      <div className="w-16 h-16 bg-white rounded-xl p-1 border border-slate-200 flex-shrink-0">
                        <Image
                          src="/mau_1.jpg"
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Chi tiết */}
                      <div className="flex-1 min-w-0 text-xs space-y-1">
                        <h4 className="font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <span className="font-black text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded">
                            {item.size}
                          </span>
                          {item.isEmbroidered && (
                            <span className="text-amber-800 bg-yellow-100 px-1 rounded">
                              Thêu: {item.embroideredName || "Theo yêu cầu"}
                            </span>
                          )}
                        </div>
                        <div className="font-black text-red-600 text-sm">
                          {(item.price + (item.embroideryFee || 0)).toLocaleString("vi-VN")}₫
                        </div>
                      </div>

                      {/* Tăng giảm số lượng */}
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-red-600 transition-colors"
                          title="Xóa sản phẩm"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-2 py-0.5 text-slate-600 hover:bg-slate-100"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-bold text-xs">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-2 py-0.5 text-slate-600 hover:bg-slate-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )
            ) : orderSuccess ? (
              /* THÔNG BÁO ĐẶT HÀNG THÀNH CÔNG */
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-black text-slate-900">
                  Đặt Hàng Thành Công!
                </h4>
                <p className="text-xs text-slate-600">
                  Cảm ơn bạn <strong>{customerName}</strong>. Mã đơn hàng đã được gửi về SĐT <strong>{customerPhone}</strong>.
                </p>
                {paymentMethod === "VietQR" && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                    <span className="font-bold text-blue-900 block flex items-center justify-center gap-1">
                      <QrCode className="w-4 h-4 text-blue-600" /> Quét mã VietQR thanh toán nhanh:
                    </span>
                    <div className="w-40 h-40 bg-white border rounded-xl mx-auto flex items-center justify-center shadow-inner">
                      <img
                        src={`https://img.vietqr.io/image/970422-0987654321-compact2.png?amount=${grandTotal}&addInfo=VO${Date.now().toString().slice(-4)}`}
                        alt="Mã QR Thanh Toán"
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 block">
                      Tự động xác nhận giao hàng sau khi chuyển khoản
                    </span>
                  </div>
                )}
              </div>
            ) : (
              /* FORM ĐIỀN ĐỊA CHỈ & THANH TOÁN (GUEST CHECKOUT) */
              <form onSubmit={handleCheckoutSubmit} className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="font-bold text-slate-800 uppercase">Thông tin giao hàng:</span>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-blue-600 hover:underline"
                  >
                    ← Quay lại giỏ
                  </button>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Họ tên người nhận:</label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Số điện thoại nhận hàng:</label>
                  <input
                    type="tel"
                    required
                    placeholder="0987654321"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Địa chỉ giao hàng chi tiết:</label>
                  <input
                    type="text"
                    required
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                {/* Phương thức thanh toán */}
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Phương thức thanh toán:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("VietQR")}
                      className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                        paymentMethod === "VietQR"
                          ? "border-blue-600 bg-blue-50 text-blue-800 shadow-xs"
                          : "border-slate-200 text-slate-600"
                      }`}
                    >
                      Mã VietQR (Nhanh)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("COD")}
                      className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                        paymentMethod === "COD"
                          ? "border-blue-600 bg-blue-50 text-blue-800 shadow-xs"
                          : "border-slate-200 text-slate-600"
                      }`}
                    >
                      COD (Nhận hàng trả tiền)
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl text-[11px] text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                  <span>Cam kết đổi size miễn phí 1 lần trong 7 ngày nếu không vừa!</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase rounded-xl tracking-wider shadow-lg transition-transform hover:scale-102"
                >
                  Xác nhận đặt đơn ({grandTotal.toLocaleString("vi-VN")}₫)
                </button>
              </form>
            )}

          </div>

          {/* FOOTER TỔNG TIỀN & NÚT TIẾP TỤC */}
          {!isCheckingOut && items.length > 0 && (
            <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span className="font-bold text-slate-900">{subtotal.toLocaleString("vi-VN")}₫</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển:</span>
                  <span className="font-bold text-slate-900">
                    {shippingFee === 0 ? <strong className="text-emerald-600 uppercase">Miễn phí</strong> : `${shippingFee.toLocaleString("vi-VN")}₫`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-1 border-t border-slate-200">
                  <span>Tổng thanh toán:</span>
                  <span className="text-red-600 text-lg font-black">{grandTotal.toLocaleString("vi-VN")}₫</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-102"
              >
                <span>Tiến hành đặt hàng</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
