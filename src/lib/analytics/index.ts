import {
  getFarcasterUserCasts,
  getFarcasterUserReactions,
  getUserDetails,
  getUserTrendingCasts,
} from "../airstack";
import { UserAnalytics } from "../types";

export async function getUserAnalytics(
  fid: number,
  timeRange: "week" | "month" | "year"
): Promise<UserAnalytics | null> {
  if (!fid) return null;
  console.log(timeRange);

  try {
    const [userDetails, userCasts, userReactions, trendingCasts] =
      await Promise.all([
        getUserDetails(fid),
        getFarcasterUserCasts(fid),
        getFarcasterUserReactions(fid),
        getUserTrendingCasts(fid),
      ]);

    const social = userDetails.Socials.Social[0];
    const casts = userCasts.FarcasterCasts.Cast;
    // const casts: FarcasterUserCasts["FarcasterCasts"]["Cast"] = [];

    const reactions = userReactions.FarcasterReactions.Reaction;
    const trending = trendingCasts.TrendingCasts.TrendingCast || [];

    // Channel analytics
    const channelCounts = casts.reduce((acc: Record<string, number>, cast) => {
      const channelId = cast?.channel?.channelId;
      if (channelId) {
        acc[channelId] = (acc[channelId] || 0) + 1;
      }
      return acc;
    }, {});

    const mostUsedChannels = Object.entries(channelCounts)
      .map(([channelId, count]) => ({ channelId, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Cast engagement metrics
    const totalLikes = casts.reduce((sum, cast) => sum + cast.numberOfLikes, 0);
    const totalRecasts = casts.reduce(
      (sum, cast) => sum + cast.numberOfRecasts,
      0
    );
    const averageLikesPerCast = casts.length ? totalLikes / casts.length : 0;
    const averageRecastsPerCast = casts.length
      ? totalRecasts / casts.length
      : 0;

    // User engagement analysis
    const givenLikes = reactions.length;
    const receivedLikes = totalLikes;
    const likeRatio = givenLikes
      ? Number((receivedLikes / givenLikes).toFixed(2))
      : 0;

    // Most liked content analysis
    const mostLikedContent = casts
      .sort((a, b) => b.numberOfLikes - a.numberOfLikes)
      .slice(0, 5)
      .map((cast) => ({
        text: cast.text,
        likes: cast.numberOfLikes,
        recasts: cast.numberOfRecasts,
      }));

    // Trending content analysis
    const topPerformingCasts = trending.map((cast) => ({
      text: cast.cast.text,
      criteriaCount: cast.criteriaCount,
      castValue: cast.castValueFormatted,
      timeFrame: {
        from: cast.timeFrom,
        to: cast.timeTo,
      },
    }));

    return {
      profile: {
        username: social.profileName,
        displayName: social.profileDisplayName,
        bio: social.profileBio,
        followerCount: social.followerCount,
        followingCount: social.followingCount,
        profileImage: social.profileImage,
        userCreatedAtTimestamp: social.userCreatedAtBlockTimestamp,
        associatedAddresses: social.userAssociatedAddresses,
      },
      activityStats: {
        totalCasts: casts.length,
        totalLikes,
        totalRecasts,
        averageLikesPerCast: Number(averageLikesPerCast.toFixed(2)),
        averageRecastsPerCast: Number(averageRecastsPerCast.toFixed(2)),
        mostUsedChannels,
      },
      engagementMetrics: {
        givenLikes,
        receivedLikes,
        likeRatio,
        mostLikedContent,
      },
      trendingContent: {
        topPerformingCasts,
      },
    };
  } catch (error) {
    console.error("Error fetching user analytics:", error);
    return null;
  }
}
