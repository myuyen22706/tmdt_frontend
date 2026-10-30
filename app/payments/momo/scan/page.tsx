import type { Metadata } from "next";
import { Suspense } from "react";
import { container } from "@/components/ui/styles";
import { MockMomoScan } from "@/components/orders/MockMomoScan";

export const metadata: Metadata = {
  title: "Xác nhận thanh toán MoMo",
  robots: { index: false },
};

export default function MockMomoScanPage() {
  return (
    <main id="noi-dung" className={container}>
      <Suspense fallback={<div className="py-24" />}>
        <MockMomoScan />
      </Suspense>
    </main>
  );
}
