import pg from "@/src/lib/db";
import { getUser } from "@/src/utility/getUser";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = getUser(req.cookies.token);

  if (!user || user.role !== "admin") {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const { faculty = "BIT", semester = "1" } = req.query;

      const modules = await pg("modules")
        .select("*")
        .where("faculty", faculty)
        .where("semester", semester)
        .orderBy("name");

      return res.status(200).json(modules);
    } catch (error) {
      console.error("Error fetching modules:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch modules",
      });
    }
  }

  if (req.method === "POST") {
    try {
      const { name, faculty, semester } = req.body;

      if (!name || !faculty || !semester) {
        return res.status(400).json({
          success: false,
          message: "Name, faculty, and semester are required",
        });
      }

      const [module] = await pg("modules")
        .insert({
          name,
          faculty,
          semester,
        })
        .returning("*");

      return res.status(201).json({ success: true, data: module });
    } catch (error) {
      console.error("Error creating module:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to create module",
      });
    }
  }

  return res
    .status(405)
    .json({ success: false, message: "Method not allowed" });
}
