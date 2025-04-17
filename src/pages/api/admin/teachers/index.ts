import pg from "@/src/lib/db";
import { getUser } from "@/src/utility/getUser";
import { NextApiRequest, NextApiResponse } from "next";

// GET /api/admin/teachers - Get all teachers
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

    // Handle GET request - List all teachers
    if (req.method === "GET") {
      const { faculty } = req.query;

      let query = pg("teachers")
        .join("users", "teachers.user_id", "users.id")
        .select(
          "teachers.id",
          "teachers.user_id",
          "teachers.faculty",
          "teachers.subject",
          "users.name",
          "users.email"
        );

      // Apply faculty filter if provided
      if (faculty && faculty !== "all") {
        query = query.where("teachers.faculty", faculty);
      }

      const teachers = await query;

      return res.status(200).json(teachers);
    }

    // Handle PUT request - Update teacher
    if (req.method === "PUT") {
      const { id, name, email, faculty, subject } = req.body;

      if (!id || !name || !email || !faculty || !subject) {
        return res.status(400).json({
          success: false,
          error: "All fields are required",
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

      // Get the teacher's user_id
      const teacher = await pg("teachers").where("id", id).first();
      if (!teacher) {
        return res.status(404).json({
          success: false,
          error: "Teacher not found",
        });
      }

      // Check if email is already taken by another user
      const existingUser = await pg("users")
        .where("email", email)
        .whereNot("id", teacher.user_id)
        .first();

      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: "Email is already taken",
        });
      }

      // Update user information
      await pg("users").where("id", teacher.user_id).update({
        name,
        email,
      });

      // Update teacher information
      await pg("teachers").where("id", id).update({
        faculty,
        subject,
      });

      return res.status(200).json({
        success: true,
        message: "Teacher updated successfully",
      });
    }

    // Handle DELETE request - Delete teacher
    if (req.method === "DELETE") {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: "Teacher ID is required",
        });
      }

      // Get the teacher's user_id
      const teacher = await pg("teachers").where("id", id).first();
      if (!teacher) {
        return res.status(404).json({
          success: false,
          error: "Teacher not found",
        });
      }

      // Delete teacher record
      await pg("teachers").where("id", id).delete();

      // Delete user record
      await pg("users").where("id", teacher.user_id).delete();

      return res.status(200).json({
        success: true,
        message: "Teacher deleted successfully",
      });
    }

    // Handle unsupported methods
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  } catch (error) {
    console.error("Error handling teacher management:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to process request",
    });
  }
}
