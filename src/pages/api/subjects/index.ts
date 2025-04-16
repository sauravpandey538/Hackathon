import db from "@/src/lib/db";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

// your initialized knex instance

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { faculty } = req.query;
      const subjects = await db("modules").where("faculty", faculty);
      return res.status(200).json(subjects);
    } catch (error) {
      console.error("Error fetching students:", error);
      return res.status(500).json({ error: "Failed to fetch students" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
