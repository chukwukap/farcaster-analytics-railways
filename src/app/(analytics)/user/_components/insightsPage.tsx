"use client";

import { useEffect, useState } from "react";
import sdk, { type FrameContext } from "@farcaster/frame-sdk";
import { UserAnalytics } from "~/lib/types";
import { getUserAnalytics } from "~/actions/userAnalyticsActions";
import Image from "next/image";

export default function UserInsightsPage() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<FrameContext>();
  const [analytics, setAnalytics] = useState<UserAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const frameContext = await sdk.context;
        setContext(frameContext);

        if (frameContext?.user?.username) {
          const data = await getUserAnalytics(frameContext.user.username);
          setAnalytics(data);
        }

        await sdk.actions.ready();
      } catch (error) {
        console.error("Error loading analytics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  if (isLoading) {
    return <div>Loading analytics...</div>;
  }

  if (!analytics) {
    return <div>No analytics data available</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="bg-gray-900 rounded-lg p-6">
        <div>hello</div>
        <div className="flex items-center gap-4 mb-6">
          {analytics.profile.profileImage && (
            <Image
              src={context?.user?.pfpUrl ?? ""}
              alt={context?.user?.username ?? ""}
              className="w-16 h-16 rounded-full"
              width={64}
              height={64}
            />
          )}
          <div>
            <h1 className="text-2xl font-bold">@{context?.user?.username}</h1>
            <p className="text-gray-400">
              Member since{" "}
              {new Date(
                analytics.profile.userCreatedAtBlockTimestamp
              ).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            label="Followers"
            value={analytics.followers.toLocaleString()}
          />
          <StatCard
            label="Following"
            value={analytics.profile.followingCount.toLocaleString()}
          />
          <StatCard label="Posts" value={analytics.posts.toLocaleString()} />
          <StatCard label="Engagement" value={`${analytics.engagement}%`} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            label="Likes"
            value={analytics.stats.likes.toLocaleString()}
          />
          <StatCard
            label="Recasts"
            value={analytics.stats.recasts.toLocaleString()}
          />
          <StatCard
            label="Replies"
            value={analytics.stats.replies.toLocaleString()}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="text-gray-400 text-sm">{label}</div>
      <div className="text-xl font-bold mt-1">{value}</div>
    </div>
  );
}
