import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { status: false, message: "Method not allowed" },
      { status: 405 }
    );
  }
  console.log("is prod: ", process.env.NODE_ENV);
  try {
    res.setHeader(
      "Set-Cookie",
      serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
        path: "/",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      })
    );

    return res.status(200).json({ status: true, message: "Logout successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Logout failed", error: error });
  }
}
