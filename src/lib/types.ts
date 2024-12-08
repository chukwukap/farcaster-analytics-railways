export interface UserAnalytics {
  profile: {
    username: string;
    displayName: string;
    followerCount: number;
    followingCount: number;
    userCreatedAtBlockTimestamp: string;
    profileImage?: string;
  };
  stats: {
    posts: number;
    likes: number;
    recasts: number;
    replies: number;
  };
  engagement: number;
  followers: number;
  posts: number;
}
