import { cx } from "@/lib/format";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cx("rounded-lg bg-muted motion-safe:animate-pulse", className)} aria-hidden />;
}

/** Khung chờ có cùng hình dạng với thẻ sản phẩm để tránh nhảy bố cục khi dữ liệu về. */
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3" aria-hidden>
      <Skeleton className="aspect-square w-full rounded-none" />
      <Skeleton className="h-3 w-1/3" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 8, columns = "md:grid-cols-3 lg:grid-cols-4" }: { count?: number; columns?: string }) {
  return (
    <div className={cx("grid grid-cols-2 gap-x-4 gap-y-8", columns)} role="status" aria-label="Đang tải sản phẩm">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
