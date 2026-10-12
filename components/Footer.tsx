"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Heart,
  QrCode,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#001933] text-white pt-12 pb-8 border-t-4 border-yellow-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HÀNG TRÊN: 4 CAM KẾT VÀNG */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-10 border-b border-white/10">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 text-yellow-300 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Đổi Size Miễn Phí 1 Lần</h4>
              <p className="text-xs text-blue-200/80 mt-0.5">Trong vòng 7 ngày nếu mặc không vừa vặn</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/30 border border-red-400/40 text-red-300 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Chuẩn Quy Cách Môn Phái</h4>
              <p className="text-xs text-blue-200/80 mt-0.5">Đúng quy định Liên đoàn Vovinam, WTF, Karate</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-600/30 border border-yellow-400/40 text-yellow-300 flex items-center justify-center flex-shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Tư Vấn Tận Tâm 24/7</h4>
              <p className="text-xs text-blue-200/80 mt-0.5">Hotline 1900 6868 & hỗ trợ qua Zalo ngay</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-400/40 text-emerald-300 flex items-center justify-center flex-shrink-0">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Thanh Toán Linh Hoạt</h4>
              <p className="text-xs text-blue-200/80 mt-0.5">VietQR Napas 247, COD, MoMo, ZaloPay</p>
            </div>
          </div>
        </div>

        {/* HÀNG GIỮA: CỘT THÔNG TIN CHÍNH */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-10 border-b border-white/10 text-xs text-slate-300">
          
          {/* Cột 1 & 2: Thương hiệu & Giới thiệu */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-yellow-400 text-[#001933] flex items-center justify-center font-black text-xl">
                VÕ
              </div>
              <span className="text-xl font-black italic tracking-wider text-white">
                VÕ<span className="text-yellow-400">SPORT</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-light pr-4">
              Hệ thống cung cấp võ phục, đai, bảo hộ và phụ kiện võ thuật hàng đầu Việt Nam. Đối tác cung ứng trang phục đồng bộ cho hơn <strong>120 câu lạc bộ và võ đường</strong> trên toàn quốc.
            </p>
            <div className="space-y-2 text-xs text-slate-300">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>Số 123 Võ Văn Tần, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh</span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Hotline: <strong className="text-yellow-300">1900 6868</strong> - CSKH: 0987.654.321</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-300 flex-shrink-0" />
                <span>Email: lienhe@vosport.vn</span>
              </p>
            </div>
          </div>

          {/* Cột 3: Danh mục võ phục */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Võ Phục Theo Môn
            </h4>
            <ul className="space-y-2">
              <li><Link href="#products-catalog" className="hover:text-yellow-400 transition-colors">Võ phục Vovinam (Lam đai)</Link></li>
              <li><Link href="#products-catalog" className="hover:text-yellow-400 transition-colors">Võ phục Taekwondo (WTF)</Link></li>
              <li><Link href="#products-catalog" className="hover:text-yellow-400 transition-colors">Võ phục Karatedo (Kata/Kumite)</Link></li>
              <li><Link href="#products-catalog" className="hover:text-yellow-400 transition-colors">Võ phục Võ Cổ Truyền</Link></li>
              <li><Link href="#products-catalog" className="hover:text-yellow-400 transition-colors">Đai võ thuật các cấp</Link></li>
              <li><Link href="#products-catalog" className="hover:text-yellow-400 transition-colors">Đồ bảo hộ, giáp thi đấu</Link></li>
            </ul>
          </div>

          {/* Cột 4: Chính sách & Hỗ trợ */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Chính Sách Khách Hàng
            </h4>
            <ul className="space-y-2">
              <li><Link href="#size-guide" className="hover:text-yellow-400 transition-colors">Hướng dẫn chọn size chuẩn</Link></li>
              <li><Link href="#policy" className="hover:text-yellow-400 transition-colors">Chính sách đổi size 7 ngày</Link></li>
              <li><Link href="#shipping" className="hover:text-yellow-400 transition-colors">Chính sách vận chuyển & Freeship</Link></li>
              <li><Link href="#embroidery" className="hover:text-yellow-400 transition-colors">Dịch vụ in thêu logo & tên</Link></li>
              <li><Link href="#b2b" className="hover:text-yellow-400 transition-colors">Ưu đãi dành cho Võ đường / HLV</Link></li>
            </ul>
          </div>

          {/* Cột 5: Chứng nhận TMĐT */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Chứng Nhận TMĐT
            </h4>
            <div className="space-y-2">
              <div className="bg-white/10 p-2 rounded-lg border border-white/20 text-center">
                <span className="text-[10px] uppercase font-bold text-emerald-400 block">ĐÃ ĐĂNG KÝ BỘ CÔNG THƯƠNG</span>
                <span className="text-[9px] text-slate-300">Website TMĐT Tuân Thủ Nghị Định 52</span>
              </div>
              <div className="bg-white/10 p-2 rounded-lg border border-white/20 text-center">
                <span className="text-[10px] uppercase font-bold text-yellow-400 block">VIETQR NAPAS 247</span>
                <span className="text-[9px] text-slate-300">Thanh Toán An Toàn & Bảo Mật</span>
              </div>
            </div>
          </div>

        </div>

        {/* HÀNG DƯỚI: COPYRIGHT */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© 2026 VÕ SPORT – Nền tảng TMĐT Võ phục & Phụ kiện võ thuật. Đồ án Nhóm 2.</p>
          <p className="flex items-center gap-1">
            Thiết kế với <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> tôn vinh tinh thần thượng võ Việt Nam.
          </p>
        </div>

      </div>
    </footer>
  );
}
