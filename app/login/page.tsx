"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Phone, User, Eye, EyeOff, ShieldCheck, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { getApiUrl } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Đăng nhập nhanh 1-Click tài khoản demo
  const quickLogin = async (demoPhone: string, demoPass: string) => {
    setPhone(demoPhone);
    setPassword(demoPass);
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const res = await fetch(getApiUrl("/api/v1/auth/login"), {
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

      const isStaffOrAdmin = tokenData.role === "admin" || tokenData.role === "staff";
      const targetUrl = isStaffOrAdmin ? "/admin" : "/";
      const roleTitle = tokenData.role === "admin" ? "ADMIN QUẢN TRỊ" : tokenData.role === "staff" ? "NHÂN VIÊN" : tokenData.role === "coach" ? "HUẤN LUYỆN VIÊN" : "KHÁCH HÀNG";

      setSuccessMsg(`Đăng nhập thành công [${roleTitle} - ${tokenData.full_name}]! Đang chuyển đến ${isStaffOrAdmin ? "Trang Quản Trị (/admin)" : "Trang Chủ"}...`);

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 100);
    } catch (err: any) {
      setErrorMsg(err.message || "Không thể kết nối đến máy chủ Backend API. Vui lòng kiểm tra kết nối.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const res = await fetch(getApiUrl("/api/v1/auth/login"), {
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

      const isStaffOrAdmin = tokenData.role === "admin" || tokenData.role === "staff";
      const targetUrl = isStaffOrAdmin ? "/admin" : "/";
      const roleTitle = tokenData.role === "admin" ? "ADMIN QUẢN TRỊ" : tokenData.role === "staff" ? "NHÂN VIÊN" : tokenData.role === "coach" ? "HUẤN LUYỆN VIÊN" : "KHÁCH HÀNG";

      setSuccessMsg(`Chào mừng ${tokenData.full_name} (${roleTitle})! Đang chuyển đến ${isStaffOrAdmin ? "Trang Quản Trị (/admin)" : "Trang Chủ"}...`);

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 100);
    } catch (err: any) {
      setErrorMsg(err.message || "Không thể kết nối đến máy chủ Backend API. Vui lòng kiểm tra kết nối.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const res = await fetch(getApiUrl("/api/v1/auth/register"), {
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

      setSuccessMsg("Đăng ký tài khoản thành công! Đang tự động đăng nhập...");
      const tokenData = data.data;
      localStorage.setItem("access_token", tokenData.access_token);
      localStorage.setItem("user_info", JSON.stringify(tokenData));

      setTimeout(() => {
        router.push("/");
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4 selection:bg-red-600 selection:text-white">
      {/* Nút quay lại trang chủ */}
      <div className="w-full max-w-md mb-4 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-red-600 transition-colors bg-white px-3 py-1.5 rounded-lg shadow-2xs border border-slate-200"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại cửa hàng
        </Link>
        <span className="text-xs text-slate-400 font-medium">Hệ thống Đai Trắng (B2C & B2B)</span>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 pt-7 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-600/20 text-red-500 mb-3 border border-red-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Đăng Nhập / Đăng Ký Tài Khoản</h1>
          <p className="text-slate-400 text-xs mt-1">Nền tảng TMĐT Võ phục & Dụng cụ Võ thuật Đai Trắng</p>

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

        {/* Body */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
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
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer text-sm disabled:opacity-50"
              >
                {loading ? "Đang xác thực..." : "Đăng Nhập"}
              </button>

              {/* 4 nút 1-click đăng nhập demo */}
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

                <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-500 space-y-1">
                  <div className="font-semibold text-slate-600 text-center mb-1">📋 Hoặc tự nhập số điện thoại & mật khẩu:</div>
                  <div className="flex justify-between"><span>• Admin: <b>0988000001</b></span><span>MK: <b>AdminPass123</b></span></div>
                  <div className="flex justify-between"><span>• Nhân viên: <b>0988000002</b></span><span>MK: <b>StaffPass123</b></span></div>
                  <div className="flex justify-between"><span>• HLV: <b>0988000003</b></span><span>MK: <b>CoachPass123</b></span></div>
                  <div className="flex justify-between"><span>• Khách hàng: <b>0988000004</b></span><span>MK: <b>UserPass123</b></span></div>
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
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
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
      </div>
    </div>
  );
}
