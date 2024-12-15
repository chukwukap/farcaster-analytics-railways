import React from "react";
import { Metadata } from "next/types";
import InsightsPageClient from "./_components/client";

const appUrl = process.env.NEXT_PUBLIC_URL;

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const frame = {
    version: "next",
    imageUrl: `${appUrl}/opengraph-image`,
    button: {
      title: "View Details",
      action: {
        type: "launch_frame",
        name: "Farcaster Frames v2 Farsight",
        url: appUrl,
        splashImageUrl: `${appUrl}/splash.png`,
        splashBackgroundColor: "#f7f7f7",
      },
    },
  };

  return {
    title: `Analytics for @username`,
    description: `Followers, engagement, and posts for @username`,
    openGraph: {
      title: `Analytics for @username`,
      description: `Followers, engagement, and posts for @username`,
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function InsightsPage() {
  return <InsightsPageClient />;
}
