export interface FarcasterUserCasts {
  FarcasterCasts: {
    Cast: Array<{
      castedAtTimestamp: string;
      embeds: [];
      url: string;
      text: string;
      numberOfRecasts: number;
      numberOfLikes: number;
      channel: {
        channelId: string;
      };
      mentions: Array<{
        fid: number;
        position: number;
      }>;
    }>;
  };
}

export interface FarcasterUserReactions {
  FarcasterReactions: {
    Reaction: Array<{
      cast: {
        castedAtTimestamp: string;
        embeds: Array<{
          castId?: {
            fid: number;
            hash: string;
          };
        }>;
        url: string;
        text: string;
        numberOfRecasts: number;
        numberOfLikes: number;
        channel: {
          channelId: string;
        };
        mentions: Array<{
          fid: string | number;
          position: number;
        }>;
      };
    }>;
  };
}

export interface UserDetails {
  Socials: {
    Social: Array<{
      id: string;
      chainId: string;
      blockchain: string;
      followerCount: number;
      followingCount: number;
      dappName: string;
      dappSlug: string;
      dappVersion: string;
      userId: string;
      userAddress: string;
      userCreatedAtBlockTimestamp: string;
      userCreatedAtBlockNumber: number;
      userLastUpdatedAtBlockTimestamp: string;
      userLastUpdatedAtBlockNumber: number;
      userHomeURL: string;
      userRecoveryAddress: string;
      userAssociatedAddresses: string[];
      profileBio: string;
      profileDisplayName: string;
      profileImage: string;
      profileUrl: string;
      profileName: string;
      profileTokenId: string;
      profileTokenAddress: string;
      profileCreatedAtBlockTimestamp: string;
      profileCreatedAtBlockNumber: number;
      profileLastUpdatedAtBlockTimestamp: string;
      profileLastUpdatedAtBlockNumber: number;
      profileTokenUri: string;
      isDefault: boolean;
      identity: string;
      fnames: string[];
      isFarcasterPowerUser: boolean;
    }>;
  };
}

export interface UserTrendingCasts {
  TrendingCasts: {
    TrendingCast: Array<{
      criteria: string;
      criteriaCount: number;
      hash: string;
      id: string;
      castValueFormatted: number;
      castValueRaw: string;
      timeFrom: string;
      timeTo: string;
      cast: {
        text: string;
        mentions: Array<{
          fid: number;
          position: number;
        }>;
        embeds: Array<{
          castId: {
            fid: number;
            hash: string;
          };
        }>;
        url: string;
      };
    }>;
  };
}

export interface Profile {
  username: string;
  displayName: string;
  followerCount: number;
  followingCount: number;
  bio: string;
  profileImage: string;
  userCreatedAtTimestamp: string;
  associatedAddresses: string[];
}

export interface ActivityStats {
  totalCasts: number;
  totalLikes: number;
  totalRecasts: number;
  averageLikesPerCast: number;
  averageRecastsPerCast: number;
  mostUsedChannels: Array<{ channelId: string; count: number }>;
}

export interface EngagementMetrics {
  givenLikes: number;
  receivedLikes: number;
  likeRatio: number;
  mostLikedContent: Array<{
    text: string;
    likes: number;
    recasts: number;
  }>;
}

export interface TrendingContent {
  topPerformingCasts: Array<{
    text: string;
    criteriaCount: number;
    castValue: number;
    timeFrame: {
      from: string;
      to: string;
    };
  }>;
}

export interface UserAnalytics {
  profile: Profile;
  activityStats: ActivityStats;
  engagementMetrics: EngagementMetrics;
  trendingContent: TrendingContent;
}
