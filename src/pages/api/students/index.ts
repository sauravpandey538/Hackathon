import pg from "@/src/lib/db";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

// your initialized knex instance

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userRole = req.headers["x-user-role"];

  // if (userRole !== 'admin') {
  //   return res.status(403).json({ error: 'Unauthorized' })
  // }

  if (req.method === "GET") {
    try {
      const { faculty, semester } = req.query;

      let query = pg("students").select(
        "students.id",
        "students.name",
        "students.email",
        "students.address",
        "students.phone_number",
        "students.faculty",
        "students.semester",
        "students.joined_at",
        "students.graduate_at"
      );

      if (faculty) {
        query = query.where("students.faculty", faculty as string);
      }

      if (semester) {
        query = query.where("students.semester", semester as string);
      }

      const students = await query;
      return res.status(200).json(students);
    } catch (error) {
      console.error("Error fetching students:", error);
      return res.status(500).json({ error: "Failed to fetch students" });
    }
  }

  if (req.method === "POST") {
    const trx = await pg.transaction();
    try {
      const {
        name,
        email,
        password,
        address,
        phoneNumber,
        faculty,
        section,
        semester,
        joinedAt,
        graduateAt,
      } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(req.body);
      // Insert into users table
      const [user] = await trx("users")
        .insert({
          email,
          name,
          password: hashedPassword,
          role: "student",
        })
        .returning("*");

      console.log({
        user_id: user.id,
        name,
        email,
        address,
        phone_number: phoneNumber,
        faculty,
        semester,
        joined_at: joinedAt,
        graduate_at: graduateAt,
      });

      // Insert directly into students table
      await trx("students").insert({
        user_id: user.id,
        name,
        email,
        address,
        phone_number: phoneNumber,
        faculty,
        section,
        semester,
        joined_at: joinedAt,
        graduate_at: graduateAt,
      });

      await trx.commit();
      return res.status(201).json({ message: "Student created successfully" });
    } catch (error) {
      await trx.rollback();
      console.error("Error creating student:", error);
      return res.status(500).json({ error: "Failed to create student" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
