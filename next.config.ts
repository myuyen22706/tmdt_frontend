import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Hồ sơ cache khi gọi API lỗi: vẫn đủ dài để vào bản prerender (build không vỡ khi backend đang ngủ),
  // nhưng làm mới sau 30 giây để trang tự có dữ liệu khi backend chạy lại.
  cacheLife: {
    retry: { stale: 30, revalidate: 30, expire: 300 },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.vietqr.io",
      },
      {
        protocol: "https",
        hostname: "api.qrserver.com",
      },
    ],
  },
  // Giữ các URL mà sitemap của backend đang khai báo, chuyển về trang danh mục có bộ lọc tương ứng
  async redirects() {
    return [
      { source: "/martial-arts/:slug", destination: "/products?martial_art=:slug", permanent: false },
      { source: "/categories/:slug", destination: "/products?category=:slug", permanent: false },
      { source: "/about", destination: "/", permanent: false },
      { source: "/contact", destination: "/policies", permanent: false },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

