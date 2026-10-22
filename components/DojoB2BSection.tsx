"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Users,
  QrCode,
  Share2,
  FileSpreadsheet,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Clock,
  ShieldCheck,
} from "lucide-react";

export default function DojoB2BSection() {
  const [activeTab, setActiveTab] = useState<"overview" | "demo_campaign">("demo_campaign");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [selectedSize, setSelectedSize] = useState("Size 2");
  const [isCopied, setIsCopied] = useState(false);

  // Danh sách học viên mẫu của CLB Phù Đổng
  const [students, setStudents] = useState([
    { id: 1, name: "Trần Bảo Nam", phone: "0912***678", size: "Size 2", hasEmbroidery: true, isPaid: true },
    { id: 2, name: "Lê Gia Hân", phone: "0912***679", size: "Size 1", hasEmbroidery: true, isPaid: true },
    { id: 3, name: "Nguyễn Minh Khang", phone: "0912***680", size: "Size 3 (S)", hasEmbroidery: false, isPaid: false },
  ]);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText("http://localhost:3000/dojo/PHUDONG2026");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleAddStudentOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !parentPhone.trim()) return;
    setStudents([
      ...students,
      {
        id: students.length + 1,
        name: studentName,
        phone: parentPhone,
        size: selectedSize,
        hasEmbroidery: true,
        isPaid: true,
      },
    ]);
    setStudentName("");
    setParentPhone("");
    setShowOrderModal(false);
  };

  return (
    <section id="dojo-b2b" className="py-16 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 text-slate-300 text-xs font-medium uppercase rounded-full tracking-wider border border-slate-800">
            Dành cho Huấn luyện viên & Võ đường
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mt-3">
            Cổng Gom Đơn & Đồng Phục CLB
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed font-light">
            Giải pháp chuyên biệt cho ban huấn luyện: Tạo đợt đặt áo, gửi link Zalo cho phụ huynh tự chọn size, tự động tổng hợp danh sách và đóng gói riêng từng võ sinh.
          </p>
        </div>

        {/* 4 BƯỚC ĐẶT HÀNG THÔNG MINH */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            {
              step: "01",
              title: "Tạo Đợt Đặt Hàng",
              desc: "HLV chọn mẫu võ phục, tải logo CLB và định ngày chốt đơn.",
              icon: Users,
              color: "text-amber-400",
            },
            {
              step: "02",
              title: "Chia Sẻ Link Riêng",
              desc: "Gửi link vào nhóm Zalo để phụ huynh võ sinh tự vào đăng ký size.",
              icon: QrCode,
              color: "text-emerald-400",
            },
            {
              step: "03",
              title: "Phụ Huynh Tự Đo Size",
              desc: "Có công cụ tính size theo chiều cao, cân nặng và đăng ký thêu tên.",
              icon: Share2,
              color: "text-blue-400",
            },
            {
              step: "04",
              title: "Giao Hàng Dán Tên",
              desc: "Đóng gói dán tên từng em, xuất file Excel danh sách size theo lớp.",
              icon: FileSpreadsheet,
              color: "text-rose-400",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-slate-700">{item.step}</span>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* BẢNG ĐIỀU KHIỂN ĐỢT ĐẶT HÀNG MẪU (DEMO LIVE INTERACTION) */}
        <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
            
            {/* Thông tin đợt */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 p-2 flex items-center justify-center flex-shrink-0">
                <Image src="/mau_1.jpg" alt="Vovinam" width={56} height={56} className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-black uppercase px-2 py-0.5 rounded">
                    Mã: PHUDONG2026
                  </span>
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    ● Đang mở nhận đơn
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                  Đợt Đặt Đồng Phục Khóa Hè – CLB Vovinam Phù Đổng
                </h3>
                <p className="text-xs text-slate-500">
                  HLV phụ trách: <strong>Võ sư Nguyễn Văn Hùng</strong> • Hạn chốt: <strong>25/10/2026</strong>
                </p>
              </div>
            </div>

            {/* Link & Mã QR chia sẻ */}
            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
              <button
                onClick={handleCopyLink}
                className="flex-1 lg:flex-initial px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-blue-600" />
                <span>{isCopied ? "✓ Đã sao chép link" : "Sao chép link Zalo"}</span>
              </button>
              
              <button
                onClick={() => setShowOrderModal(true)}
                className="flex-1 lg:flex-initial px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-transform hover:scale-102"
              >
                <span>+ Phụ huynh đặt ngay</span>
              </button>
            </div>
          </div>

          {/* Bậc chiết khấu số lượng */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className={`p-3 rounded-xl border text-xs font-medium ${students.length >= 10 ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold" : "bg-slate-50 border-slate-200 text-slate-600"}`}>
              <span className="block font-bold">Mốc 10 bộ: Giảm 5%</span>
              <span className="text-[11px]">Đã có {students.length}/10 bộ</span>
            </div>
            <div className={`p-3 rounded-xl border text-xs font-medium ${students.length >= 20 ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold" : "bg-slate-50 border-slate-200 text-slate-600"}`}>
              <span className="block font-bold">Mốc 20 bộ: Giảm 10%</span>
              <span className="text-[11px]">Đạt mốc được miễn phí thêu logo CLB</span>
            </div>
            <div className={`p-3 rounded-xl border text-xs font-medium ${students.length >= 50 ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold" : "bg-slate-50 border-slate-200 text-slate-600"}`}>
              <span className="block font-bold">Mốc 50 bộ: Giảm 15%</span>
              <span className="text-[11px]">Chiết khấu tối đa + Freeship tận võ đường</span>
            </div>
          </div>

          {/* Bảng danh sách võ sinh đã đặt */}
          <div className="overflow-x-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase text-slate-700">
                Danh sách học viên đã đặt ({students.length} em):
              </span>
              <span className="text-xs text-blue-600 hover:underline cursor-pointer flex items-center gap-1 font-bold">
                <FileSpreadsheet className="w-3.5 h-3.5" /> Xuất file Excel nộp võ đường
              </span>
            </div>

            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 uppercase font-black">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Họ Tên Võ Sinh</th>
                  <th className="p-3">Số ĐT Phụ Huynh</th>
                  <th className="p-3">Size Đặt</th>
                  <th className="p-3">Thêu Tên</th>
                  <th className="p-3">Trạng Thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((std, i) => (
                  <tr key={std.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-500">{i + 1}</td>
                    <td className="p-3 font-bold text-slate-900">{std.name}</td>
                    <td className="p-3 text-slate-600">{std.phone}</td>
                    <td className="p-3 font-black text-blue-700">{std.size}</td>
                    <td className="p-3">
                      {std.hasEmbroidery ? (
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">Có thêu</span>
                      ) : (
                        <span className="text-slate-400">Không</span>
                      )}
                    </td>
                    <td className="p-3">
                      {std.isPaid ? (
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">Đã thanh toán (VietQR)</span>
                      ) : (
                        <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">Thu tiền mặt tại lớp</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* MODAL PHỤ HUYNH ĐẶT HÀNG QUA LINK VÕ ĐƯỜNG */}
        {showOrderModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl p-6 border border-slate-200 text-slate-900 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase text-blue-700 block">CLB Vovinam Phù Đổng</span>
                  <h4 className="text-base font-black text-slate-900">Đăng Ký Võ Phục Cho Con</h4>
                </div>
                <button onClick={() => setShowOrderModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
              </div>

              <form onSubmit={handleAddStudentOrder} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Họ và tên võ sinh (con):</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Hoàng Đình Trí"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Số điện thoại phụ huynh:</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ví dụ: 0912345678"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Chọn size võ phục:</label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none"
                  >
                    <option value="Size 00 (Trẻ em)">Size 00 (100 - 115cm, 15 - 22kg)</option>
                    <option value="Size 0 (Trẻ em)">Size 0 (115 - 125cm, 20 - 28kg)</option>
                    <option value="Size 1">Size 1 (125 - 135cm, 26 - 35kg)</option>
                    <option value="Size 2">Size 2 (135 - 145cm, 33 - 42kg)</option>
                    <option value="Size 3 (S)">Size 3 (S) (145 - 155cm, 40 - 50kg)</option>
                    <option value="Size 4 (M)">Size 4 (M) (155 - 165cm, 48 - 60kg)</option>
                  </select>
                </div>

                <div className="bg-yellow-50 p-2.5 rounded-xl border border-yellow-200 text-[11px] text-amber-900">
                  ✓ Miễn phí thêu tên võ sinh lên áo theo mẫu của CLB.
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase rounded-xl shadow-lg transition-transform hover:scale-102"
                >
                  Xác nhận gửi đơn đặt
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
