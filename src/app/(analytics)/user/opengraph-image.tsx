import { ImageResponse } from "next/og";

export const alt = "Farsight User Analytics";
export const size = {
  width: 600,
  height: 400,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div tw="h-full w-full flex flex-col justify-center items-center relative bg-white">
        <h1 tw="text-6xl">Farsight</h1>
      </div>
    ),
    {
      ...size,
    }
  );
}