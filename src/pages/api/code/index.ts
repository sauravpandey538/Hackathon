// src/pages/api/user/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserIdFromToken } from '@/src/utility/getUserId';
import pg from '@/src/lib/db';
import { v4 as uuidv4 } from 'uuid';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
  try {
    const token = req.cookies.token;
    const userId = getUserIdFromToken(token);
    const { code,language } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const result = await pg.transaction(async (tx) => {
      const [saved] = await tx('saved').insert({
        user_id: userId,
        code,
      }).returning('*');

      const [share] = await tx('shares')
        .insert({
            id:  uuidv4(),
            language,
            saved_id: saved.id,  })
        .returning('*');

      return share; 
    });

    return res.status(200).json({ message: 'Code saved successfully', id: result.id });
  } catch (error: any) {
    console.error('Transaction error:', error);
    return res.status(500).json({ error: error.message });
  }
}

else if (req.method === 'GET') {
  try {
    const { id } = req.query;
    const share = await pg('shares')
     .where('shares.id', id)
    .leftJoin('saved', 'shares.saved_id', 'saved.id')
    .leftJoin('users', 'saved.user_id', 'users.id')
    .select('saved.code', 'users.email as author', 'shares.language')
    .first();
    return res.status(200).json(share );
  } catch (error: any) {
   
    return res.status(500).json({ error: error.message });
  }
}
else {
  return res.status(405).json({ error: 'Method not allowed' });
}

}