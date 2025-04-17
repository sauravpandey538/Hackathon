import db from "@/src/lib/db";
import { getUser } from "@/src/utility/getUser";
import { getUserIdFromToken } from "@/src/utility/getUserId";
import type { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

// DELETE /api/teacher_routines/[id] - Delete a routine
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "DELETE") {
    try {
      const id = request.query.id;
      const token = request.cookies.token;
      const adminId = getUser(token);
      if (adminId?.role !== "admin") {
        return response.status(401).json({ error: "Unauthorized" });
      }

      // Check if the routine exists
      const routine = await db("teacher_routines").where("id", id).first();
      if (!routine) {
        return response.status(404).json({ error: "Routine not found" });
      }

      // Delete the routine
      await db("teacher_routines").where("id", id).delete();

      return response
        .status(200)
        .json({ message: "Routine deleted successfully" });
    } catch (error) {
      console.error("Error deleting routine:", error);
      return response.status(500).json({ error: "Failed to delete routine" });
    }
  }

  if (request.method === "PUT") {
    try {
      const id = request.query.id;
      const { day, time } = request.body;

      if (!id || !day || !time) {
        return response.status(400).json({
          error: "Day, time, section, and teacherId are required",
        });
      }
      const token = request.cookies.token;
      const adminId = getUser(token);
      if (adminId?.role !== "admin") {
        return response.status(401).json({ error: "Unauthorized" });
      }
      const existingRoutine = await db("teacher_routines")
        .where({ id })
        .first();

      if (!existingRoutine) {
        return response.status(404).json({ error: "Routine not found" });
      }

      const [routine] = await db("teacher_routines")
        .update({
          day,
          time,
        })
        .where("id", id)
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

      return response.status(201).json(routineDetails);
    } catch (error) {
      console.error("Error creating routine:", error);
      return response.status(500).json({ error: "Failed to create routine" });
    }
  }
}
