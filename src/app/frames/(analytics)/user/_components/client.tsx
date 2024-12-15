"use client";

import dynamic from "next/dynamic";

const InsightsPage = dynamic(() => import("./insightsPage"), {
  ssr: false,
});

export default function InsightsPageClient() {
  return <InsightsPage />;
}
