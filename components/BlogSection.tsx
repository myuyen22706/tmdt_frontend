"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Calendar, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

const POSTS = [
  {
    id: "post-1",
    title: "Hướng Dẫn Buộc Đai Vovinam & Karate Đúng Chuẩn Liên Đoàn",
    summary:
      "Từng bước hướng dẫn thắt đai cân đối hai đầu, siết chặt vừa vặn vạt áo và tạo thẩm mỹ uy phong khi biểu diễn quyền pháp.",
    category: "Kỹ Thuật Võ Đạo",
    date: "10/10/2026",
    readTime: "3 phút đọc",
  },
  {
    id: "post-2",
    title: "Mẹo Giặt & Bảo Quản Võ Phục Cotton Trắng Sáng, Không Ố Vàng",
    summary:
      "Cách ngâm nước lạnh với giấm trắng khử mồ hôi muối, tránh phơi nắng gắt trực tiếp giúp sợi vải Kaki luôn bền chắc và đứng form.",
    category: "Cẩm Nang Võ Sinh",
    date: "08/10/2026",
    readTime: "4 phút đọc",
  },
  {
    id: "post-3",
    title: "Phân Biệt Quy Cách Võ Phục 4 Môn: Vovinam, Taekwondo, Karate, Cổ Truyền",
    summary:
      "Hiểu rõ sự khác biệt giữa áo cổ chữ V (Taekwondo), áo vạt chéo xanh lam (Vovinam), áo trắng nút chéo (Karate) và áo nút thắt (Cổ Truyền).",
    category: "Kiến Thức Võ Thuật",
    date: "05/10/2026",
    readTime: "5 phút đọc",
  },
];

export default function BlogSection() {
  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-slate-200">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-blue-700 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-red-600" /> Cẩm nang & Kiến thức
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900 mt-1">
              Bài Viết Hướng Dẫn Dành Cho Võ Sinh
            </h2>
          </div>
          <Link
            href="#blog"
            className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 mt-2 sm:mt-0 transition-colors"
          >
            <span>Xem tất cả bài viết</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* POSTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Ảnh bài viết sử dụng vovi.jpg */}
              <div className="relative w-full h-44 bg-slate-900 overflow-hidden">
                <Image
                  src="/vovi.jpg"
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <span className="absolute top-3 left-3 bg-[#002f5e] text-yellow-300 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                  {post.category}
                </span>
              </div>

              {/* Nội dung */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {post.date}
                    </span>
                    <span>• {post.readTime}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-light">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700 group-hover:underline flex items-center gap-1">
                    Đọc tiếp <ArrowRight className="w-3 h-3" />
                  </span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                    Chuẩn quy cách
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
