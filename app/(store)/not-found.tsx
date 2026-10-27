import Link from "next/link";
import { cx } from "@/lib/format";
import { buttonClass, container } from "@/components/ui/styles";

export default function NotFound() {
  return (
    <div className={cx(container, "flex flex-col items-center py-24 text-center lg:py-32")}>
      <p className="text-sm font-medium text-accent-text tabular">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">Không tìm thấy trang này</h1>
      <p className="mt-3 max-w-md text-ink-2">Đường dẫn có thể đã thay đổi hoặc sản phẩm đã ngừng kinh doanh.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <Link href="/products" className={buttonClass("dark", "lg")}>
          Xem sản phẩm
        </Link>
        <Link href="/" className={buttonClass("secondary", "lg")}>
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
