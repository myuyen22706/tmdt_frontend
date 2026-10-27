"use client";

import { useId, useState, type ReactNode } from "react";
import { cx } from "@/lib/format";
import { pillClass } from "@/components/ui/styles";

/** Tab dạng viên thuốc chuyển giữa các khối nội dung đã render sẵn phía server (không tải lại dữ liệu). */
export function TabbedPanels({ tabs, centered = true }: { tabs: Array<{ label: string; content: ReactNode }>; centered?: boolean }) {
  const [active, setActive] = useState(0);
  const baseId = useId();

  return (
    <div>
      <div role="tablist" className={cx("no-scrollbar flex gap-3 overflow-x-auto pb-1", centered && "sm:justify-center")}>
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            id={`${baseId}-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={active === i}
            aria-controls={`${baseId}-panel-${i}`}
            onClick={() => setActive(i)}
            className={pillClass(active === i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div key={tab.label} id={`${baseId}-panel-${i}`} role="tabpanel" aria-labelledby={`${baseId}-tab-${i}`} hidden={active !== i} className="mt-10">
          {tab.content}
        </div>
      ))}
    </div>
  );
}
