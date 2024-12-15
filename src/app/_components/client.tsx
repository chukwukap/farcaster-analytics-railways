"use client";

import dynamic from "next/dynamic";

const UserInsightsPage = dynamic(
  () => import("../frames/(analytics)/user/_components/insightsPage"),
  {
    ssr: false,
  }
);

export default function LandingPageClient() {
  return <UserInsightsPage />;
}
