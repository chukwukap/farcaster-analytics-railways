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
            {/* @ts-ignore Server Component */}
            <img
              src={new URL("./icon.png", import.meta.url).toString()}
              width="24"
              height="24"
              alt="Farsight icon"
            />
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
