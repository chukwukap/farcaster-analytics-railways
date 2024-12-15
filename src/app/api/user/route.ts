import { NextRequest, NextResponse } from "next/server";
import { getUserDetails } from "~/lib/airstack";

export async function GET(request: NextRequest) {
  const fid = request.nextUrl.searchParams.get("fid");
  if (!fid) {
    return NextResponse.json({ error: "Fid is required" }, { status: 400 });
  }
  const userDetails = await getUserDetails(fid);
  return NextResponse.json(userDetails);
}
