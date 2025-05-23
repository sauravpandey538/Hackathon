import pg from "@/src/lib/db";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { name, email, password, role, secret_key } = req.body;
    if (secret_key !== process.env.ADMIN_SECRET_KEY) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await pg("users").where({ email }).first();

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const [newUser] = await pg("users")
      .insert({ name, email, password: hashedPassword, role })
      .returning("*");

    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.setHeader(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60, // 1 week
        path: "/",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      })
    );
    return res
      .status(200)
      .json({ status: true, message: "User created successfully" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ status: false, error: error.message || "Internal server error" });
  }
}
