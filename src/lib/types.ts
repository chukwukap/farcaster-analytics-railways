export interface FarcasterUserStats {
  postCount: number;
  likeCount: number;
  recastCount: number;
  replyCount: number;
}

export interface Profile {
  username: string;
  displayName: string;
  followerCount: number;
  followingCount: number;
  userCreatedAtBlockTimestamp: string;
  profileImage?: string;
}

export interface UserAnalytics {
  profile: Profile;
  stats: FarcasterUserStats;
  engagement: number;
  followers: number;
  posts: number;
}
