"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  X,
  Lock,
  Phone,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Shield,
  Award
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userData: any) => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successUserData, setSuccessUserData] = useState<any | null>(null);

  if (!isOpen) return null;

  // Điền nhanh tài khoản demo và đăng nhập ngay
  const quickLogin = async (demoPhone: string, demoPass: string) => {
    setPhone(demoPhone);
    setPassword(demoPass);
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: demoPhone, password: demoPass }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || data.message || "Đăng nhập thất bại");
      }

      const tokenData = data.data;
      localStorage.setItem("access_token", tokenData.access_token);
      localStorage.setItem("user_info", JSON.stringify(tokenData));

      // Kích hoạt màn hình thành công đặc biệt
      setSuccessUserData(tokenData);
      onLoginSuccess(tokenData);

    } catch (err: any) {
      setErrorMsg(err.message || "Không thể kết nối đến máy chủ Backend (Port 8000). Vui lòng kiểm tra xem Backend đã chạy chưa.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || data.message || "Đăng nhập thất bại");
      }

      const tokenData = data.data;
      localStorage.setItem("access_token", tokenData.access_token);
      localStorage.setItem("user_info", JSON.stringify(tokenData));

      setSuccessUserData(tokenData);
      onLoginSuccess(tokenData);

    } catch (err: any) {
      setErrorMsg(err.message || "Không thể kết nối đến máy chủ Backend (Port 8000). Vui lòng đảm bảo Backend đã chạy.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          full_name: fullName,
          password,
          email: email || undefined,
          role: "customer",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || data.message || "Đăng ký không thành công");
      }

      const tokenData = data.data;
      localStorage.setItem("access_token", tokenData.access_token);
      localStorage.setItem("user_info", JSON.stringify(tokenData));

      setSuccessUserData(tokenData);
      onLoginSuccess(tokenData);

    } catch (err: any) {
      setErrorMsg(err.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSuccessUserData(null);
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Nút đóng */}
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. MÀN HÌNH CHÚC MỪNG ĐĂNG NHẬP THÀNH CÔNG RỰC RỠ */}
        {successUserData ? (
          <div className="p-7 text-center">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-linear-to-tr from-amber-500 to-red-600 text-white flex items-center justify-center shadow-lg shadow-red-500/30 mb-4 animate-bounce">
              <Sparkles className="w-10 h-10" />
            </div>

            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2">
              🎉 Xác Thực Thành Công!
            </span>

            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Chào mừng, {successUserData.full_name}!
            </h3>

            <p className="text-xs text-slate-500 mt-1">
              Hệ thống đã nhận diện tài khoản của bạn và đồng bộ dữ liệu với <b>MongoDB Atlas Cloud</b>.
            </p>

            {/* Thẻ Định Danh Võ Sinh / Ban Quản Trị */}
            <div className="mt-5 p-4 rounded-2xl bg-slate-900 text-white text-left relative overflow-hidden border border-slate-700 shadow-inner">
              <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-24 h-24 bg-red-600/10 rounded-full blur-xl pointer-events-none"></div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  Thẻ Phân Quyền Hệ Thống
                </span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                  successUserData.role === "admin"
                    ? "bg-red-600 text-white"
                    : successUserData.role === "coach"
                    ? "bg-amber-500 text-slate-950"
                    : successUserData.role === "staff"
                    ? "bg-purple-600 text-white"
                    : "bg-blue-600 text-white"
                }`}>
                  {successUserData.role === "admin" && "👑 Quản Trị Viên (Admin)"}
                  {successUserData.role === "coach" && "🥋 HLV Võ Đường (Coach)"}
                  {successUserData.role === "staff" && "📦 Nhân Viên Vận Hành"}
                  {successUserData.role === "customer" && "👤 Khách Hàng Võ Sinh"}
                </span>
              </div>

              <div className="font-extrabold text-base text-white">
                {successUserData.full_name}
              </div>
              <div className="text-xs text-slate-300 font-mono mt-0.5">
                Mã định danh: {successUserData.user_id}
              </div>

              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-emerald-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Token JWT đã kích hoạt
                </span>
                <span className="text-slate-400">Bảo mật OWASP</span>
              </div>
            </div>

            {/* Các Nút Hành Động Đặc Biệt Theo Vai Trò */}
            <div className="mt-6 space-y-2.5">
              {(successUserData.role === "admin" || successUserData.role === "staff") && (
                <Link
                  href="/admin"
                  onClick={handleCloseModal}
                  className="w-full py-3.5 px-4 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-extrabold rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer text-sm"
                >
                  <span>🚀 VÀO TRANG QUẢN TRỊ ADMIN (F16 – F23)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}

              {successUserData.role === "coach" && (
                <button
                  type="button"
                  onClick={() => {
                    handleCloseModal();
                    document.getElementById("dojo-b2b-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full py-3.5 px-4 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer text-sm"
                >
                  <span>🥋 CỔNG ĐẶT ĐỒNG PHỤC VÕ ĐƯỜNG (B2B)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={handleCloseModal}
                className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Tiếp Tục Xem Cửa Hàng & Mua Sắm Võ Phục
              </button>
            </div>
          </div>
        ) : (
          /* 2. FORM ĐĂNG NHẬP / ĐĂNG KÝ VỚI 4 NÚT 1-CLICK */
          <>
            {/* Header Tabs */}
            <div className="bg-slate-900 text-white p-6 pt-7 text-center relative">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-600/20 text-red-500 mb-3 border border-red-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold tracking-tight">Tài Khoản Đai Trắng</h2>
              <p className="text-slate-400 text-xs mt-1">Hệ sinh thái Võ phục & Dụng cụ Võ thuật B2C & B2B</p>

              <div className="grid grid-cols-2 bg-slate-800 p-1 rounded-xl mt-5 border border-slate-700/60">
                <button
                  onClick={() => { setTab("login"); setErrorMsg(null); }}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    tab === "login" ? "bg-red-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => { setTab("register"); setErrorMsg(null); }}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    tab === "register" ? "bg-red-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Đăng ký mới
                </button>
              </div>
            </div>

            {/* Body Form */}
            <div className="p-6">
              {errorMsg && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {tab === "login" ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Số điện thoại đăng nhập
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="0988000001"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-hidden transition-all text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mật khẩu
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-hidden transition-all text-slate-800"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Đang xác thực bảo mật...</span>
                      </>
                    ) : (
                      "Đăng Nhập"
                    )}
                  </button>

                  {/* 4 Nút Bấm Nhanh 1-Click Demo */}
                  <div className="pt-3 border-t border-slate-100">
                    <span className="block text-[11px] text-slate-500 text-center mb-2 font-medium">
                      ⚡ Đăng nhập nhanh 1-Click tài khoản Demo:
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => quickLogin("0988000001", "AdminPass123")}
                        disabled={loading}
                        className="py-2.5 px-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl font-bold text-center transition-all cursor-pointer shadow-2xs hover:scale-102 flex items-center justify-center gap-1.5"
                      >
                        👑 <span>Admin Quản trị</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => quickLogin("0988000002", "StaffPass123")}
                        disabled={loading}
                        className="py-2.5 px-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl font-bold text-center transition-all cursor-pointer shadow-2xs hover:scale-102 flex items-center justify-center gap-1.5"
                      >
                        📦 <span>Nhân viên Staff</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => quickLogin("0988000003", "CoachPass123")}
                        disabled={loading}
                        className="py-2.5 px-2 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-xl font-bold text-center transition-all cursor-pointer shadow-2xs hover:scale-102 flex items-center justify-center gap-1.5"
                      >
                        🥋 <span>HLV Võ Đường</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => quickLogin("0988000004", "UserPass123")}
                        disabled={loading}
                        className="py-2.5 px-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl font-bold text-center transition-all cursor-pointer shadow-2xs hover:scale-102 flex items-center justify-center gap-1.5"
                      >
                        👤 <span>Khách Mua Hàng</span>
                      </button>
                    </div>

                    <div className="mt-3 p-2 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-500 space-y-0.5">
                      <div className="font-semibold text-slate-600 text-center mb-0.5">📋 Tài khoản & Mật khẩu mẫu:</div>
                      <div className="flex justify-between"><span>• Admin: <b>0988000001</b></span><span>MK: <b>AdminPass123</b></span></div>
                      <div className="flex justify-between"><span>• Staff: <b>0988000002</b></span><span>MK: <b>StaffPass123</b></span></div>
                      <div className="flex justify-between"><span>• HLV: <b>0988000003</b></span><span>MK: <b>CoachPass123</b></span></div>
                      <div className="flex justify-between"><span>• Khách: <b>0988000004</b></span><span>MK: <b>UserPass123</b></span></div>
                    </div>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Họ và tên võ sinh / phụ huynh
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-red-600 outline-hidden text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Số điện thoại đăng ký
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="0912345678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-red-600 outline-hidden text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email (tùy chọn)
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-red-600 outline-hidden text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mật khẩu (tối thiểu 8 ký tự - Mục 9)
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        minLength={8}
                        placeholder="Tối thiểu 8 ký tự"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-10 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-red-600 outline-hidden text-slate-800"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer text-sm disabled:opacity-50 mt-2"
                  >
                    {loading ? "Đang xử lý..." : "Tạo Tài Khoản"}
                  </button>
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
