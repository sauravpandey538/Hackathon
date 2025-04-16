import db from "@/src/lib/db";
import { getUserIdFromToken } from "@/src/utility/getUserId";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const userId = getUserIdFromToken(req.cookies.token) as string;
    console.log({ userId });
    const student = await db("students").where("user_id", userId).first();
    const faculty = student?.faculty;
    const semister = student?.semester;
    const section = student?.section;
    console.log({ faculty, semister, section });
    const routine = await db("teacher_routines")
      .select(
        "teacher_routines.*",
        "users.name as teacher_name",
        "teachers.subject as subject"
      )
      .where("teacher_routines.faculty", faculty)
      .where("teacher_routines.semister", semister)
      .where("teacher_routines.section", section)
      .leftJoin("teachers", "teacher_routines.teacher_id", "teachers.id")
      .leftJoin("users", "teachers.user_id", "users.id");
    return res.status(200).json(routine);
  }
}
