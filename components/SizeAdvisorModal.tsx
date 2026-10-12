"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Info,
  HelpCircle,
  RefreshCw,
} from "lucide-react";

interface SizeAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSizeForCart?: (size: string) => void;
}

export default function SizeAdvisorModal({
  isOpen,
  onClose,
  onSelectSizeForCart,
}: SizeAdvisorModalProps) {
  const [martialArt, setMartialArt] = useState("vovinam");
  const [heightCm, setHeightCm] = useState<number>(160);
  const [weightKg, setWeightKg] = useState<number>(52);
  const [gender, setGender] = useState("male");
  const [bodyBuild, setBodyBuild] = useState("standard"); // lean, standard, bulky
  const [isChildBuffer, setIsChildBuffer] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  if (!isOpen) return null;

  // Thuật toán gợi ý size bám sát backend SizeAdvisorService & tài liệu
  const calculateSize = () => {
    let sizeIndex = 4; // Mặc định Size 4 (M)
    if (heightCm < 115) sizeIndex = 0; // Size 00
    else if (heightCm < 125) sizeIndex = 1; // Size 0
    else if (heightCm < 135) sizeIndex = 2; // Size 1
    else if (heightCm < 145) sizeIndex = 3; // Size 2
    else if (heightCm < 155) sizeIndex = 4; // Size 3 (S)
    else if (heightCm < 165) sizeIndex = 5; // Size 4 (M)
    else if (heightCm < 172) sizeIndex = 6; // Size 5 (L)
    else if (heightCm < 180) sizeIndex = 7; // Size 6 (XL)
    else sizeIndex = 8; // Size 7 (XXL)

    // Điều chỉnh dáng người
    let note = `Phù hợp người cao ${heightCm}cm, cân nặng ${weightKg}kg.`;
    if (bodyBuild === "bulky" && sizeIndex < 8) {
      sizeIndex += 1;
      note += " Bạn có dáng người đậm, hệ thống tự động tăng 1 size để đảm bảo sự thoải mái khi di chuyển tấn pháp.";
    } else if (bodyBuild === "lean") {
      note += " Dáng người thanh mảnh, form áo chuẩn theo chiều dài cánh tay và vạt áo.";
    }

    // Điều chỉnh mua rộng cho trẻ em
    if (isChildBuffer && sizeIndex < 8) {
      sizeIndex += 1;
      note += " Đã tính thêm 1 size trừ hao cho bé đang phát triển chiều cao.";
    }

    const sizes = [
      "Size 00 (Trẻ em)",
      "Size 0 (Trẻ em)",
      "Size 1",
      "Size 2",
      "Size 3 (S)",
      "Size 4 (M)",
      "Size 5 (L)",
      "Size 6 (XL)",
      "Size 7 (XXL)",
    ];

    const recommended = sizes[sizeIndex];
    const backup = sizeIndex > 0 ? sizes[sizeIndex - 1] : sizes[1];

    return { recommended, backup, note };
  };

  const result = calculateSize();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative flex flex-col max-h-[92vh]">
        
        {/* HEADER MODAL */}
        <div className="bg-gradient-to-r from-[#002f5e] via-blue-900 to-indigo-900 text-white p-5 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400 text-slate-950 flex items-center justify-center shadow-lg">
              <Compass className="w-6 h-6 text-red-700 animate-spin-slow" />
            </div>
            <div>
              <span className="text-yellow-400 font-black text-[11px] uppercase tracking-wider block">
                ⭐ Tính Năng Điểm Nhấn Độc Quyền
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white">
                Công Cụ Tư Vấn Size Võ Phục Thông Minh
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* NỘI DUNG FORM NHẬP LIỆU */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-800">
          
          {/* 1. CHỌN MÔN VÕ */}
          <div>
            <label className="text-xs font-black uppercase text-slate-600 block mb-2">
              1. Chọn Môn Võ Thuật:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "vovinam", name: "Vovinam", color: "border-blue-600 text-blue-800 bg-blue-50" },
                { id: "taekwondo", name: "Taekwondo", color: "border-red-600 text-red-800 bg-red-50" },
                { id: "karate", name: "Karate", color: "border-slate-800 text-slate-900 bg-slate-50" },
                { id: "vo_co_truyen", name: "Cổ Truyền", color: "border-amber-600 text-amber-800 bg-amber-50" },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMartialArt(m.id)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                    martialArt === m.id
                      ? `${m.color} ring-2 ring-blue-500/30 shadow-xs font-black`
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* 2. CHIỀU CAO & CÂN NẶNG */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Chiều cao */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-slate-700">Chiều cao:</span>
                <span className="text-base font-black text-blue-700">{heightCm} cm</span>
              </div>
              <input
                type="range"
                min="100"
                max="195"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>100 cm (Trẻ em)</span>
                <span>165 cm</span>
                <span>195 cm (XXL)</span>
              </div>
            </div>

            {/* Cân nặng */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-slate-700">Cân nặng:</span>
                <span className="text-base font-black text-red-600">{weightKg} kg</span>
              </div>
              <input
                type="range"
                min="18"
                max="105"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>18 kg</span>
                <span>60 kg</span>
                <span>105 kg</span>
              </div>
            </div>
          </div>

          {/* 3. VÓC DÁNG & TÙY CHỌN TRẺ EM */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Vóc dáng */}
            <div>
              <label className="text-xs font-black uppercase text-slate-600 block mb-2">
                Dáng người thực tế:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "lean", name: "Gầy" },
                  { id: "standard", name: "Vừa vặn" },
                  { id: "bulky", name: "Đậm người" },
                ].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBodyBuild(b.id)}
                    className={`py-2 px-2 rounded-xl border text-xs font-bold transition-all text-center ${
                      bodyBuild === b.id
                        ? "border-blue-600 bg-blue-600 text-white shadow-xs"
                        : "border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Tùy chọn mua rộng cho trẻ em */}
            <div className="flex items-center">
              <label className="flex items-start gap-2.5 bg-yellow-50/80 border border-yellow-200 p-3 rounded-2xl cursor-pointer hover:bg-yellow-100/70 transition-colors w-full">
                <input
                  type="checkbox"
                  checked={isChildBuffer}
                  onChange={(e) => setIsChildBuffer(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-blue-600 rounded focus:ring-yellow-400"
                />
                <div className="text-xs">
                  <span className="font-bold text-amber-900 block">
                    Mua rộng 1 size cho trẻ em
                  </span>
                  <span className="text-slate-600 text-[11px]">
                    Cộng thêm trừ hao cho võ sinh nhí đang tuổi phát triển.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* KẾT QUẢ TƯ VẤN (TỰ ĐỘNG CẬP NHẬT TRỰC QUAN) */}
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-amber-50 rounded-2xl p-4 sm:p-5 border-2 border-blue-200 relative overflow-hidden shadow-inner">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              {/* Size chính đề xuất */}
              <div className="space-y-1">
                <span className="text-xs font-black uppercase text-blue-800 tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-yellow-500 fill-yellow-500" /> KẾT QUẢ ĐỀ XUẤT CHUẨN:
                </span>
                <div className="text-2xl sm:text-3xl font-black text-blue-700 flex items-baseline gap-2">
                  <span>{result.recommended}</span>
                  <span className="text-xs font-normal text-slate-500">
                    (Dự phòng: <strong>{result.backup}</strong>)
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-snug pt-1">
                  {result.note}
                </p>
              </div>

              {/* Ảnh minh họa mau_1.jpg */}
              <div className="w-20 h-20 bg-white rounded-xl shadow border border-slate-200 p-1 flex-shrink-0 self-center">
                <Image
                  src="/mau_1.jpg"
                  alt="Võ phục mẫu"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Cam kết đổi size miễn phí */}
            <div className="mt-4 pt-3 border-t border-blue-200/60 flex items-center gap-2 text-xs text-emerald-800 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Chính sách: Đổi size miễn phí 1 lần trong 7 ngày nếu không vừa!</span>
            </div>
          </div>

        </div>

        {/* FOOTER MODAL & NÚT HÀNH ĐỘNG */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            Dữ liệu tính toán từ bảng size quy chuẩn của Liên đoàn
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Đóng
            </button>
            <button
              onClick={() => {
                if (onSelectSizeForCart) onSelectSizeForCart(result.recommended);
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg flex items-center gap-2 transition-transform hover:scale-102"
            >
              <span>Chọn Size Này Cho Đơn Hàng</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
