"use client";

import { useEffect, useState } from "react";
import sdk, { type FrameContext } from "@farcaster/frame-sdk";
import { UserAnalytics } from "~/lib/types";
import Image from "next/image";
import { Line } from "react-chartjs-2";
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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function UserInsightsPage() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<FrameContext>();
  const [analytics, setAnalytics] = useState<UserAnalytics | null>(null);

  useEffect(() => {
    const load = async () => {
      setContext(await sdk.context);
      console.log("context", context);

      const response = await fetch(
        `/api/analytics/user?username=${
          context?.user?.username || "chukwukauba"
        }`
      );
      const data = await response.json();
      console.log("analytics", data);
      setAnalytics(data);

      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  if (!analytics) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Loading analytics...
      </div>
    );
  }

  if (!isSDKLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        No analytics data available
      </div>
    );
  }

  const engagementData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Engagement Rate",
        data: [
          analytics.engagement * 0.9,
          analytics.engagement * 1.1,
          analytics.engagement * 0.95,
          analytics.engagement * 1.05,
          analytics.engagement * 1.2,
          analytics.engagement * 0.85,
          analytics.engagement,
        ],
        fill: true,
        borderColor: "rgb(147, 51, 234)",
        backgroundColor: "rgba(147, 51, 234, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
      },
    },
    scales: {
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.6)",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.6)",
        },
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6 pt-24">
      <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-8 shadow-xl border border-gray-800">
        <div className="flex items-center gap-6 mb-8">
          {analytics.profile.profileImage && (
            <div className="relative">
              <Image
                src={context?.user?.pfpUrl ?? ""}
                alt={context?.user?.username ?? ""}
                className="w-20 h-20 rounded-full ring-4 ring-purple-500/20"
                width={80}
                height={80}
                unoptimized
              />
              <div className="absolute -bottom-2 -right-2 bg-purple-500 rounded-full p-1.5">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              @{context?.user?.username}
            </h1>
            <p className="text-gray-400 mt-1">
              Member since{" "}
              {new Date(
                analytics.profile.userCreatedAtBlockTimestamp
              ).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Followers"
            value={analytics.followers.toLocaleString()}
            icon="👥"
          />
          <StatCard
            label="Following"
            value={analytics.profile.followingCount.toLocaleString()}
            icon="🤝"
          />
          <StatCard
            label="Posts"
            value={analytics.posts.toLocaleString()}
            icon="📝"
          />
          <StatCard
            label="Engagement"
            value={`${analytics.engagement}%`}
            icon="✨"
          />
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Weekly Engagement
          </h2>
          <div className="bg-gray-800/50 rounded-xl p-4 h-[300px]">
            <Line data={engagementData} options={chartOptions} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            label="Likes"
            value={analytics.stats.likeCount.toLocaleString()}
            icon="❤️"
          />
          <StatCard
            label="Recasts"
            value={analytics.stats.recastCount.toLocaleString()}
            icon="🔄"
          />
          <StatCard
            label="Replies"
            value={analytics.stats.replyCount.toLocaleString()}
            icon="💬"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xl">{icon}</span>
        <div className="text-gray-400 text-sm font-medium">{label}</div>
      </div>
      <div className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
        {value}
      </div>
    </div>
  );
}
