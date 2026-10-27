import Link from "next/link";
import { CaretRightIcon } from "@phosphor-icons/react/ssr";
import { BELT_RANKS } from "@/lib/catalog";
import { cx } from "@/lib/format";
import { getFacets } from "@/lib/server-data";
import { sectionTitle } from "@/components/ui/styles";

/** Màu dây đai (dữ liệu hiển thị, không phải màu giao diện) */
const BELT_COLOR: Record<string, string> = {
  dai_trang: "bg-[#f7f7f7] ring-1 ring-black/15",
  lam_dai: "bg-[#1f5fbf]",
  hoang_dai: "bg-[#f1c40f]",
  dai_vang: "bg-[#e0a800]",
  dai_do: "bg-[#c8322b]",
  dai_den: "bg-[#1b1b1f]",
};

/** "Mua theo cấp đai": lưới ô xám như khu thương hiệu nổi bật, ô cuối dẫn tới toàn bộ sản phẩm. */
export async function BeltGrid() {
  const facets = await getFacets();
  const counts = facets.ok ? facets.data.belt_ranks : {};
  const total = facets.ok ? facets.data.total : null;

  return (
    <section className="mx-auto max-w-[1360px] px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20" aria-labelledby="cap-dai">
      <h2 id="cap-dai" className={sectionTitle}>
        Mua theo cấp đai
      </h2>
      <ul className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {BELT_RANKS.map((belt) => (
          <li key={belt.id}>
            <Link
              href={`/products?belt_rank=${belt.id}`}
              className="group flex h-36 flex-col items-center justify-center gap-4 bg-muted px-4 transition-colors hover:bg-band"
            >
              <span className="relative flex w-24 items-center justify-center" aria-hidden>
                <span className={cx("h-3.5 w-full rounded-[2px] transition-transform duration-500 ease-out-soft group-hover:scale-x-110", BELT_COLOR[belt.id])} />
                <span className={cx("absolute size-6 rotate-45 rounded-[3px] shadow-soft", BELT_COLOR[belt.id])} />
              </span>
              <span className="text-center">
                <span className="block text-[15px] font-bold tracking-wide text-heading uppercase">{belt.label}</span>
                {counts[belt.id] !== undefined && <span className="text-[13px] text-ink-3">{counts[belt.id]} sản phẩm</span>}
              </span>
            </Link>
          </li>
        ))}
        <li className="col-span-2 sm:col-span-4 lg:col-span-1">
          <Link
            href="/products"
            className="flex h-36 items-center justify-center gap-1.5 bg-muted px-4 text-center text-[15px] font-bold tracking-wide text-heading uppercase transition-colors hover:bg-navy hover:text-on-navy"
          >
            {total !== null ? `Tất cả ${total} sản phẩm` : "Tất cả sản phẩm"}
            <CaretRightIcon weight="bold" className="size-4" aria-hidden />
          </Link>
        </li>
      </ul>
    </section>
  );
}
