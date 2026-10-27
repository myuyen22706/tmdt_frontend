import type { Metadata } from "next";
import { Suspense } from "react";
import { container } from "@/components/ui/styles";
import { CampaignOrder } from "@/components/dojo/CampaignOrder";

export const metadata: Metadata = {
  title: "Đặt đồng phục võ đường",
  robots: { index: false },
};

async function CampaignContent({ params }: Pick<PageProps<"/dojo/[code]">, "params">) {
  const { code } = await params;
  return <CampaignOrder code={decodeURIComponent(code)} />;
}

export default function CampaignPage({ params }: PageProps<"/dojo/[code]">) {
  return (
    <div className={container}>
      <Suspense fallback={<div className="py-24" />}>
        <CampaignContent params={params} />
      </Suspense>
    </div>
  );
}
