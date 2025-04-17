import db from "@/src/lib/db";
import { getUserIdFromToken } from "@/src/utility/getUserId";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const userId = getUserIdFromToken(req.cookies.token) as string;
    const teacher = await db("teachers").where("user_id", userId).first();
    const routine = await db("teacher_routines")
      .select(
        "teacher_routines.*",
        "users.name as teacher_name",
        "teachers.subject as subject"
      )
      .where("teacher_id", teacher.id)

      .leftJoin("teachers", "teacher_routines.teacher_id", "teachers.id")
      .leftJoin("users", "teachers.user_id", "users.id");
    return res.status(200).json(routine);
  }
}
