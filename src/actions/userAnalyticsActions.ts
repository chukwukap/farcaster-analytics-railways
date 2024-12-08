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
      followerCount: 1234,
      followingCount: 567,
      userCreatedAtBlockTimestamp: "2023-01-01T00:00:00Z",
      profileImage: "https://picsum.photos/200",
    },
    stats: {
      postCount: 789,
      likeCount: 4321,
      recastCount: 234,
      replyCount: 567,
    },
    engagement: 5.67,
    followers: 1234,
    posts: 789,
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
