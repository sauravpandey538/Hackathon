// pages/api/sendNotification.ts

import pg from "@/src/lib/db";
import { getUser } from "@/src/utility/getUser";
import { getUserIdFromToken } from "@/src/utility/getUserId";
import { NextApiRequest, NextApiResponse } from "next";
// adjust path to your knex instance
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: false, message: "Method not allowed" });
  }

  const user = getUser(req.cookies.token);
  const { title, message, role } = req.body;
  console.log(title, message, role);

  if (!title || !message || !role) {
    return res.status(400).json({ status: false, message: "Missing fields" });
  }
  const sendor = await pg("users").where("id", user?.id).first();

  try {
    const newNotification = await pg("notifications").insert({
      title,
      message,
      role,
      sender_id: user?.id,
    });

    // Broadcast via Pusher
    await pusher.trigger("notifications", "new-notification", {
      sendor: sendor.name || "Admin",
      title,
      message,
      role,
      sent_at: new Date().toISOString(),
    });

    return res.status(200).json({ status: true, message: "Notification sent" });
  } catch (error) {
    console.error("Send Notification Error:", error);
    return res.status(500).json({ status: false, message: "Internal error" });
  }
}
