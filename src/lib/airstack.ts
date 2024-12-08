import { init, fetchQuery } from "@airstack/node";

init(process.env.AIRSTACK_API_KEY as string);

const FARCASTER_USER_QUERY = `
query GetFarcasterUser($username: String!) {
  Socials(
    input: {
      filter: { dappName: { _eq: farcaster }, identity: { _eq: $username } }
      blockchain: ethereum
    }
  ) {
    Social {
      profileName
      userId
      userAssociatedAddresses
      followingCount
      followerCount
      profileImageContentValue {
        image {
          small
        }
      }
      userCreatedAtBlockTimestamp
    }
  }
}
`;

const FARCASTER_USER_STATS_QUERY = `
query GetFarcasterUserStats($userId: String!) {
  FarcasterStats: Socials(
    input: {
      filter: { dappName: { _eq: farcaster }, userId: { _eq: $userId } }
      blockchain: ethereum
    }
  ) {
    Social {
      followerCount
      followingCount
      recastCount
      likeCount
      replyCount
      postCount
    }
  }
}
`;

export async function queryAirstack(
  query: string,
  variables: Record<string, string>
) {
  try {
    const { data, error } = await fetchQuery(query, variables);
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Airstack query error:", err);
    throw err;
  }
}

export async function getFarcasterUser(username: string) {
  const data = await queryAirstack(FARCASTER_USER_QUERY, { username });
  return data?.Socials?.Social?.[0];
}

export async function getFarcasterUserStats(userId: string) {
  const data = await queryAirstack(FARCASTER_USER_STATS_QUERY, { userId });
  return data?.FarcasterStats?.Social?.[0];
}
