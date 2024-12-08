import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#1C1C1C]">
      {/* Hero Section */}
      <section className="relative px-4 pt-24 sm:pt-32 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="flex flex-col items-center text-center">
            {/* Warpcast Badge */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 mb-8">
              <Image
                src="/warpcast.svg"
                alt="Warpcast Logo"
                className="h-6 w-6"
              />
              <span className="text-sm text-purple-400 font-medium">
                Official Analytics Partner
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight mb-6">
              Far<span className="text-purple-500">sight</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl sm:text-2xl md:text-3xl font-light text-gray-200 max-w-2xl mx-auto leading-relaxed mb-4">
              Native analytics for{" "}
              <span className="font-semibold text-purple-400">Farcaster</span>
            </p>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto mb-12">
              Track your casts, understand your audience, and grow your presence
              on Farcaster.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col w-full sm:flex-row justify-center gap-4 sm:gap-6 max-w-md mx-auto">
              <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-purple-600 text-white font-medium transition-all duration-200 hover:bg-purple-700 active:scale-95">
                Connect with Warpcast
              </button>
              <Link
                href="/user"
                className="w-full sm:w-auto px-6 py-3 rounded-lg border border-gray-700 text-gray-300 font-medium hover:bg-gray-800 transition-colors text-center"
              >
                View Analytics
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {[
                { label: "Active Users", value: "250K+" },
                { label: "Casts Analyzed", value: "12M+" },
                { label: "Daily Insights", value: "500K+" },
                { label: "Channels", value: "1000+" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-gray-800/30 border border-gray-700/50"
                >
                  <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
