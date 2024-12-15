import { Metadata } from "next";
import LandingPageClient from "./_components/client";
import { appUrl as appUrlConstant } from "~/lib/constants";

const appUrl = appUrlConstant;

const frame = {
  version: "next",
  imageUrl: `${appUrl}/opengraph-image`,
  button: {
    title: "View Analytics",
    action: {
      type: "launch_frame",
      name: "Farsight Analytics",
      url: appUrl,
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#855DCD",
    },
  },
};

export const revalidate = 300; // 5 minutes

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "User Analytics for Farcaster",
    description:
      "Track your casts, understand your audience, and grow your presence on Farcaster. Get detailed insights into your engagement, followers, and content performance.",
    openGraph: {
      title: "Analytics for Farcaster",
      description:
        "Track your casts, understand your audience, and grow your presence on Farcaster. Get detailed insights into your engagement, followers, and content performance.",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return <LandingPageClient />;
}
