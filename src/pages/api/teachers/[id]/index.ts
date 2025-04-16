// File: pages/api/teachers/[id].ts

import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/src/lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid teacher ID' });
      }

      // Check if the teacher exists
      const teacher = await db("teachers").where("id", id).first();
      if (!teacher) {
        return res.status(404).json({ error: "Teacher not found" });
      }

      // Start a transaction
      await db.transaction(async (trx) => {
        await trx("teachers").where("id", id).delete();
        await trx("users").where("id", teacher.user_id).delete();
      });

      return res.status(200).json({ message: "Teacher deleted successfully" });
    } catch (error) {
      console.error("Error deleting teacher:", error);
      return res.status(500).json({ error: "Failed to delete teacher" });
    }
  }

  res.setHeader('Allow', ['DELETE']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
