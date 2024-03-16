import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  const architectEp = process.env.NEXT_PUBLIC_ARCHITECT_ENDPOINT;

  const response = await fetch(architectEp + "/birthdays");
  // const birthdays = response.body;

  return new NextResponse(response.body, {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
