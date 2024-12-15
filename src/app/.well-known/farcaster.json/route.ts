import { generateFarcasterSignature } from "../../../lib/generateFarcasterSignature";

export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  // const data_ = await generateFarcasterSignature(
  //   "https://farcaster-analytics.vercel.app",
  //   755074,
  //   "0x9250280D1557545d647Db311554c4c6b819a5EE0",
  //   ""
  // );

  const data = {
    compact:
      "eyJmaWQiOjc1NTA3NCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDkyNTAyODBEMTU1NzU0NWQ2NDdEYjMxMTU1NGM0YzZiODE5YTVFRTAifQ.eyJkb21haW4iOiJodHRwczovL2ZhcmNhc3Rlci1hbmFseXRpY3MudmVyY2VsLmFwcCJ9.MHgyN2ZlYjc4NmNkMTAzNDk0NTkxZDRhZjMyNWIzYzUwZWJjNzVkMzkzMGJjNGU0NjZmZmZkYWM3Y2U1Mjc5MjI1MTA3OWE5OWI4ZWIyZTQ0MDc4NDAxY2Q1ODc1Njg3OWM5NDhmOWVlYzI0MjZkMTk3N2U3YzJjNjcwZTEwNzRlZjFj",
    json: {
      header:
        "eyJmaWQiOjc1NTA3NCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDkyNTAyODBEMTU1NzU0NWQ2NDdEYjMxMTU1NGM0YzZiODE5YTVFRTAifQ",
      payload:
        "eyJkb21haW4iOiJodHRwczovL2ZhcmNhc3Rlci1hbmFseXRpY3MudmVyY2VsLmFwcCJ9",
      signature:
        "MHgyN2ZlYjc4NmNkMTAzNDk0NTkxZDRhZjMyNWIzYzUwZWJjNzVkMzkzMGJjNGU0NjZmZmZkYWM3Y2U1Mjc5MjI1MTA3OWE5OWI4ZWIyZTQ0MDc4NDAxY2Q1ODc1Njg3OWM5NDhmOWVlYzI0MjZkMTk3N2U3YzJjNjcwZTEwNzRlZjFj",
    },
  };

  const config = {
    accountAssociation: {
      header:
        "eyJmaWQiOjc1NTA3NCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDkyNTAyODBEMTU1NzU0NWQ2NDdEYjMxMTU1NGM0YzZiODE5YTVFRTAifQ",
      payload:
        "eyJkb21haW4iOiJodHRwczovL2ZhcmNhc3Rlci1hbmFseXRpY3MudmVyY2VsLmFwcCJ9",
      signature:
        "MHgyN2ZlYjc4NmNkMTAzNDk0NTkxZDRhZjMyNWIzYzUwZWJjNzVkMzkzMGJjNGU0NjZmZmZkYWM3Y2U1Mjc5MjI1MTA3OWE5OWI4ZWIyZTQ0MDc4NDAxY2Q1ODc1Njg3OWM5NDhmOWVlYzI0MjZkMTk3N2U3YzJjNjcwZTEwNzRlZjFj",
    },
    frame: {
      version: "0.0.1",
      name: "Farcaster analytics",
      iconUrl: `farcaster-analytics.vercel.app/icon.png`,
      splashImageUrl: `farcaster-analytics.vercel.app/splash.png`,
      splashBackgroundColor: "#000080",
      homeUrl: appUrl,
      webhookUrl: `farcaster-analytics.vercel.app/api/webhook`,
    },
  };

  return Response.json(config);
}
