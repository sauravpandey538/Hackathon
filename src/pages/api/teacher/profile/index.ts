import pg from "@/src/lib/db";
import { getUserIdFromToken } from "@/src/utility/getUserId";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId = getUserIdFromToken(req.cookies.token);

    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    if (req.method === "GET") {
      const teacher = await pg("teachers")
        .join("users", "teachers.user_id", "users.id")
        .where("teachers.user_id", userId)
        .select(
          "teachers.id",
          "teachers.user_id",
          "teachers.faculty",
          "teachers.subject",
          "teachers.phone",
          "users.name",
          "users.email"
        )
        .first();

      if (!teacher) {
        return res
          .status(404)
          .json({ success: false, error: "Teacher profile not found" });
      }

      return res.status(200).json(teacher);
    }

    if (req.method === "PUT") {
      const { name, email, phone } = req.body;

      if (!name || !email) {
        return res
          .status(400)
          .json({ success: false, error: "Name and email are required" });
      }

      if (name.length < 5) {
        return res.status(400).json({
          success: false,
          error: "Name must be at least 5 characters long",
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid email format" });
      }

      if (phone && !/^\d{10}$/.test(phone)) {
        return res.status(400).json({
          success: false,
          error: "Phone number must be 10 digits",
        });
      }

      const existingUser = await pg("users")
        .where("email", email)
        .whereNot("id", userId)
        .first();

      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, error: "Email is already taken" });
      }

      await pg("users").where("id", userId).update({ name, email });

      await pg("teachers").where("user_id", userId).update({ phone: phone });

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
      });
    }

    return res
      .status(405)
      .json({ success: false, error: "Method Not Allowed" });
  } catch (error) {
    console.error("Error in /api/teacher/profile:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}
