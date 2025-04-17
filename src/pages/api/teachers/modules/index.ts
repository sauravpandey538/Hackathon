import db from "@/src/lib/db";
import { getUserIdFromToken } from "@/src/utility/getUserId";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const userId = getUserIdFromToken(req.cookies.token) as string;

      let teachersWithModule = db("teachers")
        .select("teachers.*", "modules.*")
        .join("modules", "teachers.subject", "modules.name");

      if (
        req.query.faculty === "BBS" ||
        req.query.faculty === "BIT" ||
        req.query.faculty === "BCA"
      ) {
        teachersWithModule = teachersWithModule.where(
          "teachers.faculty",
          req.query.faculty
        );
      }

      const query = await teachersWithModule;
      return res.status(200).json(query);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      return res.status(500).json({ error: "Failed to fetch teachers" });
    }
  }

  // Method not allowed
  res.setHeader("Allow", ["GET"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
