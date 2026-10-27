import Link from "next/link";
import { discountPercent, martialArtLabel } from "@/lib/catalog";
import { cx } from "@/lib/format";
import type { Product } from "@/lib/types";
import { Price } from "@/components/ui/Price";
import { ProductImage } from "@/components/product/ProductImage";
import { QuickAdd } from "@/components/product/QuickAdd";

interface ProductCardProps {
  product: Product;
  preload?: boolean;
  className?: string;
  sizes?: string;
}

/** Thẻ sản phẩm: ô ảnh vuông nền xám, nhãn % giảm góc phải, tên 2 dòng, giá giảm màu đỏ. */
export function ProductCard({ product, preload, className, sizes = "(min-width: 1280px) 19vw, (min-width: 1024px) 23vw, (min-width: 768px) 31vw, 46vw" }: ProductCardProps) {
  const href = `/products/${product.slug}`;
  const percent = discountPercent(product);
  const sizeCount = product.variants.filter((v) => v.size !== "Freesize").length;

  return (
    <article className={cx("group relative flex flex-col", className)}>
      <div className="relative">
        <Link href={href} className="block overflow-hidden" tabIndex={-1} aria-hidden>
          <ProductImage
            product={product}
            sizes={sizes}
            preload={preload}
            className="aspect-square w-full transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
          />
        </Link>
        {percent > 0 && (
          <span className="absolute top-3 right-3 rounded-sm bg-accent px-2 py-0.5 text-xs font-bold text-on-accent tabular">- {percent}%</span>
        )}
        {!product.in_stock && (
          <span className="absolute top-3 left-3 rounded-sm bg-navy px-2 py-0.5 text-xs font-bold text-on-navy">Hết hàng</span>
        )}
        <QuickAdd product={product} />
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <p className="text-[13px] text-ink-3">
          {martialArtLabel(product.martial_art_id)}
          {sizeCount > 0 ? `, ${sizeCount} size` : ", một cỡ"}
          {product.is_customizable ? ", nhận thêu tên" : ""}
        </p>
        <h3 className="mt-1 text-[15px] leading-snug text-ink">
          <Link href={href} className="line-clamp-2 min-h-[2.75em] hover:text-accent-text">
            {product.name}
          </Link>
        </h3>
        <Price price={product.price} originalPrice={product.original_price} size="sm" showPercent={false} className="mt-3" />
      </div>
    </article>
  );
}
