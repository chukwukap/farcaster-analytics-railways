import { init, fetchQuery } from "@airstack/node";
import { FarcasterUserStats, Profile } from "./types";

init(process.env.AIRSTACK_API_KEY as string);

const FARCASTER_USER_QUERY = `
    query SearchFarcasterUsers($username: String!) {
      Socials(
        input: {
          filter: { 
            dappName: { _eq: farcaster },
            profileName: { _regex: $username }
          },
          blockchain: ethereum,
          limit: 15
        }
      ) {
        Social {
          profileName
          userId
          profileDisplayName
          followerCount
          followingCount
          profileImageContentValue {
            image {
              original
            }
          }
        }
      }
    }
  `;

const FARCASTER_USER_STATS_QUERY = `
query GetFarcasterUserStats($username: String!) {
      Socials(
        input: {
          filter: { 
            dappName: { _eq: farcaster },
            profileName: { _regex: $username }
          },
          blockchain: ethereum,
          limit: 15
        }
      ) {
        Social {
          followerCount
          followingCount
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

export async function getFarcasterUser(username: string): Promise<Profile> {
  const data = await queryAirstack(FARCASTER_USER_QUERY, { username });
  return data?.Socials?.Social?.[0];
}

export async function getFarcasterUserStats(
  username: string
): Promise<FarcasterUserStats> {
  const data = await queryAirstack(FARCASTER_USER_STATS_QUERY, { username });
  return data?.Socials?.Social?.[0];
}
