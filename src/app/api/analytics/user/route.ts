import { NextRequest, NextResponse } from "next/server";
import { getUserAnalytics } from "~/actions/userAnalyticsActions";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");
  console.log("username", username);

  if (!username) {
    return NextResponse.json(
      { error: "Username parameter is required" },
      { status: 400 }
    );
  }

  try {
    const analytics = await getUserAnalytics(username);

    if (!analytics) {
      return NextResponse.json(
        { error: "User analytics not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(analytics);
  } catch (error) {
    console.error("Error fetching user analytics:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
