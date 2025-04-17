import pg from "@/src/lib/db";
import { getUser } from "@/src/utility/getUser";
import { NextApiRequest, NextApiResponse } from "next";

// GET /api/admin/profile - Get admin profile
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = getUser(req.cookies.token);

    if (!user) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ success: false, error: "Forbidden" });
    }

    const userId = user.id;

    // Handle GET request
    if (req.method === "GET") {
      // Get admin profile with user information
      const admin = await pg("users")
        .where("id", userId)
        .select("id", "name", "email", "role")
        .first();

      if (!admin) {
        return res.status(404).json({
          success: false,
          error: "Admin profile not found",
        });
      }

      return res.status(200).json(admin);
    }

    // Handle PUT request
    if (req.method === "PUT") {
      const { name, email } = req.body;
      console.log("Updating profile with:", { name, email });

      // Validate required fields
      if (!name || !email) {
        return res.status(400).json({
          success: false,
          error: "Name and email are required",
        });
      }

      // Validate name length
      if (name.length < 5) {
        return res.status(400).json({
          success: false,
          error: "Name must be at least 5 characters long",
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: "Invalid email format",
        });
      }

      // Check if email is already taken by another user
      const existingUser = await pg("users")
        .where("email", email)
        .whereNot("id", userId)
        .first();

      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: "Email is already taken",
        });
      }

      // Update user information
      await pg("users").where("id", userId).update({
        name,
        email,
      });

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
      });
    }

    // Handle unsupported methods
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  } catch (error) {
    console.error("Error handling admin profile:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to process request",
    });
  }
}
