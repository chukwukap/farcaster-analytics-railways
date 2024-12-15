import { appUrl as appUrlConstant } from "../../../lib/constants";

export async function GET() {
  const appUrl = appUrlConstant;

  const config = {
    accountAssociation: {
      header:
        "eyJmaWQiOjc1NTA3NCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDFBOUJDOGQ3ZGYxNzg3NzM0YmUyRDQ3MjFjNkM2Mjk0ODE4MDgwNDkifQ",
      payload: "eyJkb21haW4iOiJmYXJjYXN0ZXItaW5zaWdodHMudmVyY2VsLmFwcCJ9",
      signature:
        "MHg3ZGY1NjVlNjNjYzZjNTU4NzYwZmIwNmY1MmRkYjFmZTlmMzBmYzE2YTVjOWYzMDAyNTlmZmEyNDhiMGUzYmUzN2FjZjE0YTg3YWRiNGM2YWU0MzkyMDliNDk4ZTlmMTVjNmNjZDE4ZjEzZmViMTZkNGY5NmI5YTYxYTg5NzExYzFj",
    },
    frame: {
      version: "0.0.1",
      name: "Farcaster analytics",
      iconUrl: `${appUrl}/icon.png`,
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#eeccff",
      homeUrl: `${appUrl}`,
      webhookUrl: `${appUrl}/webhook`,
    },
  };

  return Response.json(config);
}
