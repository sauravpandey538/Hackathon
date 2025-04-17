import db from "@/src/lib/db";
import { getUser } from "@/src/utility/getUser";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the user from the token
  const token = req.cookies.token;
  const user = getUser(token);

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (user.role !== "student") {
    return res.status(403).json({ error: "Forbidden" });
  }

  // GET - Fetch student profile
  if (req.method === "GET") {
    try {
      const student = await db("students")
        .select("students.*", "users.name", "users.email", "users.role")
        .join("users", "students.user_id", "users.id")
        .where("students.user_id", user.id)
        .first();

      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }

      return res.status(200).json(student);
    } catch (error) {
      console.error("Error fetching student profile:", error);
      return res.status(500).json({ error: "Failed to fetch student profile" });
    }
  }

  // PUT - Update student profile
  if (req.method === "PUT") {
    try {
      const { address, number, email, name } = req.body;
      req.body;

      // Validate required fields
      if (!name || !email || !number || !address) {
        return res.status(400).json({
          error: "Name, email, phone_number, and address are required",
        });
      }

      // Start a transaction
      const result = await db.transaction(async (trx) => {
        // Update user information
        await trx("users").where("id", user.id).update({
          name,
          email,
        });

        // Update student information
        await trx("students").where("user_id", user.id).update({
          phone_number: number,
          address,
          name,
          email,
        });

        // Fetch the updated student profile
        const updatedStudent = await trx("students")
          .select("students.*", "users.name", "users.email", "users.role")
          .join("users", "students.user_id", "users.id")
          .where("students.user_id", user.id)
          .first();

        return updatedStudent;
      });

      return res.status(200).json(result);
    } catch (error) {
      console.error("Error updating student profile:", error);
      return res
        .status(500)
        .json({ error: "Failed to update student profile" });
    }
  }

  // Method not allowed
  return res
    .setHeader("Allow", ["GET", "PUT"])
    .status(405)
    .end(`Method ${req.method} Not Allowed`);
}
