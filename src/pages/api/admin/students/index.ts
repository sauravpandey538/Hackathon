import pg from "@/src/lib/db";
import { getUser } from "@/src/utility/getUser";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = getUser(req.cookies.token);

  if (!user || user.role !== "admin") {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  // GET - Fetch all students
  if (req.method === "GET") {
    try {
      const { faculty, semester } = req.query;

      let query = pg
        .select(
          "students.id",
          "students.user_id",
          "students.faculty",
          "students.semester",
          "students.section",
          "students.phone_number",
          "students.address",
          "students.joined_at",
          "students.graduate_at",
          "users.name",
          "users.email",
          "users.role"
        )
        .from("students")
        .join("users", "students.user_id", "users.id");

      // Apply filters if provided
      if (faculty && faculty !== "all") {
        query = query.where("students.faculty", faculty);
      }

      if (semester && semester !== "all" && semester !== "0") {
        query = query.where("students.semester", parseInt(semester as string));
      }

      const students = await query.orderBy("users.name", "asc");

      return res.status(200).json(students);
    } catch (error) {
      console.error("Error fetching students:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch students",
      });
    }
  }

  // PUT - Update a student
  if (req.method === "PUT") {
    try {
      const {
        id,
        name,
        email,
        phone_number,
        address,
        faculty,
        semester,
        section,
      } = req.body;

      console.log(req.body);

      if (!id || !name || !email) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email format",
        });
      }

      // Update user information
      await pg("users").where("id", id).update({
        name,
        email,
      });

      // Update student information
      await pg("students").where("user_id", id).update({
        phone_number,
        address,
        faculty,
        semester,
        section,
      });

      return res.status(200).json({
        success: true,
        message: "Student updated successfully",
      });
    } catch (error) {
      console.error("Error updating student:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update student",
      });
    }
  }

  // DELETE - Delete a student
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Student ID is required",
        });
      }
      const student = await pg("students").where("id", id).first();
      // Delete student record first (due to foreign key constraint)
      await pg("users").where("id", student.user_id).del();

      return res.status(200).json({
        success: true,
        message: "Student deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting student:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete student",
      });
    }
  }

  // Method not allowed
  return res.status(405).json({
    success: false,
    message: "Method not allowed",
  });
}
