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
    const { email, password } = req.body;

    const user = await pg("users").where({ email }).first();

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    console.log({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // ✅ Set cookie manually
    res.setHeader(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60, // 1 hour
        path: "/",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      })
    );

    return res.status(200).json({ status: true, message: "Login successful" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ status: false, error: error.message || "Internal server error" });
  }
}
