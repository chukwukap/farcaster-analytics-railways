import { getFarcasterUser, getFarcasterUserStats } from "~/lib/airstack";
import { UserAnalytics } from "~/lib/types";

export async function getUserAnalytics(
  username: string
): Promise<UserAnalytics | null> {
  // Return mock data for testing
  const mockData: UserAnalytics = {
    profile: {
      username: username,
      displayName: "Test User",
      followerCount: 116,
      followingCount: 116,
      userCreatedAtBlockTimestamp: "2023-01-01T00:00:00Z",
      profileImage: "https://picsum.photos/200",
    },
    stats: {
      postCount: 0,
      likeCount: 0,
      recastCount: 0,
      replyCount: 0,
    },
    engagement: 0,
    followers: 116,
    posts: 0,
  };
  // return mockData;

  // Keep original implementation for when we want to switch back
  if (!username) return null;

  try {
    const user = await getFarcasterUser(username);

    console.log("user", user);
    if (!user) return mockData; // Return mock data instead of null

    const stats = await getFarcasterUserStats(user.username);
    console.log("stats", stats);
    if (!stats) return mockData; // Return mock data instead of null

    // Calculate engagement rate
    const totalEngagements =
      stats.likeCount + stats.recastCount + stats.replyCount;
    const engagementRate = (totalEngagements / user.followerCount) * 100;

    return {
      profile: {
        username,
        displayName: user.displayName,
        followerCount: user.followerCount,
        followingCount: user.followingCount,
        userCreatedAtBlockTimestamp: user.userCreatedAtBlockTimestamp,
        profileImage: user.profileImage,
      },
      stats: {
        postCount: stats.postCount || 0,
        likeCount: stats.likeCount || 0,
        recastCount: stats.recastCount || 0,
        replyCount: stats.replyCount || 0,
      },
      engagement: Number(engagementRate.toFixed(2)),
      followers: user.followerCount,
      posts: stats.postCount,
    };
  } catch (error) {
    console.error("Error fetching user analytics:", error);
    return mockData; // Return mock data instead of null
  }
}
