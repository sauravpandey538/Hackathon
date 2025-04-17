import db from "@/src/lib/db";
import bcrypt from "bcrypt";
import { Knex } from "knex";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      let teachers = db("teachers")
        .select("teachers.*", "users.*")
        .join("users", "teachers.user_id", "users.id");

      if (
        req.query.faculty === "BBS" ||
        req.query.faculty === "BIT" ||
        req.query.faculty === "BCA"
      ) {
        teachers = teachers.where("faculty", req.query.faculty);
      }

      const query = await teachers;
      return res.status(200).json(query);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      return res.status(500).json({ error: "Failed to fetch teachers" });
    }
  }

  if (req.method === "POST") {
    try {
      const { name, subject, email, password, faculty, phone } = req.body;

      if (!name || !subject || !email || !password) {
        return res.status(400).json({
          error: "Name, subject, email, and password are required",
        });
      }

      const existingEmail = await db("users").where("email", email).first();
      if (existingEmail) {
        return res.status(400).json({
          error: "Email is already used.",
        });
      }

      const result = await db.transaction(async (trx: Knex.Transaction) => {
        const hashedPassword = await bcrypt.hash(password, 10);

        const [user] = await trx("users")
          .insert({
            name,
            email,
            password: hashedPassword,
            role: "teacher",
          })
          .returning("id");

        const [teacher] = await trx("teachers")
          .insert({
            user_id: user.id,
            faculty,
            phone,
            subject,
          })
          .returning("id");

        const teacherDetails = await trx("teachers")
          .select("teachers.*", "users.name")
          .join("users", "teachers.user_id", "users.id")
          .where("teachers.id", teacher.id)
          .first();

        return teacherDetails;
      });

      return res.status(201).json(result);
    } catch (error) {
      console.error("Error creating teacher:", error);
      return res.status(500).json({ error: "Failed to create teacher" });
    }
  }

  // Method not allowed
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
