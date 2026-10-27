"use client";

import { useState } from "react";
import { MARTIAL_ARTS } from "@/lib/catalog";
import { cx } from "@/lib/format";
import type { SizeChartRow } from "@/lib/types";
import { SizeChartTable } from "@/components/product/SizeChartTable";

export function SizeChartTabs({ charts }: { charts: Record<string, SizeChartRow[]> }) {
  const [active, setActive] = useState(MARTIAL_ARTS[0].id);
  return (
    <div>
      <div role="tablist" aria-label="Chọn môn võ" className="no-scrollbar mb-5 flex gap-1 overflow-x-auto rounded-lg bg-muted p-1 sm:inline-flex">
        {MARTIAL_ARTS.map((m) => (
          <button
            key={m.id}
            role="tab"
            type="button"
            aria-selected={active === m.id}
            aria-controls={`chart-${m.id}`}
            onClick={() => setActive(m.id)}
            className={cx(
              "h-9 shrink-0 rounded-md px-4 text-sm font-medium transition-[background-color,color,box-shadow] duration-200 cursor-pointer",
              active === m.id ? "bg-surface text-ink shadow-soft" : "text-ink-2 hover:text-ink"
            )}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div id={`chart-${active}`} role="tabpanel">
        <SizeChartTable rows={charts[active] ?? []} />
      </div>
    </div>
  );
}
