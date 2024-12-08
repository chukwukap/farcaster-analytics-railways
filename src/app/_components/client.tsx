"use client";

import dynamic from "next/dynamic";

const LandingPage = dynamic(() => import("./landingPage"), {
  ssr: false,
});

export default function LandingPageClient() {
  return <LandingPage />;
}
