import { ImageResponse } from "next/og";

export const alt = "Farsight - Analytics for Farcaster";
export const size = {
  width: 600,
  height: 400,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div tw="h-full w-full flex flex-col justify-center items-center relative bg-[#0F0F0F]">
        <div tw="flex items-center gap-3 mb-6">
          <div tw="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
          </div>
        </div>
        <p tw="text-xl text-gray-300 mb-3">Analytics for Farcaster</p>
        <p tw="text-sm text-gray-400 max-w-md text-center">
          Track your casts, understand your audience, and grow your presence
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
