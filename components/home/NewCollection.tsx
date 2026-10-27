import Link from "next/link";
import { PlayIcon } from "@phosphor-icons/react/ssr";
import { categoryLabel, martialArtLabel } from "@/lib/catalog";
import { getProducts } from "@/lib/server-data";
import { sectionTitle } from "@/components/ui/styles";
import { Skeleton } from "@/components/ui/Skeleton";
import { ProductImage } from "@/components/product/ProductImage";
import { ScrollRail } from "@/components/home/ScrollRail";
import { railItem4 } from "@/components/home/rail-sizes";

/** Tên ngắn in hoa trên thẻ: bỏ phần lặp lại của loại sản phẩm và môn võ để chữ không tràn. */
function shortTitle(name: string, art: string): string {
  return name.replace(/^(Võ Phục|Đai|Giáp|Mũ|Túi|Balo|Găng|Bảo Hộ|Băng|Côn|Bao)\s+/i, "").replace(new RegExp(`^${art}\\s+`, "i"), "").split(" ").slice(0, 5).join(" ");
}

/** "Bộ sưu tập mới": thẻ nền xám có nhãn môn võ, tiêu đề in hoa lớn, ảnh sản phẩm và nút "Mua ngay". */
export async function NewCollection() {
  const result = await getProducts({ sort: "newest", limit: 10 });
  if (!result.ok || result.data.items.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1360px] px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20" aria-labelledby="bo-suu-tap">
      <div className="mb-8 flex items-end justify-between gap-6">
        <h2 id="bo-suu-tap" className={sectionTitle}>
          Bộ sưu tập mới
        </h2>
        <Link href="/products?sort=newest" className="shrink-0 text-sm font-bold tracking-wide text-heading uppercase hover:text-accent-text">
          Xem tất cả
        </Link>
      </div>
      <ScrollRail label="Bộ sưu tập mới" arrowTop="50%">
        {result.data.items.map((p) => {
          const art = martialArtLabel(p.martial_art_id);
          return (
            <Link key={p.id} href={`/products/${p.slug}`} className={`${railItem4} group flex h-[480px] flex-col items-center bg-muted px-5 pt-7 pb-6 text-center lg:h-[520px]`}>
              <span className="text-xs font-bold tracking-[0.25em] text-accent-text uppercase">
                {art} · {categoryLabel(p.category_id)}
              </span>
              <span className="mt-3 line-clamp-2 text-2xl leading-tight font-bold text-heading uppercase lg:text-[28px]">{shortTitle(p.name, art)}</span>
              <ProductImage
                product={p}
                sizes="(min-width: 1024px) 22vw, 60vw"
                className="my-5 w-full flex-1 bg-transparent transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
              />
              <span className="inline-flex items-center gap-2.5 rounded-sm bg-navy px-6 py-3 text-lg font-bold tracking-wide text-on-navy uppercase transition-colors group-hover:bg-accent">
                Mua ngay <PlayIcon weight="fill" className="size-4" aria-hidden />
              </span>
            </Link>
          );
        })}
      </ScrollRail>
    </section>
  );
}

export function NewCollectionSkeleton() {
  return (
    <section className="mx-auto max-w-[1360px] px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20" aria-hidden>
      <Skeleton className="mb-8 h-9 w-72" />
      <div className="flex gap-5 overflow-hidden">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className={`${railItem4} h-[480px] rounded-none lg:h-[520px]`} />
        ))}
      </div>
    </section>
  );
}
