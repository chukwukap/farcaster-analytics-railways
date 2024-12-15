"use client";

import { useEffect, useState } from "react";
import sdk, { type FrameContext } from "@farcaster/frame-sdk";
import { UserAnalytics } from "~/lib/types";
import Image from "next/image";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  BarElement,
  RadialLinearScale,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  BarElement,
  RadialLinearScale
);

export default function UserInsightsPage() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<FrameContext>();
  const [analytics, setAnalytics] = useState<UserAnalytics | null>(null);
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");
  const [activeTab, setActiveTab] = useState<
    "overview" | "engagement" | "content"
  >("overview");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setContext(await sdk.context);
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  useEffect(() => {
    const fetchAnalytics = async (fid: number) => {
      setLoading(true);
      const response = await fetch(
        `/api/analytics/user?fid=${fid}&timeRange=${timeRange}`
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setAnalytics(data);
      }
      setLoading(false);
    };

    if (isSDKLoaded && context?.user?.fid) {
      fetchAnalytics(context.user.fid);
    }
  }, [isSDKLoaded, timeRange, context?.user?.fid]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-violet-500/20">
              <h3 className="text-xl font-semibold text-gray-100 mb-6">
                Channel Distribution
              </h3>
              <div className="h-[300px]">
                <Doughnut
                  data={{
                    labels: analytics?.activityStats.mostUsedChannels.map(
                      (c) => c.channelId
                    ),
                    datasets: [
                      {
                        data: analytics?.activityStats.mostUsedChannels.map(
                          (c) => c.count
                        ),
                        backgroundColor: [
                          "rgba(167, 139, 250, 0.8)",
                          "rgba(244, 114, 182, 0.8)",
                          "rgba(34, 211, 238, 0.8)",
                          "rgba(147, 51, 234, 0.8)",
                          "rgba(99, 102, 241, 0.8)",
                        ],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/20">
              <h3 className="text-xl font-semibold text-gray-100 mb-6">
                Most Liked Content
              </h3>
              <div className="space-y-4">
                {analytics?.engagementMetrics.mostLikedContent
                  .slice(0, 3)
                  .map((content, idx) => (
                    <div key={idx} className="bg-slate-700/30 rounded-lg p-4">
                      <p className="text-gray-200 line-clamp-2">
                        {content.text}
                      </p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-400">
                        <span>❤️ {content.likes}</span>
                        <span>🔄 {content.recasts}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        );

      case "engagement":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-violet-500/20">
              <h3 className="text-xl font-semibold text-gray-100 mb-6">
                Engagement Overview
              </h3>
              <div className="space-y-4">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-violet-400">
                      Average Likes per Cast
                    </span>
                    <span className="text-gray-300">
                      {analytics?.activityStats.averageLikesPerCast}
                    </span>
                  </div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-violet-400">
                      Average Recasts per Cast
                    </span>
                    <span className="text-gray-300">
                      {analytics?.activityStats.averageRecastsPerCast}
                    </span>
                  </div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-violet-400">Like Ratio</span>
                    <span className="text-gray-300">
                      {analytics?.engagementMetrics.likeRatio}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
              <h3 className="text-xl font-semibold text-gray-100 mb-6">
                Like Activity
              </h3>
              <div className="space-y-4">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-violet-400">Given Likes</span>
                    <span className="text-gray-300">
                      {analytics?.engagementMetrics.givenLikes}
                    </span>
                  </div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-violet-400">Received Likes</span>
                    <span className="text-gray-300">
                      {analytics?.engagementMetrics.receivedLikes}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "content":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-violet-500/20">
              <h3 className="text-xl font-semibold text-gray-100 mb-6">
                Content Stats
              </h3>
              <div className="space-y-4">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-violet-400">Total Casts</span>
                    <span className="text-gray-300">
                      {analytics?.activityStats.totalCasts}
                    </span>
                  </div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-violet-400">Total Likes</span>
                    <span className="text-gray-300">
                      {analytics?.activityStats.totalLikes}
                    </span>
                  </div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-violet-400">Total Recasts</span>
                    <span className="text-gray-300">
                      {analytics?.activityStats.totalRecasts}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/20">
              <h3 className="text-xl font-semibold text-gray-100 mb-6">
                Top Performing Casts
              </h3>
              <div className="space-y-4">
                {analytics?.trendingContent.topPerformingCasts
                  .slice(0, 3)
                  .map((cast, idx) => (
                    <div key={idx} className="bg-slate-700/30 rounded-lg p-4">
                      <p className="text-gray-200 line-clamp-2">{cast.text}</p>
                      <div className="mt-2 text-sm text-gray-400">
                        Cast Value: {Number(cast.castValue).toFixed(4)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0A0F1E]">
        <div className="flex flex-col items-center animate-fade-in">
          <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-violet-400 font-semibold text-lg">
            Analyzing your Farcaster presence...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0A0F1E]">
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-red-500/20 text-center">
          <svg
            className="w-16 h-16 mx-auto text-red-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h1 className="text-xl font-semibold text-red-400">
            Unable to Load Analytics
          </h1>
          <p className="text-gray-400 mt-2">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1E] py-8">
      <div className="w-full max-w-7xl mx-auto px-4 space-y-6">
        {/* Profile Header */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl p-8 border border-violet-500/20 shadow-lg shadow-violet-500/10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-400 rounded-full opacity-75 blur-lg group-hover:opacity-100 transition duration-500"></div>
              <Image
                src={analytics?.profile.profileImage || ""}
                alt={analytics?.profile.username || ""}
                className="relative w-32 h-32 rounded-full object-cover border-4 border-slate-900"
                width={128}
                height={128}
                unoptimized
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                @{analytics?.profile.username || ""}
              </h1>
              <p className="mt-2 text-gray-400">
                {analytics?.profile.bio || ""}
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <MetricPill
                  label="Total Casts"
                  value={analytics?.activityStats.totalCasts || 0}
                />
                <MetricPill
                  label="Total Likes"
                  value={analytics?.activityStats.totalLikes || 0}
                />
                <MetricPill
                  label="Total Recasts"
                  value={analytics?.activityStats.totalRecasts || 0}
                />
                <MetricPill
                  label="Followers"
                  value={analytics?.profile.followerCount || 0}
                />
                <MetricPill
                  label="Following"
                  value={analytics?.profile.followingCount || 0}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {(["overview", "engagement", "content"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                ${
                  activeTab === tab
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                    : "bg-slate-800/40 text-gray-400 hover:bg-slate-700/40"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Time Range Selector */}
        <div className="flex justify-end gap-4 mb-6">
          {(["week", "month", "year"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-300
                ${
                  timeRange === range
                    ? "bg-violet-600/20 text-violet-400 border border-violet-500/50"
                    : "text-gray-400 hover:text-violet-400"
                }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>

        {/* Dynamic Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
}

function MetricPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="px-4 py-2 bg-slate-800/40 rounded-full border border-slate-700/50">
      <span className="text-gray-400 text-sm">{label}:</span>
      <span className="ml-2 text-white font-semibold">
        {value.toLocaleString()}
      </span>
    </div>
  );
}
