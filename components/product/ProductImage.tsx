"use client";

import Image from "next/image";
import { useState } from "react";
import { BackpackIcon, BoxingGloveIcon, CoatHangerIcon, SealCheckIcon, SparkleIcon } from "@phosphor-icons/react";
import { cx } from "@/lib/format";
import { categoryLabel, martialArtLabel, productImageSrc } from "@/lib/catalog";
import type { Product } from "@/lib/types";

const CATEGORY_ICON: Record<string, typeof CoatHangerIcon> = {
  vo_phuc: CoatHangerIcon,
  dai: SealCheckIcon,
  bao_ho: BoxingGloveIcon,
  tui_dung: BackpackIcon,
  phu_kien: SparkleIcon,
};

interface ProductImageProps {
  product: Pick<Product, "thumbnail" | "slug" | "name" | "category_id" | "martial_art_id">;
  sizes: string;
  className?: string;
  preload?: boolean;
  compact?: boolean;
}

/**
 * Ảnh sản phẩm có ô thay thế: ô biểu tượng theo loại sản phẩm luôn nằm bên dưới,
 * ảnh thật chỉ hiện khi tải xong. Thả file vào /public/images/products/{slug}.jpg là ảnh tự xuất hiện.
 * Ảnh URL ngoài (quản trị nhập) bỏ qua bộ tối ưu ảnh để không phụ thuộc danh sách tên miền cho phép.
 */
export function ProductImage({ product, sizes, className, preload, compact }: ProductImageProps) {
  const src = productImageSrc(product);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const Icon = CATEGORY_ICON[product.category_id] ?? CoatHangerIcon;

  return (
    <div className={cx("relative overflow-hidden bg-muted", className)}>
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink-3" aria-hidden>
          <Icon weight="thin" className={compact ? "size-7" : "size-16"} />
          {!compact && (
            <span className="text-xs">
              {categoryLabel(product.category_id)} {martialArtLabel(product.martial_art_id)}
            </span>
          )}
        </div>
      )}
      {src && !failed && (
        <Image
          src={src}
          alt={product.name}
          fill
          sizes={sizes}
          preload={preload}
          unoptimized={src.startsWith("http")}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cx(
            "object-cover transition-[opacity,transform] duration-500 ease-out-soft",
            loaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
}
