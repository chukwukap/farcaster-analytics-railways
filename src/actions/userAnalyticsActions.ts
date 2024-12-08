"use server";

import { getFarcasterUser, getFarcasterUserStats } from "~/lib/airstack";

export async function getUserAnalytics(username: string) {
  if (!username) return null;

  try {
    const user = await getFarcasterUser(username);
    if (!user) return null;

    const stats = await getFarcasterUserStats(user.userId);
    if (!stats) return null;

    // Calculate engagement rate
    const totalEngagements =
      stats.likeCount + stats.recastCount + stats.replyCount;
    const engagementRate = (totalEngagements / stats.followerCount) * 100;

    return {
      profile: {
        username,
        displayName: user.profileName,
        followerCount: user.followerCount,
        followingCount: user.followingCount,
        userCreatedAtBlockTimestamp: user.userCreatedAtBlockTimestamp,
        profileImage: user.profileImageContentValue?.image?.small,
      },
      stats: {
        posts: stats.postCount,
        likes: stats.likeCount,
        recasts: stats.recastCount,
        replies: stats.replyCount,
      },
      engagement: Number(engagementRate.toFixed(2)),
      followers: user.followerCount,
      posts: stats.postCount,
    };
  } catch (error) {
    console.error("Error fetching user analytics:", error);
    return null;
  }
}
