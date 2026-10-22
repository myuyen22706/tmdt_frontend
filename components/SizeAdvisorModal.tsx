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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-xl border border-slate-200 overflow-hidden relative flex flex-col max-h-[92vh]">
        
        {/* HEADER MODAL */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-slate-400 font-medium text-[11px] uppercase tracking-wider block">
                Bảng tính đo form
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Tư Vấn Size Võ Phục Chuẩn Xác
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* NỘI DUNG FORM NHẬP LIỆU */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-800">
          
          {/* 1. CHỌN MÔN VÕ */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-2">
              1. Môn võ thuật theo học:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "vovinam", name: "Vovinam" },
                { id: "taekwondo", name: "Taekwondo" },
                { id: "karate", name: "Karatedo" },
                { id: "vo_co_truyen", name: "Võ Cổ Truyền" },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMartialArt(m.id)}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all text-center cursor-pointer ${
                    martialArt === m.id
                      ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
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
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-semibold text-slate-700">Chiều cao:</span>
                <span className="text-sm font-bold text-slate-900">{heightCm} cm</span>
              </div>
              <input
                type="range"
                min="100"
                max="195"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>100 cm (Trẻ em)</span>
                <span>165 cm</span>
                <span>195 cm (XXL)</span>
              </div>
            </div>

            {/* Cân nặng */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-semibold text-slate-700">Cân nặng:</span>
                <span className="text-sm font-bold text-slate-900">{weightKg} kg</span>
              </div>
              <input
                type="range"
                min="18"
                max="105"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
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
              <label className="text-xs font-semibold text-slate-700 block mb-2">
                Thể trạng người mặc:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "lean", name: "Gầy" },
                  { id: "standard", name: "Cân đối" },
                  { id: "bulky", name: "Đậm người" },
                ].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBodyBuild(b.id)}
                    className={`py-2 px-1 text-xs rounded-xl border font-medium transition-all text-center cursor-pointer ${
                      bodyBuild === b.id
                        ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Tùy chọn mua rộng cho trẻ em */}
            <div className="flex items-center">
              <label className="flex items-start gap-2.5 bg-slate-50 border border-slate-200 p-3 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors w-full">
                <input
                  type="checkbox"
                  checked={isChildBuffer}
                  onChange={(e) => setIsChildBuffer(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-slate-900 rounded accent-slate-900"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-900 block">
                    Tính trừ hao cho trẻ em
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    Tự động cộng 1 size cho bé đang tuổi phát triển.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* KẾT QUẢ TƯ VẤN */}
          <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              {/* Size chính đề xuất */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase text-slate-500 tracking-wider">
                  Cỡ size khuyến nghị:
                </span>
                <div className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-baseline gap-2">
                  <span>{result.recommended}</span>
                  <span className="text-xs font-normal text-slate-500">
                    (Dự phòng: <strong>{result.backup}</strong>)
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {result.note}
                </p>
              </div>

              {/* Ảnh minh họa */}
              <div className="w-16 h-16 bg-white rounded-xl border border-slate-200 p-1 flex-shrink-0 self-center">
                <Image
                  src="/mau_1.jpg"
                  alt="Võ phục mẫu"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Cam kết đổi size miễn phí */}
            <div className="mt-3 pt-3 border-t border-slate-200 flex items-center gap-1.5 text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Chính sách: Đổi size miễn phí trong 7 ngày nếu mặc không vừa!</span>
            </div>
          </div>

        </div>

        {/* FOOTER MODAL & NÚT HÀNH ĐỘNG */}
        <div className="p-4 bg-white border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            Dữ liệu quy chuẩn theo thông số kích cỡ Liên đoàn
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Đóng
            </button>
            <button
              onClick={() => {
                if (onSelectSizeForCart) onSelectSizeForCart(result.recommended);
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-700 active:scale-[0.98] text-white text-xs font-semibold tracking-wide shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Áp dụng size này</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
