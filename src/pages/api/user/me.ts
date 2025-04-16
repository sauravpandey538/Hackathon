import { NextApiRequest, NextApiResponse } from 'next';
import { getUser } from '@/src/utility/getUser';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = req.cookies.token;
    const user = getUser(token);
    if(!user){
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return res.status(200).json(user);
  } catch (error: any) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ error: error.message });
  }
} 