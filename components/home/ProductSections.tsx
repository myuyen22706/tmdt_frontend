import Link from "next/link";
import { ArrowRightIcon, CloudSlashIcon } from "@phosphor-icons/react/ssr";
import { getProducts, type CatalogQuery } from "@/lib/server-data";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { buttonClass } from "@/components/ui/styles";

export function ApiUnavailable({ message = "Chưa tải được sản phẩm. Máy chủ có thể đang khởi động, vui lòng tải lại sau ít giây." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 border border-dashed border-line px-6 py-12 text-center">
      <CloudSlashIcon weight="light" className="size-9 text-ink-3" aria-hidden />
      <p className="max-w-md text-sm text-ink-2">{message}</p>
    </div>
  );
}

/** Lưới sản phẩm (dùng cho "sản phẩm cùng môn" ở trang chi tiết). */
export async function ProductGrid({ query, moreHref }: { query: CatalogQuery; moreHref?: string }) {
  const result = await getProducts(query);
  if (!result.ok) return <ApiUnavailable />;

  return (
    <>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
        {result.data.items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {moreHref && result.data.total > result.data.items.length && (
        <div className="mt-12 flex justify-center">
          <Link href={moreHref} className={buttonClass("dark", "lg", "group")}>
            Xem tất cả {result.data.total} sản phẩm
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      )}
    </>
  );
}

export { ProductGridSkeleton };
