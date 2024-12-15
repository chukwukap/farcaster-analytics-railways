import { Wallet } from "ethers";

interface FarcasterHeader {
  fid: number;
  type: "custody";
  key: string;
}

interface FarcasterPayload {
  domain: string;
}

export async function generateFarcasterSignature(
  domain: string,
  fid: number,
  custodyAddress: string,
  privateKey: string
) {
  // 1. Construct and encode the header
  const header: FarcasterHeader = {
    fid,
    type: "custody",
    key: custodyAddress,
  };
  const encodedHeader = Buffer.from(JSON.stringify(header), "utf-8").toString(
    "base64url"
  );

  // 2. Construct and encode the payload
  const payload: FarcasterPayload = {
    domain,
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload), "utf-8").toString(
    "base64url"
  );

  // 3. Create the message to sign
  const messageToSign = `${encodedHeader}.${encodedPayload}`;

  // 4. Sign the message
  const wallet = new Wallet(privateKey);
  const signature = await wallet.signMessage(messageToSign);
  const encodedSignature = Buffer.from(signature, "utf-8").toString(
    "base64url"
  );

  const compact = `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
  const json = {
    header: encodedHeader,
    payload: encodedPayload,
    signature: encodedSignature,
  };

  // 5. Return both compact and JSON formats
  return {
    compact,
    json,
  };
}
