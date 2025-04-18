import db from "@/src/lib/db";
import { getUserIdFromToken } from "@/src/utility/getUserId";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const userId = getUserIdFromToken(req.cookies.token) as string;
    console.log(userId);
    const student = await db("students").where("user_id", userId).first();
    const faculty = student?.faculty;
    const semister = student?.semester;
    console.log(faculty, semister);
    const routine = await db("modules")
      .select("modules.*")
      .where("modules.faculty", faculty)
      .where("modules.semester", semister)
      .leftJoin("teachers", "modules.name", "teachers.subject")
      .leftJoin("users", "teachers.user_id", "users.id")
      .select("users.name as teacher_name", "teachers.phone as teacher_phone");
    return res.status(200).json(routine);
  }
}
