import pg from "@/src/lib/db";
import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }

  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = verify(token, process.env.JWT_SECRET!) as { role: string };
    const userRole = decoded.role;

    if (userRole !== "student") {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    const role = req.query.role as string | undefined;
    const limit = parseInt(req.query.limit as string) || 20;

    const query = pg("notifications").orderBy("sent_at", "desc").limit(limit);

    if (role) {
      query.where("role", role);
    }

    const notifications = await query;

    return res.status(200).json(notifications);
  } catch (error) {
    console.error("Notification fetch error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
}
