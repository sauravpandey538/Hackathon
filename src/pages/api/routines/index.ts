import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/src/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const teacher_routines = await db("teacher_routines")
        .select(
          "teacher_routines.*",
          "teachers.subject",
          "users.name as teacher_name"
        )
        .join("teachers", "teacher_routines.teacher_id", "teachers.id")
        .join("users", "teachers.user_id", "users.id")
        .orderBy("teacher_routines.day")
        .orderBy("teacher_routines.time");

      return res.status(200).json(teacher_routines);
    } catch (error) {
      console.error("Error fetching teacher_routines:", error);
      return res.status(500).json({ error: "Failed to fetch teacher_routines" });
    }
  }

  if (req.method === 'POST') {
    try {
      const { day, time, section, teacherId } = req.body;

      if (!day || !time || !section || !teacherId) {
        return res.status(400).json({
          error: "Day, time, section, and teacherId are required"
        });
      }

      const teacher = await db("teachers").where("id", teacherId).first();
      if (!teacher) {
        return res.status(404).json({ error: "Teacher not found" });
      }

      const existingRoutine = await db("teacher_routines")
        .where({ day, time, section })
        .first();

      if (existingRoutine) {
        return res.status(409).json({
          error: "A routine already exists for this day, time, and section"
        });
      }

      const [routine] = await db("teacher_routines")
        .insert({
          day,
          time,
          section,
          teacher_id: teacherId,
        })
        .returning("id");

      const routineDetails = await db("teacher_routines")
        .select(
          "teacher_routines.*",
          "teachers.subject",
          "users.name as teacher_name"
        )
        .join("teachers", "teacher_routines.teacher_id", "teachers.id")
        .join("users", "teachers.user_id", "users.id")
        .where("teacher_routines.id", routine.id)
        .first();

      return res.status(201).json(routineDetails);
    } catch (error) {
      console.error("Error creating routine:", error);
      return res.status(500).json({ error: "Failed to create routine" });
    }
  }

  // If method not allowed
  return res.setHeader('Allow', ['GET', 'POST']).status(405).end(`Method ${req.method} Not Allowed`);
}
