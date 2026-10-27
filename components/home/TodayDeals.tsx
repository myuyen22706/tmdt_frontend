import Link from "next/link";
import { PlayIcon, TicketIcon, TruckIcon, UsersThreeIcon } from "@phosphor-icons/react/ssr";
import { DOJO_TIERS, FREESHIP_THRESHOLD } from "@/lib/catalog";
import { cx, formatVND } from "@/lib/format";
import { getActiveVouchers } from "@/lib/server-data";
import { sectionTitle } from "@/components/ui/styles";
import { Skeleton } from "@/components/ui/Skeleton";
import { CopyCodeButton } from "@/components/home/CopyCodeButton";
import { ScrollRail } from "@/components/home/ScrollRail";
import { railItem3 } from "@/components/home/rail-sizes";

const tile = "relative flex h-[300px] flex-col justify-between overflow-hidden p-7 lg:h-[340px]";

/** "Ưu đãi hôm nay": banner mã giảm giá đang hiệu lực (lấy từ backend) cùng ưu đãi giao hàng và giá sỉ võ đường. */
export async function TodayDeals() {
  const result = await getActiveVouchers();
  const vouchers = result.ok ? result.data : [];
  const bestDojo = DOJO_TIERS[DOJO_TIERS.length - 1];

  return (
    <section id="uu-dai" className="mx-auto max-w-[1360px] scroll-mt-24 px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20" aria-labelledby="uu-dai-title">
      <h2 id="uu-dai-title" className={`${sectionTitle} mb-8`}>
        Ưu đãi hôm nay
      </h2>
      <ScrollRail label="Ưu đãi hôm nay" arrowTop="50%">
        {vouchers.map((v, i) => (
          <article key={v.code} className={cx(railItem3, tile, i % 2 === 0 ? "bg-navy text-on-navy" : "grid-paper text-ink")}>
            <TicketIcon weight="thin" className={cx("absolute -right-6 -bottom-8 size-56 rotate-[-18deg]", i % 2 === 0 ? "text-on-navy/10" : "text-navy/10")} aria-hidden />
            <div className="relative">
              <p className={cx("text-sm font-semibold tracking-widest uppercase", i % 2 === 0 ? "text-accent-on-navy" : "text-accent-text")}>Mã giảm giá</p>
              <p className="mt-3 text-5xl leading-none font-bold uppercase italic lg:text-6xl">
                Giảm {v.discount_type === "PERCENT" ? `${v.discount_value}%` : formatVND(v.discount_value)}
              </p>
              <p className={cx("mt-3 text-[15px]", i % 2 === 0 ? "text-on-navy-2" : "text-ink-2")}>Cho đơn hàng từ {formatVND(v.min_order_amount)}</p>
            </div>
            <div className="relative flex flex-wrap items-center gap-3">
              <span className={cx("rounded-sm border-2 border-dashed px-3 py-1.5 text-lg font-bold tracking-widest", i % 2 === 0 ? "border-on-navy/40" : "border-navy/30")}>{v.code}</span>
              <CopyCodeButton code={v.code} onDark={i % 2 === 0} />
            </div>
          </article>
        ))}

        <Link href="/products" className={cx(railItem3, tile, "group bg-accent text-on-accent")}>
          <TruckIcon weight="thin" className="absolute -right-4 -bottom-6 size-56 text-on-accent/15" aria-hidden />
          <div className="relative">
            <p className="text-sm font-semibold tracking-widest uppercase">Giao hàng toàn quốc</p>
            <p className="mt-3 text-5xl leading-none font-bold uppercase italic lg:text-6xl">Miễn phí giao hàng</p>
            <p className="mt-3 text-[15px]">Cho đơn từ {formatVND(FREESHIP_THRESHOLD)}, không cần mã.</p>
          </div>
          <span className="relative inline-flex items-center gap-2 text-lg font-bold uppercase">
            Mua ngay <PlayIcon weight="fill" className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </span>
        </Link>

        <Link href="/dojos" className={cx(railItem3, tile, "group bg-band text-ink")}>
          <UsersThreeIcon weight="thin" className="absolute -right-4 -bottom-6 size-56 text-navy/10" aria-hidden />
          <div className="relative">
            <p className="text-sm font-semibold tracking-widest text-accent-text uppercase">Võ đường, câu lạc bộ</p>
            <p className="mt-3 text-5xl leading-none font-bold text-heading uppercase italic lg:text-6xl">Giá sỉ đến {bestDojo.discount}%</p>
            <p className="mt-3 text-[15px] text-ink-2">Đặt đồng phục từ 10 bộ, phụ huynh tự chọn size cho con.</p>
          </div>
          <span className="relative inline-flex items-center gap-2 text-lg font-bold text-heading uppercase">
            Đăng ký võ đường <PlayIcon weight="fill" className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </span>
        </Link>
      </ScrollRail>
    </section>
  );
}

export function TodayDealsSkeleton() {
  return (
    <section className="mx-auto max-w-[1360px] px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20" aria-hidden>
      <Skeleton className="mb-8 h-9 w-64" />
      <div className="flex gap-5 overflow-hidden">
        {Array.from({ length: 3 }, (_, i) => (
          <Skeleton key={i} className={`${railItem3} h-[300px] rounded-none lg:h-[340px]`} />
        ))}
      </div>
    </section>
  );
}
