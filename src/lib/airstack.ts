import { init, fetchQuery } from "@airstack/node";
import {
  FarcasterUserCasts,
  FarcasterUserReactions,
  UserDetails,
  UserTrendingCasts,
} from "./types";

init(process.env.AIRSTACK_API_KEY as string);

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
export async function getFarcasterUserCasts(
  fid: number
): Promise<FarcasterUserCasts> {
  const FARCASTER_USER_CASTS_QUERY = ` query MyQuery {
  FarcasterCasts(
    input: {
      filter: { castedBy: { _eq: "fc_fid:${fid}" } }
      blockchain: ALL
      limit: 200
    }
  ) {
    Cast {
      castedAtTimestamp
      text
      numberOfRecasts
      numberOfLikes
      channel {
        channelId
      }
    }
  }
}`;
  const data = await queryAirstack(FARCASTER_USER_CASTS_QUERY, {
    fid: fid.toString(),
  });
  console.log("data", data);
  return data;
}
export async function getFarcasterUserReactions(
  fid: number
): Promise<FarcasterUserReactions> {
  const FARCASTER_USER_REACTIONS_QUERY = ` query MyQuery {
  FarcasterReactions(
    input: {
      filter: {
        criteria: liked,
        reactedBy: {_eq: "fc_fid:${fid}"}
      },
      blockchain: ALL,
      limit: 200
    }
  ) {
    Reaction {
      cast {
        castedAtTimestamp
        text
        numberOfRecasts
        numberOfLikes
        channel {
          channelId
        }
      }
    }
  }
}`;

  const data = await queryAirstack(FARCASTER_USER_REACTIONS_QUERY, {
    fid: fid.toString(),
  });
  return data;
}

export async function getUserDetails(fid: number): Promise<UserDetails> {
  const USER_DETAILS_QUERY = ` query MyQuery {
  Socials(
    input: {
      filter: { dappName: { _eq: farcaster }, identity: { _eq: "fc_fid:${fid}" } }
      blockchain: ethereum
    }
  ) {
    Social {
      id
      chainId
      followerCount
      followingCount
      userCreatedAtBlockTimestamp
      profileBio
      profileDisplayName
      profileImage
      profileUrl
      profileName
      identity
      fnames
    }
  }
}`;
  const data = await queryAirstack(USER_DETAILS_QUERY, {
    fid: fid.toString(),
  });
  return data;
}
export async function getUserTrendingCasts(
  fid: number
): Promise<UserTrendingCasts> {
  const FARCASTER_USER_CASTS_QUERY = `query MyQuery(
  $criteria: TrendingCastsCriteria!
  $timeFrame: TrendingCastTimeFrame!
  $fid: Int!
) {
  TrendingCasts(
    input: {
      blockchain: ALL
      criteria: $criteria
      timeFrame: $timeFrame
      filter: { fid: { _eq: $fid } }
    }
  ) {
    TrendingCast {
      criteria
      criteriaCount
      hash
      id
      castValueFormatted
      castValueRaw
      timeFrom
      timeTo
      cast {
        text
        mentions {
          fid
          position
        }
        embeds
        url
      }
    }
  }
}`;
  const data = await queryAirstack(FARCASTER_USER_CASTS_QUERY, {
    fid: fid.toString(),
    timeFrame: "seven_days",
    criteria: "social_capital_value",
  });
  return data;
}
