import type { Metadata } from "next";
import { Suspense } from "react";
import { container } from "@/components/ui/styles";
import { Skeleton } from "@/components/ui/Skeleton";
import { OrderDetail } from "@/components/orders/OrderDetail";

export const metadata: Metadata = {
  title: "Chi tiết đơn hàng",
  robots: { index: false },
};

async function OrderContent({ params, searchParams }: Pick<PageProps<"/orders/[code]">, "params" | "searchParams">) {
  const [{ code }, query] = await Promise.all([params, searchParams]);
  return <OrderDetail code={decodeURIComponent(code)} justPlaced={query.placed === "1"} />;
}

export default function OrderPage(props: PageProps<"/orders/[code]">) {
  return (
    <div className={container}>
      <Suspense
        fallback={
          <div className="flex flex-col gap-4 py-10">
            <Skeleton className="h-9 w-72" />
            <Skeleton className="h-20 rounded-md" />
          </div>
        }
      >
        <OrderContent params={props.params} searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}
