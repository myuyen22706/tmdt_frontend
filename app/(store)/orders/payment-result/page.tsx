import type { Metadata } from "next";
import { Suspense } from "react";
import { container } from "@/components/ui/styles";
import { PaymentResult } from "@/components/orders/PaymentResult";

export const metadata: Metadata = {
  title: "Kết quả thanh toán",
  robots: { index: false },
};

export default function PaymentResultPage() {
  return (
    <div className={container}>
      <Suspense fallback={<div className="py-24" />}>
        <PaymentResult />
      </Suspense>
    </div>
  );
}
