import type { CatalogQuery } from "@/lib/server-data";

type Patch = Partial<Record<keyof CatalogQuery, string | number | undefined | null>>;

/** Tạo URL /products giữ nguyên bộ lọc hiện tại, áp bản vá và quay về trang 1 khi đổi bộ lọc. */
export function catalogHref(current: CatalogQuery, patch: Patch = {}): string {
  const next: Record<string, string | number | undefined | null> = {
    martial_art: current.martial_art,
    category: current.category,
    belt_rank: current.belt_rank,
    price: current.price,
    search: current.search,
    sort: current.sort,
    page: undefined,
    ...patch,
  };
  if (!("page" in patch)) next.page = undefined;
  if (next.sort === "popular") next.sort = undefined;
  if (next.page === 1 || next.page === "1") next.page = undefined;

  const sp = new URLSearchParams();
  for (const [key, value] of Object.entries(next)) {
    if (value !== undefined && value !== null && value !== "") sp.set(key, String(value));
  }
  const qs = sp.toString();
  return qs ? `/products?${qs}` : "/products";
}

export function hasActiveFilters(q: CatalogQuery): boolean {
  return Boolean(q.martial_art || q.category || q.belt_rank || q.price || q.search);
}
