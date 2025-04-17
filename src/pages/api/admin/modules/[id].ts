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

  const { id } = req.query;
  const moduleId = parseInt(id as string);

  if (isNaN(moduleId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid module ID" });
  }

  if (req.method === "GET") {
    try {
      const [module] = await pg("modules").select("*").where("id", moduleId);

      if (!module) {
        return res
          .status(404)
          .json({ success: false, message: "Module not found" });
      }

      return res.status(200).json({ success: true, data: module });
    } catch (error) {
      console.error("Error fetching module:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch module",
      });
    }
  }

  if (req.method === "PUT") {
    try {
      const { name, faculty, semester } = req.body;

      if (!name || !faculty || !semester) {
        return res.status(400).json({
          success: false,
          message: "Name, faculty, and semester are required",
        });
      }
      const existingModule = await pg("modules").where("id", moduleId).first();
      //it may be the issue later on
      await pg("teachers").where("subject", existingModule.name).update({
        subject: name,
      });
      const [updatedModule] = await pg("modules")
        .where("id", moduleId)
        .update({
          name,
          faculty,
          semester,
        })
        .returning("*");

      if (!updatedModule) {
        return res
          .status(404)
          .json({ success: false, message: "Module not found" });
      }

      return res.status(200).json({ success: true, data: updatedModule });
    } catch (error) {
      console.error("Error updating module:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update module",
      });
    }
  }

  if (req.method === "DELETE") {
    try {
      const [deletedModule] = await pg("modules")
        .where("id", moduleId)
        .delete()
        .returning("*");

      if (!deletedModule) {
        return res
          .status(404)
          .json({ success: false, message: "Module not found" });
      }

      return res.status(200).json({ success: true, data: deletedModule });
    } catch (error) {
      console.error("Error deleting module:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete module",
      });
    }
  }

  return res
    .status(405)
    .json({ success: false, message: "Method not allowed" });
}
