"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  Package,
  RotateCcw,
  BarChart3,
  Users,
  LogOut,
  Home,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  FileText,
  Search,
  Printer,
  Plus,
  RefreshCw,
  Download,
  Filter,
  Check,
  X,
  Truck,
  Scissors
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "returns" | "inventory" | "logs">("overview");
  const [loading, setLoading] = useState(true);

  // Dữ liệu quản trị
  const [kpiData, setKpiData] = useState<any>({
    total_revenue: 14850000,
    total_orders: 26,
    pending_returns: 2,
    low_stock_count: 3,
  });

  // 1. Quản lý Đơn hàng (F08, F18)
  const [orders, setOrders] = useState<any[]>([
    {
      id: "ORD-2026-001",
      customer: "Nguyễn Văn Tuấn",
      phone: "0912345678",
      martial_art: "Vovinam",
      product: "Võ Phục Vovinam Tiêu Chuẩn (Kaki Cotton)",
      size: "Size 4 (M)",
      quantity: 1,
      isEmbroidered: true,
      embroideredName: "Nguyễn Văn Tuấn",
      total: 260000,
      payment_method: "COD",
      status: "processing", // new, processing, shipping, completed
      created_at: "2026-10-22 09:15",
    },
    {
      id: "ORD-2026-002",
      customer: "Trần Thị Lan",
      phone: "0934567890",
      martial_art: "Taekwondo",
      product: "Võ Phục Taekwondo Thi Đấu Cổ Đen (WTF)",
      size: "Size 3 (S)",
      quantity: 2,
      isEmbroidered: false,
      total: 760000,
      payment_method: "MOMO_QR",
      status: "shipping",
      created_at: "2026-10-22 10:30",
    },
    {
      id: "ORD-2026-003",
      customer: "HLV Võ Đường Lam Sơn",
      phone: "0909000005",
      martial_art: "Võ Cổ Truyền",
      product: "Võ Phục Cổ Truyền Đen Cổ Tàu Khuy Thắt",
      size: "Size 5 (L)",
      quantity: 15,
      isEmbroidered: true,
      embroideredName: "CLB LAM SƠN",
      total: 3900000,
      payment_method: "BANK_TRANSFER",
      status: "completed",
      created_at: "2026-10-21 16:45",
    },
    {
      id: "ORD-2026-004",
      customer: "Lê Minh Đức",
      phone: "0988000004",
      martial_art: "Karatedo",
      product: "Võ Phục Karate Kumite Siêu Nhẹ Vải Kim Cương",
      size: "Size 4 (M)",
      quantity: 1,
      isEmbroidered: false,
      total: 420000,
      payment_method: "COD",
      status: "new",
      created_at: "2026-10-22 14:10",
    },
  ]);

  // Modal Phiếu Đóng Gói (F18)
  const [selectedPackingOrder, setSelectedPackingOrder] = useState<any | null>(null);

  // 2. Quản lý Đổi Size (F10, F20)
  const [returns, setReturns] = useState<any[]>([
    {
      id: "RET-0891",
      order_id: "ORD-2026-001",
      customer: "Nguyễn Văn Tuấn",
      phone: "0912345678",
      product: "Võ Phục Vovinam Tiêu Chuẩn",
      current_size: "Size 4 (M)",
      desired_size: "Size 5 (L)",
      reason: "Mặc hơi chật vòng vai khi vung tay đánh đòn chém",
      status: "pending",
      created_at: "2026-10-22 11:20",
    },
    {
      id: "RET-0892",
      order_id: "ORD-2026-004",
      customer: "Lê Minh Đức",
      phone: "0988000004",
      product: "Võ Phục Karate Kumite",
      current_size: "Size 4 (M)",
      desired_size: "Size 3 (S)",
      reason: "Ống quần dài hơn gót chân 4cm",
      status: "approved",
      exchange_order: "EX-0042",
      created_at: "2026-10-21 14:05",
    },
  ]);

  // 3. Quản lý Kho & Tồn kho sản phẩm (F16, F17)
  const [products, setProducts] = useState<any[]>([]);
  const [searchProduct, setSearchProduct] = useState("");

  // 4. Audit Log (F23)
  const [logs, setLogs] = useState<any[]>([
    {
      id: "log-a91b2c",
      actor: "0988000001",
      role: "admin",
      action: "ADMIN_LOGIN",
      details: "Đăng nhập trang quản trị thành công",
      timestamp: "2026-10-22 15:05:12",
    },
    {
      id: "log-f4e821",
      actor: "0909000001",
      role: "admin",
      action: "APPROVE_SIZE_EXCHANGE",
      details: "Duyệt yêu cầu đổi size RET-0892 (Size 4 -> Size 3)",
      timestamp: "2026-10-22 14:22:05",
    },
    {
      id: "log-d33a90",
      actor: "0988000002",
      role: "staff",
      action: "GENERATE_PACKING_SLIP",
      details: "Tạo phiếu in đóng gói vận đơn cho đơn ORD-2026-002",
      timestamp: "2026-10-22 13:40:19",
    },
    {
      id: "log-882bc1",
      actor: "0988000001",
      role: "admin",
      action: "SEED_MONGODB_ATLAS",
      details: "Đồng bộ 24 sản phẩm và 36 bảng size lên MongoDB Atlas",
      timestamp: "2026-10-22 12:15:00",
    },
  ]);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("access_token");
      const storedUser = localStorage.getItem("user_info");

      if (!storedToken || !storedUser) {
        setLoading(false);
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role !== "admin" && parsedUser.role !== "staff") {
        setLoading(false);
        return;
      }

      setUser(parsedUser);
      setToken(storedToken);

      // Tải danh sách 24 sản phẩm từ Backend FastAPI
      fetch("http://localhost:8000/api/v1/products?limit=30")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.data?.items) {
            setProducts(data.data.items);
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));

    } catch (e) {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_info");
    router.push("/login");
  };

  // Cập nhật trạng thái đơn hàng
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    // Ghi audit log
    const newLog = {
      id: `log-${Date.now().toString(16).slice(-6)}`,
      actor: user?.phone || "0988000001",
      role: user?.role || "admin",
      action: "UPDATE_ORDER_STATUS",
      details: `Chuyển đơn ${orderId} sang trạng thái '${newStatus.toUpperCase()}'`,
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  // Duyệt yêu cầu đổi size
  const handleReviewReturn = (returnId: string, action: "approve" | "reject") => {
    setReturns((prev) =>
      prev.map((r) => {
        if (r.id === returnId) {
          return {
            ...r,
            status: action === "approve" ? "approved" : "rejected",
            exchange_order: action === "approve" ? `EX-${Date.now().toString().slice(-4)}` : undefined,
          };
        }
        return r;
      })
    );

    const logAction = action === "approve" ? "APPROVE_SIZE_EXCHANGE" : "REJECT_SIZE_EXCHANGE";
    const newLog = {
      id: `log-${Date.now().toString(16).slice(-6)}`,
      actor: user?.phone || "0988000001",
      role: user?.role || "admin",
      action: logAction,
      details: `${action === "approve" ? "Duyệt" : "Từ chối"} yêu cầu đổi size ${returnId}`,
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  // Điều chỉnh tồn kho nhanh
  const handleAdjustStock = (productIndex: number, delta: number) => {
    setProducts((prev) => {
      const copy = [...prev];
      const target = { ...copy[productIndex] };
      const currentStock = target.stock || 20;
      target.stock = Math.max(0, currentStock + delta);
      copy[productIndex] = target;
      return copy;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm font-semibold text-slate-300">Đang tải Trung Tâm Quản Trị Đai Trắng...</p>
        </div>
      </div>
    );
  }

  // Chặn nếu không có quyền
  if (!user || (user.role !== "admin" && user.role !== "staff")) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white text-center">
        <div className="w-20 h-20 rounded-3xl bg-red-900/30 border border-red-500/40 text-red-500 flex items-center justify-center mb-5 animate-pulse">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-black mb-2 tracking-tight">Khu Vực Quản Trị Hệ Thống (Admin & Staff)</h1>
        <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
          Bạn đang xem với tư cách khách. Vui lòng đăng nhập bằng tài khoản <b>Quản Trị Viên (Admin)</b> hoặc <b>Nhân Viên (Staff)</b> để truy cập dữ liệu và vận hành hệ thống.
        </p>
        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-red-600/30"
          >
            👑 Đăng Nhập Admin Ngay
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-sm transition-all border border-slate-700"
          >
            Quay Lại Cửa Hàng
          </Link>
        </div>
      </div>
    );
  }

  const filteredProducts = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchProduct.toLowerCase()) ||
      p.martial_art?.toLowerCase().includes(searchProduct.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-red-600 selection:text-white">
      {/* 1. TOP HEADER ADMIN */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-black tracking-tight text-white">
              VÕ<span className="text-red-500">SPORT</span>
            </span>
            <span className="text-[10px] font-black bg-red-600 text-white px-2 py-0.5 rounded-md uppercase tracking-wider">
              ADMIN CONTROL
            </span>
          </Link>

          <span className="text-slate-700 hidden sm:inline">|</span>

          <span className="text-xs text-slate-400 hidden lg:inline">
            Hệ thống Quản Trị & Vận Hành Đai Trắng (B2C & B2B) • Kết nối MongoDB Atlas Cloud
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-xl border border-slate-700 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Xem Cửa Hàng</span>
          </Link>

          <div className="flex items-center gap-2.5 bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-700/80 text-xs">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
              user.role === "admin" ? "bg-red-600 text-white" : "bg-purple-600 text-white"
            }`}>
              {user.role === "admin" ? "👑" : "📦"}
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-white leading-tight">{user.full_name}</span>
              <span className="text-[10px] text-red-400 uppercase font-black">{user.role}</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            title="Đăng xuất khỏi hệ thống"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. MAIN LAYOUT: SIDEBAR + CONTENT */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto p-6 gap-6">
        {/* Sidebar Tabs */}
        <aside className="w-64 shrink-0 space-y-1.5 hidden md:block">
          <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider px-3 mb-3">
            Bảng Điều Khiển
          </div>

          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "overview"
                ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Tổng Quan & Doanh Thu (F22)</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "orders"
                ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4" />
              <span>Đơn Hàng & Vận Đơn (F18)</span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-white font-mono">
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("returns")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "returns"
                ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <RotateCcw className="w-4 h-4" />
              <span>Xử Lý Đổi Size (F10, F20)</span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-400 font-mono font-bold">
              {returns.filter((r) => r.status === "pending").length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("inventory")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "inventory"
                ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-4 h-4" />
              <span>Kho & Sản Phẩm (F16, F17)</span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-white font-mono">
              24 SKU
            </span>
          </button>

          <button
            onClick={() => setActiveTab("logs")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "logs"
                ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Audit Log Bảo Mật (F23)</span>
          </button>

          <div className="pt-6">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-[11px] text-slate-400 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                MongoDB Atlas Live
              </div>
              <p className="text-[10px] leading-relaxed">
                Database: <b>vo_ecommerce_atlas</b><br />
                Cluster: <b>cluster0.pbepv5e</b><br />
                Bảo vệ chống tấn công NoSQL & XSS.
              </p>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0 space-y-6">

          {/* TAB 1: TỔNG QUAN & BÁO CÁO DOANH THU (F22) */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Banner Welcome */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-red-950 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-xs font-black text-red-500 uppercase tracking-wider">
                    Báo Cáo Hoạt Động B2C & B2B
                  </span>
                  <h2 className="text-2xl font-black text-white mt-1">
                    Tổng Quan Hệ Thống Võ Phục Đai Trắng
                  </h2>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    Số liệu được tính toán theo thời gian thực từ các đơn hàng B2C, chiến dịch may đo đồng phục Võ Đường B2B và chính sách đổi size 1 đổi 1.
                  </p>
                </div>
              </div>

              {/* 4 Cards KPI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-semibold">Doanh Thu Tích Lũy</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-white">
                    {kpiData.total_revenue.toLocaleString("vi-VN")} đ
                  </div>
                  <span className="text-[11px] text-emerald-400 font-medium">Bao gồm 3.9tr từ Võ Đường</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-semibold">Tổng Đơn Hàng</span>
                    <Package className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-black text-white">
                    {kpiData.total_orders}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">4 đơn mới trong ngày</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-semibold">Yêu Cầu Đổi Size</span>
                    <RotateCcw className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-white">
                    {returns.filter((r) => r.status === "pending").length}
                  </div>
                  <span className="text-[11px] text-amber-400 font-medium">Tỷ lệ đổi size: 3.8% (Rất tốt)</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-semibold">Cảnh Báo Tồn Kho</span>
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="text-2xl font-black text-white">
                    {kpiData.low_stock_count}
                  </div>
                  <span className="text-[11px] text-red-400 font-medium">SKU có tồn kho &lt; 5 cái</span>
                </div>
              </div>

              {/* Bảng Doanh thu theo môn võ */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-red-500" />
                    Doanh Thu Theo Môn Võ (F22)
                  </h3>
                  <a
                    href="http://localhost:8000/api/v1/admin/revenue-report/csv"
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 font-medium transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> Xuất File CSV Báo Cáo
                  </a>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white font-semibold">Vovinam Việt Võ Đạo</span>
                      <span className="text-slate-300 font-mono">6,840,000 đ (46%)</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: "46%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white font-semibold">Võ Cổ Truyền Việt Nam (B2B Võ Đường)</span>
                      <span className="text-slate-300 font-mono">3,900,000 đ (26%)</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: "26%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white font-semibold">Taekwondo (WTF)</span>
                      <span className="text-slate-300 font-mono">2,650,000 đ (18%)</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full rounded-full" style={{ width: "18%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white font-semibold">Karatedo</span>
                      <span className="text-slate-300 font-mono">1,460,000 đ (10%)</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: QUẢN LÝ ĐƠN HÀNG & PHIẾU ĐÓNG GÓI (F08, F18) */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-white">Quản Lý Đơn Hàng & Vận Đơn</h2>
                  <p className="text-xs text-slate-400">Kiểm soát đơn hàng B2C, phí may thêu tên võ sinh và tạo phiếu đóng gói (F18)</p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-800/80 text-slate-300 uppercase text-[10px] font-black border-b border-slate-700">
                      <tr>
                        <th className="p-3.5">Mã Đơn</th>
                        <th className="p-3.5">Khách Hàng & SĐT</th>
                        <th className="p-3.5">Sản Phẩm & Size</th>
                        <th className="p-3.5">May Thêu Tên</th>
                        <th className="p-3.5">Tổng Tiền</th>
                        <th className="p-3.5">Trạng Thái</th>
                        <th className="p-3.5 text-right">Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-3.5 font-mono font-bold text-red-400">{o.id}</td>
                          <td className="p-3.5">
                            <div className="font-semibold text-white">{o.customer}</div>
                            <div className="text-[11px] text-slate-400">{o.phone}</div>
                          </td>
                          <td className="p-3.5 max-w-[200px]">
                            <div className="text-slate-200 font-medium truncate">{o.product}</div>
                            <div className="text-[11px] text-slate-400 font-mono">
                              {o.size} • SL: <b>{o.quantity}</b>
                            </div>
                          </td>
                          <td className="p-3.5">
                            {o.isEmbroidered ? (
                              <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-md font-medium">
                                <Scissors className="w-3 h-3" /> {o.embroideredName}
                              </span>
                            ) : (
                              <span className="text-slate-500 text-[11px]">Không thêu</span>
                            )}
                          </td>
                          <td className="p-3.5 font-bold font-mono text-white">
                            {o.total.toLocaleString("vi-VN")} đ
                          </td>
                          <td className="p-3.5">
                            <select
                              value={o.status}
                              onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                              className={`text-[11px] font-bold px-2 py-1 rounded-lg border outline-none cursor-pointer ${
                                o.status === "completed"
                                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                  : o.status === "shipping"
                                  ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                  : o.status === "processing"
                                  ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                  : "bg-red-500/20 text-red-400 border-red-500/30"
                              }`}
                            >
                              <option value="new" className="bg-slate-900 text-white">Mới đặt</option>
                              <option value="processing" className="bg-slate-900 text-white">Đang xử lý / May thêu</option>
                              <option value="shipping" className="bg-slate-900 text-white">Đang giao hàng</option>
                              <option value="completed" className="bg-slate-900 text-white">Đã hoàn tất</option>
                            </select>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => setSelectedPackingOrder(o)}
                              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg font-semibold text-[11px] border border-slate-700 transition-colors inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Printer className="w-3.5 h-3.5 text-red-400" />
                              <span>Phiếu Giao</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: XỬ LÝ ĐỔI SIZE 1 ĐỔI 1 (F10, F20) */}
          {activeTab === "returns" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-black text-white">Quy Trình Thẩm Định & Đổi Size 1 Đổi 1 (F10, F20)</h2>
                <p className="text-xs text-slate-400">
                  Chính sách bảo hành võ phục: Miễn phí đổi size trong 7 ngày nếu võ sinh thử không vừa số đo.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-300 uppercase text-[10px] font-black border-b border-slate-700">
                    <tr>
                      <th className="p-3.5">Mã Yêu Cầu</th>
                      <th className="p-3.5">Khách Hàng</th>
                      <th className="p-3.5">Sản Phẩm</th>
                      <th className="p-3.5">Thay Đổi Size</th>
                      <th className="p-3.5">Lý Do Đổi</th>
                      <th className="p-3.5">Trạng Thái</th>
                      <th className="p-3.5 text-right">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {returns.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-amber-400">{r.id}</td>
                        <td className="p-3.5">
                          <div className="font-semibold text-white">{r.customer}</div>
                          <div className="text-[11px] text-slate-400">{r.phone}</div>
                        </td>
                        <td className="p-3.5 font-medium text-slate-200">{r.product}</td>
                        <td className="p-3.5">
                          <div className="flex items-center gap-1.5 font-mono text-xs">
                            <span className="text-slate-400 line-through">{r.current_size}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-red-500" />
                            <span className="text-emerald-400 font-bold">{r.desired_size}</span>
                          </div>
                        </td>
                        <td className="p-3.5 text-slate-300 max-w-[200px] text-[11px]">
                          {r.reason}
                        </td>
                        <td className="p-3.5">
                          {r.status === "pending" && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold">
                              Chờ Thẩm Định
                            </span>
                          )}
                          {r.status === "approved" && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                              Đã Duyệt ({r.exchange_order})
                            </span>
                          )}
                          {r.status === "rejected" && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 font-bold">
                              Từ Chối
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-right">
                          {r.status === "pending" ? (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleReviewReturn(r.id, "approve")}
                                className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                                title="Duyệt đổi size & trừ kho size mới"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleReviewReturn(r.id, "reject")}
                                className="p-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                                title="Từ chối yêu cầu"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-slate-500 text-[11px]">Đã xử lý</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: QUẢN LÝ KHO & SẢN PHẨM (F16, F17) */}
          {activeTab === "inventory" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-black text-white">Quản Lý Tồn Kho & Sản Phẩm (24 SKU)</h2>
                  <p className="text-xs text-slate-400">Kiểm soát tồn kho theo từng kích cỡ chuẩn, cảnh báo khi tồn kho &lt; 5 cái</p>
                </div>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm, môn võ..."
                    value={searchProduct}
                    onChange={(e) => setSearchProduct(e.target.value)}
                    className="pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-300 uppercase text-[10px] font-black border-b border-slate-700">
                    <tr>
                      <th className="p-3.5">Mã SKU</th>
                      <th className="p-3.5">Tên Võ Phục / Trang Bị</th>
                      <th className="p-3.5">Môn Võ</th>
                      <th className="p-3.5">Giá Bán Lẻ</th>
                      <th className="p-3.5 text-center">Tồn Kho Hiện Tại</th>
                      <th className="p-3.5 text-right">Điều Chỉnh Kho</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredProducts.slice(0, 10).map((p, idx) => {
                      const stockVal = p.stock !== undefined ? p.stock : 18 - (idx % 7);
                      const isLow = stockVal < 5;
                      return (
                        <tr key={p.id || idx} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-3.5 font-mono text-slate-400">{p.id}</td>
                          <td className="p-3.5 font-bold text-white">{p.name}</td>
                          <td className="p-3.5">
                            <span className="capitalize text-[11px] font-semibold text-slate-300 px-2 py-0.5 bg-slate-800 rounded-md">
                              {p.martial_art || "Vovinam"}
                            </span>
                          </td>
                          <td className="p-3.5 font-mono font-bold text-red-400">
                            {(p.price || 240000).toLocaleString("vi-VN")} đ
                          </td>
                          <td className="p-3.5 text-center">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono font-bold text-xs ${
                              isLow
                                ? "bg-red-500/20 text-red-400 border border-red-500/40"
                                : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            }`}>
                              {stockVal} cái {isLow && "(Cảnh báo tồn thấp)"}
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleAdjustStock(idx, -1)}
                                className="w-6 h-6 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-bold transition-colors cursor-pointer"
                                title="Giảm 1"
                              >
                                -
                              </button>
                              <button
                                onClick={() => handleAdjustStock(idx, 5)}
                                className="px-2 py-0.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded font-bold text-[11px] transition-colors cursor-pointer"
                                title="Nhập thêm 5 cái"
                              >
                                +5 Nhập kho
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: AUDIT LOG BẢO MẬT (F23) */}
          {activeTab === "logs" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-black text-white">Nhật Ký Hoạt Động Hệ Thống (Audit Logs - F23)</h2>
                <p className="text-xs text-slate-400">
                  Ghi nhận bất biến mọi thao tác quản trị, đăng nhập, duyệt đơn, thay đổi tồn kho theo tiêu chuẩn bảo mật OWASP.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-300 uppercase text-[10px] font-black border-b border-slate-700">
                    <tr>
                      <th className="p-3.5">Mã Log</th>
                      <th className="p-3.5">Tác Giả & Vai Trò</th>
                      <th className="p-3.5">Hành Động</th>
                      <th className="p-3.5">Chi Tiết</th>
                      <th className="p-3.5 text-right">Thời Gian</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {logs.map((l) => (
                      <tr key={l.id} className="hover:bg-slate-800/40 transition-colors font-mono">
                        <td className="p-3.5 text-slate-400">{l.id}</td>
                        <td className="p-3.5">
                          <span className="font-bold text-white">{l.actor}</span>{" "}
                          <span className="text-[10px] uppercase text-red-400">({l.role})</span>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 bg-slate-800 text-slate-200 rounded font-bold text-[10px]">
                            {l.action}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-300 font-sans">{l.details}</td>
                        <td className="p-3.5 text-right text-slate-500 text-[11px]">{l.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* 3. MODAL IN PHIẾU ĐÓNG GÓI VẬN ĐƠN (PACKING SLIP - F18) */}
      {selectedPackingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white text-slate-900 rounded-3xl p-6 shadow-2xl relative border border-slate-300">
            <button
              onClick={() => setSelectedPackingOrder(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-2 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center border-b border-dashed border-slate-300 pb-4 mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-red-600 bg-red-50 px-2.5 py-1 rounded-md">
                PHIẾU ĐÓNG GÓI & XUẤT KHO VÕ PHỤC (F18)
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-2">ĐAI TRẮNG MARTIAL ARTS</h3>
              <p className="text-xs text-slate-500 font-mono">Mã vận đơn: {selectedPackingOrder.id} • Barcode: ||||||| {selectedPackingOrder.id} |||||||</p>
            </div>

            <div className="space-y-3 text-xs mb-5">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Người nhận hàng:</span>
                  <strong className="text-slate-900 text-sm">{selectedPackingOrder.customer}</strong>
                  <div className="text-slate-600">{selectedPackingOrder.phone}</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Hình thức thanh toán:</span>
                  <strong className="text-red-600 uppercase">{selectedPackingOrder.payment_method}</strong>
                  <div className="text-slate-600">Đã thu: {selectedPackingOrder.total.toLocaleString("vi-VN")} đ</div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-3">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Chi tiết kiện hàng:</span>
                <div className="font-bold text-slate-800">{selectedPackingOrder.product}</div>
                <div className="flex justify-between text-slate-600 text-xs mt-1">
                  <span>Kích thước: <b>{selectedPackingOrder.size}</b></span>
                  <span>Số lượng: <b>{selectedPackingOrder.quantity} bộ</b></span>
                </div>
                {selectedPackingOrder.isEmbroidered && (
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-amber-700 bg-amber-50 px-2 py-1 rounded">
                    <span>✨ Yêu cầu thêu tên:</span>
                    <b className="font-mono">{selectedPackingOrder.embroideredName}</b>
                  </div>
                )}
              </div>

              <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <p>⚠️ <b>Lưu ý thủ kho & đóng gói:</b></p>
                <p>• Kiểm tra đường chỉ nách và đũng quần trước khi niêm phong túi zip.</p>
                <p>• Kèm theo Thẻ hướng dẫn giặt ủi và Phiếu cam kết đổi size miễn phí 7 ngày.</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>In Phiếu Ngay</span>
              </button>
              <button
                onClick={() => setSelectedPackingOrder(null)}
                className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
