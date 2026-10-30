import type { Metadata } from "next";
import { Suspense } from "react";
import { container } from "@/components/ui/styles";
import { MockMomoGateway } from "@/components/orders/MockMomoGateway";

export const metadata: Metadata = {
  title: "Thanh toán MoMo",
  robots: { index: false },
};

/** Nằm ngoài nhóm (store) để không có header, chân trang như một cổng thanh toán riêng. */
export default function MockMomoPage() {
  return (
    <main id="noi-dung" className={container}>
      <Suspense fallback={<div className="py-24" />}>
        <MockMomoGateway />
      </Suspense>
    </main>
  );
}
