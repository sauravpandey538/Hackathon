import pg from "@/src/lib/db";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

// <-- ✅ Import cookie serializer

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: false, error: "Method not allowed" });
  }

  try {
    const { email } = req.body;
    const user = await pg("users").where({ email }).first();
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error: any) {
    return res
      .status(500)
      .json({ status: false, error: error.message || "Internal server error" });
  }
}
