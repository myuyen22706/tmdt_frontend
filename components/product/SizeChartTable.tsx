import { cx } from "@/lib/format";
import type { SizeChartRow } from "@/lib/types";

const range = (min?: number | null, max?: number | null, unit = "") =>
  min != null && max != null ? `${Math.round(min)} - ${Math.round(max)}${unit}` : "";

export function SizeChartTable({ rows, className }: { rows: SizeChartRow[]; className?: string }) {
  if (rows.length === 0) return <p className="text-sm text-ink-2">Bảng size đang được cập nhật. Gọi hotline để được tư vấn.</p>;

  return (
    <div className={cx("overflow-x-auto rounded-md border border-line", className)}>
      <table className="w-full min-w-[560px] text-left text-sm">
        <caption className="sr-only">Bảng size theo chiều cao và cân nặng</caption>
        <thead className="bg-muted text-[13px] text-ink-2">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium">Size</th>
            <th scope="col" className="px-4 py-3 font-medium">Chiều cao (cm)</th>
            <th scope="col" className="px-4 py-3 font-medium">Cân nặng (kg)</th>
            <th scope="col" className="px-4 py-3 font-medium">Phù hợp</th>
          </tr>
        </thead>
        <tbody className="bg-surface">
          {rows.map((row, i) => (
            <tr key={row.size} className={cx(i % 2 === 1 && "bg-bg")}>
              <th scope="row" className="px-4 py-3 font-semibold text-ink">{row.size}</th>
              <td className="px-4 py-3 text-ink-2 tabular">{range(row.height_min_cm, row.height_max_cm)}</td>
              <td className="px-4 py-3 text-ink-2 tabular">{range(row.weight_min_kg, row.weight_max_kg)}</td>
              <td className="px-4 py-3 text-ink-2">{row.fit_note ?? row.age_range ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
