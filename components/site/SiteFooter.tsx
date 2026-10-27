import Link from "next/link";
import { ChatsCircleIcon, GiftIcon } from "@phosphor-icons/react/ssr";
import { MARTIAL_ARTS } from "@/lib/catalog";
import { cx } from "@/lib/format";
import { HOTLINE, HOTLINE_TEL } from "@/components/site/nav";

const COLUMNS = [
  {
    title: "Về VÕ SPORT",
    links: [
      { href: "/", label: "Giới thiệu" },
      { href: "/dojos", label: "Đồng phục võ đường" },
      { href: "/blog", label: "Cẩm nang võ sinh" },
      { href: "/policies#dieu-khoan", label: "Các điều khoản và điều kiện" },
    ],
  },
  {
    title: "Hỗ trợ khách hàng",
    links: [
      { href: "/policies#thanh-toan", label: "Chính sách giao hàng" },
      { href: "/policies#doi-tra", label: "Chính sách đổi size" },
      { href: "/policies#bao-mat", label: "Chính sách bảo mật" },
      { href: "/size-guide", label: "Hướng dẫn chọn size" },
      { href: "/orders", label: "Tra cứu đơn hàng" },
    ],
  },
  {
    title: "Mua sắm",
    links: [
      ...MARTIAL_ARTS.map((m) => ({ href: `/products?martial_art=${m.id}`, label: `Võ phục ${m.label}` })),
      { href: "/products?sort=discount", label: "Đang giảm giá" },
    ],
  },
];

const PAYMENTS = ["COD", "MoMo"];

export function SiteFooter() {
  return (
    <footer className="mt-24">
      <div className="bg-navy text-on-navy">
        <div className="mx-auto grid max-w-[1360px] gap-6 px-4 py-6 sm:px-6 md:grid-cols-[1fr_auto_1fr] md:items-center lg:px-8">
          <div className="flex flex-wrap items-center gap-4 md:justify-center">
            <ChatsCircleIcon weight="light" className="size-9 text-accent-on-navy" aria-hidden />
            <p className="text-[15px] font-semibold tracking-wide uppercase">VÕ SPORT luôn lắng nghe bạn</p>
            <a href={`tel:${HOTLINE_TEL}`} className="rounded-sm bg-on-navy px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-accent-on-navy">
              Gọi {HOTLINE}
            </a>
          </div>
          <div className="hidden h-12 w-px bg-on-navy/25 md:block" aria-hidden />
          <div className="flex flex-wrap items-center gap-4 md:justify-center">
            <GiftIcon weight="light" className="size-9 text-accent-on-navy" aria-hidden />
            <p className="text-[15px] font-semibold tracking-wide uppercase">Tạo tài khoản để theo dõi đơn hàng</p>
            <Link href="/login?tab=register" className="rounded-sm bg-on-navy px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-accent-on-navy">
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-surface">
        <div className="mx-auto grid max-w-[1360px] gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr] lg:px-8">
          <div className="text-[15px] leading-relaxed text-ink-2">
            <h2 className="text-base font-bold tracking-wide text-heading uppercase">VÕ SPORT, võ phục và trang bị võ thuật</h2>
            <p className="mt-3">
              <span className="font-semibold text-ink">Cửa hàng:</span> Số 123 Võ Văn Tần, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh
            </p>
            <p className="mt-2">
              <span className="font-semibold text-ink">Tổng đài:</span>{" "}
              <a href={`tel:${HOTLINE_TEL}`} className="hover:text-accent-text">
                {HOTLINE}
              </a>{" "}
              (8:00 - 21:00)
            </p>
            <p className="mt-2">
              <span className="font-semibold text-ink">Email:</span>{" "}
              <a href="mailto:lienhe@vosport.vn" className="hover:text-accent-text">
                lienhe@vosport.vn
              </a>
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="text-base font-bold tracking-wide text-heading uppercase">{col.title}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="text-[15px] text-ink-2 transition-colors hover:text-accent-text">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="text-base font-bold tracking-wide text-heading uppercase">Thanh toán</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {PAYMENTS.map((p) => (
                <li key={p} className="rounded-sm border border-line px-3 py-1.5 text-sm font-semibold text-ink">
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-ink-3">Đơn có thêu tên thanh toán trước qua MoMo. Đơn khác có thể trả tiền khi nhận hàng.</p>
          </div>
        </div>

        <div className="border-t border-line">
          <div className={cx("mx-auto flex max-w-[1360px] flex-col gap-2 px-4 py-5 text-[13px] text-ink-3 sm:flex-row sm:justify-between sm:px-6 lg:px-8")}>
            <p>© 2026 VÕ SPORT. Đồ án môn Thương mại điện tử, Nhóm 2. Sản phẩm và giá là dữ liệu mẫu.</p>
            <Link href="/policies" className="hover:text-ink">
              Chính sách mua hàng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
