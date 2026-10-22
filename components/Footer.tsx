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
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HÀNG TRÊN: 4 CAM KẾT VÀNG */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-10 border-b border-slate-800">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Đổi Size Miễn Phí</h4>
              <p className="text-xs text-slate-400 mt-0.5">Trong vòng 7 ngày nếu mặc không vừa vặn</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Chuẩn Quy Cách Liên Đoàn</h4>
              <p className="text-xs text-slate-400 mt-0.5">Đúng quy định Vovinam, WTF, Karatedo</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 flex items-center justify-center flex-shrink-0">
              <PhoneCall className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Hỗ Trợ Tận Tâm 24/7</h4>
              <p className="text-xs text-slate-400 mt-0.5">Hotline 1900 6868 & hỗ trợ Zalo trực tiếp</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 flex items-center justify-center flex-shrink-0">
              <QrCode className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Thanh Toán Linh Hoạt</h4>
              <p className="text-xs text-slate-400 mt-0.5">VietQR Napas 247, COD tận nơi, chuyển khoản</p>
            </div>
          </div>
        </div>

        {/* HÀNG GIỮA: CỘT THÔNG TIN CHÍNH */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-10 border-b border-slate-800 text-xs text-slate-400">
          
          {/* Cột 1 & 2: Thương hiệu & Giới thiệu */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 text-white flex items-center justify-center font-black text-lg">
                VÕ
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                VÕ<span className="text-red-500">SPORT</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-light pr-4">
              Hệ thống cung cấp võ phục, đai, bảo hộ và phụ kiện võ thuật uy tín tại Việt Nam. Đối tác cung ứng trang phục đồng bộ cho hơn <strong>120 câu lạc bộ và võ đường</strong> trên toàn quốc.
            </p>
            <div className="space-y-2 text-xs text-slate-400 pt-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>Số 123 Võ Văn Tần, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh</span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>Hotline: <strong className="text-white">1900 6868</strong> - CSKH: 0987.654.321</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>Email: lienhe@vosport.vn</span>
              </p>
            </div>
          </div>

          {/* Cột 3: Danh mục võ phục */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">
              Võ Phục Theo Môn
            </h4>
            <ul className="space-y-2">
              <li><Link href="#products-catalog" className="hover:text-white transition-colors">Võ phục Vovinam</Link></li>
              <li><Link href="#products-catalog" className="hover:text-white transition-colors">Võ phục Taekwondo (WTF)</Link></li>
              <li><Link href="#products-catalog" className="hover:text-white transition-colors">Võ phục Karatedo</Link></li>
              <li><Link href="#products-catalog" className="hover:text-white transition-colors">Võ phục Võ Cổ Truyền</Link></li>
              <li><Link href="#products-catalog" className="hover:text-white transition-colors">Đai võ thuật các cấp</Link></li>
              <li><Link href="#products-catalog" className="hover:text-white transition-colors">Đồ bảo hộ, giáp thi đấu</Link></li>
            </ul>
          </div>

          {/* Cột 4: Chính sách & Hỗ trợ */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">
              Chính Sách Khách Hàng
            </h4>
            <ul className="space-y-2">
              <li><Link href="#products-catalog" className="hover:text-white transition-colors">Hướng dẫn đo size chuẩn</Link></li>
              <li><Link href="#policy" className="hover:text-white transition-colors">Chính sách đổi size 7 ngày</Link></li>
              <li><Link href="#shipping" className="hover:text-white transition-colors">Chính sách vận chuyển toàn quốc</Link></li>
              <li><Link href="#embroidery" className="hover:text-white transition-colors">Dịch vụ thêu tên võ sinh</Link></li>
              <li><Link href="#dojo-b2b" className="hover:text-white transition-colors">Cổng chiết khấu Võ đường / HLV</Link></li>
            </ul>
          </div>

          {/* Cột 5: Chứng nhận TMĐT */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">
              Chứng Nhận TMĐT
            </h4>
            <div className="space-y-2">
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] uppercase font-semibold text-emerald-400 block">ĐÃ ĐĂNG KÝ BỘ CÔNG THƯƠNG</span>
                <span className="text-[9px] text-slate-400">Website TMĐT Tuân Thủ Nghị Định 52</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] uppercase font-semibold text-amber-400 block">VIETQR NAPAS 247</span>
                <span className="text-[9px] text-slate-400">Thanh Toán An Toàn & Bảo Mật</span>
              </div>
            </div>
          </div>

        </div>

        {/* HÀNG DƯỚI: COPYRIGHT */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 VÕ SPORT – Nền tảng TMĐT Võ phục & Phụ kiện võ thuật. Đồ án Nhóm 2.</p>
          <p className="flex items-center gap-1 text-slate-400">
            Tôn vinh tinh thần thượng võ và đạo đức thể thao Việt Nam.
          </p>
        </div>

      </div>
    </footer>
  );
}
