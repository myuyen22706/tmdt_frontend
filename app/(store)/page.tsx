import { Suspense } from "react";
import { HeroFallback, HeroSlides } from "@/components/home/HeroSlides";
import { CategoryCircles } from "@/components/home/CategoryCircles";
import { BeltGrid } from "@/components/home/BeltGrid";
import { ShopByCategory, ShopByCategorySkeleton } from "@/components/home/ShopByCategory";
import { CompleteTheLook, CompleteTheLookSkeleton } from "@/components/home/CompleteTheLook";
import { TodayDeals, TodayDealsSkeleton } from "@/components/home/TodayDeals";
import { NewCollection, NewCollectionSkeleton } from "@/components/home/NewCollection";
import { NewsSection, NewsSectionSkeleton } from "@/components/home/NewsSection";

/**
 * Trang chủ theo bố cục cửa hàng thể thao đa danh mục:
 * banner chạy, danh mục tròn, cấp đai, mua theo môn võ (2 lượt), bộ trang bị, ưu đãi, bộ sưu tập mới, cẩm nang.
 */
export default function HomePage() {
  return (
    <>
      <Suspense fallback={<HeroFallback />}>
        <HeroSlides />
      </Suspense>

      <CategoryCircles />

      <Suspense fallback={null}>
        <BeltGrid />
      </Suspense>

      <Suspense fallback={<ShopByCategorySkeleton title="Mua sắm theo môn võ" />}>
        <ShopByCategory arts={["vovinam", "taekwondo"]} title="Mua sắm theo môn võ" />
      </Suspense>

      <Suspense fallback={<ShopByCategorySkeleton />}>
        <ShopByCategory arts={["karate", "vo_co_truyen"]} />
      </Suspense>

      <Suspense fallback={<CompleteTheLookSkeleton />}>
        <CompleteTheLook />
      </Suspense>

      <Suspense fallback={<TodayDealsSkeleton />}>
        <TodayDeals />
      </Suspense>

      <Suspense fallback={<NewCollectionSkeleton />}>
        <NewCollection />
      </Suspense>

      <Suspense fallback={<NewsSectionSkeleton />}>
        <NewsSection />
      </Suspense>
    </>
  );
}
