import { NextRequest, NextResponse } from "next/server";
import { getUserAnalytics } from "~/lib/analytics";

export const revalidate = 60 * 60 * 24; // 1 day

export async function GET(request: NextRequest) {
  const fid = request.nextUrl.searchParams.get("fid");
  const timeRange =
    (request.nextUrl.searchParams.get("timeRange") as
      | "week"
      | "month"
      | "year"
      | undefined) ?? "week";

  if (!fid) {
    return NextResponse.json({ error: "Fid required" }, { status: 400 });
  }

  try {
    const userAnalytics = await getUserAnalytics(fid, timeRange);
    console.log("userAnalytics", userAnalytics);
    return NextResponse.json(userAnalytics);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
