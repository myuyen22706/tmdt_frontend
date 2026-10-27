import Link from "next/link";
import { martialArtLabel } from "@/lib/catalog";
import { getProducts } from "@/lib/server-data";
import type { Product } from "@/lib/types";
import { sectionTitle } from "@/components/ui/styles";
import { Skeleton, ProductCardSkeleton } from "@/components/ui/Skeleton";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductImage } from "@/components/product/ProductImage";
import { ApiUnavailable } from "@/components/home/ProductSections";
import { ScrollRail } from "@/components/home/ScrollRail";
import { railItem5 } from "@/components/home/rail-sizes";
import { TabbedPanels } from "@/components/home/TabbedPanels";

function CategoryBanner({ artId, products }: { artId: string; products: Product[] }) {
  const label = martialArtLabel(artId);
  const showcase = products.slice(0, 2);
  return (
    <Link href={`/products?martial_art=${artId}`} className="group grid-paper relative flex h-56 items-center overflow-hidden sm:h-64 lg:h-[300px]">
      <span className="relative z-10 ml-[8%] bg-navy px-5 py-3 text-2xl font-bold tracking-wide text-on-navy uppercase italic transition-colors group-hover:bg-accent sm:text-3xl lg:text-4xl">
        {label}
      </span>
      <div className="absolute inset-y-6 right-[6%] flex w-[52%] items-center justify-end gap-3">
        {showcase.map((p, i) => (
          <div
            key={p.id}
            className={
              i === 0
                ? "relative h-full w-[58%] -rotate-3 bg-surface p-2 shadow-lift transition-transform duration-700 ease-out-soft group-hover:-rotate-1"
                : "relative hidden h-[78%] w-[42%] rotate-6 bg-surface p-2 shadow-lift transition-transform duration-700 ease-out-soft group-hover:rotate-3 sm:block"
            }
          >
            <ProductImage product={p} sizes="20vw" compact className="size-full" />
          </div>
        ))}
      </div>
    </Link>
  );
}

function ProductRow({ products, label }: { products: Product[]; label: string }) {
  if (products.length === 0) return <p className="text-center text-sm text-ink-2">Chưa có sản phẩm cho danh mục này.</p>;
  return (
    <ScrollRail label={label}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} className={railItem5} />
      ))}
    </ScrollRail>
  );
}

/** "Mua sắm theo danh mục": 2 banner môn võ cạnh nhau, tab viên thuốc và băng chuyền 5 sản phẩm. */
export async function ShopByCategory({ arts, title }: { arts: [string, string]; title?: string }) {
  const results = await Promise.all(arts.map((art) => getProducts({ martial_art: art, sort: "popular", limit: 10 })));
  if (results.some((r) => !r.ok)) {
    return (
      <section className="mx-auto max-w-[1360px] px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        {title && <h2 className={`${sectionTitle} mb-8`}>{title}</h2>}
        <ApiUnavailable />
      </section>
    );
  }
  const lists = results.map((r) => (r.ok ? r.data.items : []));

  return (
    <section className="mx-auto max-w-[1360px] px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20">
      {title && <h2 className={`${sectionTitle} mb-8`}>{title}</h2>}
      <div className="grid gap-4 md:grid-cols-2 lg:gap-5">
        {arts.map((art, i) => (
          <CategoryBanner key={art} artId={art} products={lists[i]} />
        ))}
      </div>
      <div className="mt-10">
        <TabbedPanels
          tabs={arts.map((art, i) => ({
            label: `Sản phẩm ${martialArtLabel(art)}`,
            content: <ProductRow products={lists[i]} label={`Sản phẩm ${martialArtLabel(art)}`} />,
          }))}
        />
      </div>
    </section>
  );
}

export function ShopByCategorySkeleton({ title }: { title?: string }) {
  return (
    <section className="mx-auto max-w-[1360px] px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20" aria-hidden>
      {title && <h2 className={`${sectionTitle} mb-8`}>{title}</h2>}
      <div className="grid gap-4 md:grid-cols-2 lg:gap-5">
        <Skeleton className="h-56 rounded-none sm:h-64 lg:h-[300px]" />
        <Skeleton className="hidden h-56 rounded-none sm:h-64 md:block lg:h-[300px]" />
      </div>
      <div className="mt-10 flex justify-center gap-3">
        <Skeleton className="h-11 w-44 rounded-full" />
        <Skeleton className="h-11 w-44 rounded-full" />
      </div>
      <div className="mt-10 flex gap-5 overflow-hidden">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className={railItem5}>
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    </section>
  );
}
