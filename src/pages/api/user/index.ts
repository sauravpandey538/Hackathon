// src/pages/api/user/index.ts
import { NextResponse } from 'next/server'
import { NextApiRequest, NextApiResponse } from 'next'
import pg from '@/src/lib/db'
import { getUser } from '@/src/utility/getUser';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

 if(req.method === 'GET') {
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
 else if(req.method === 'POST') {
  const { name, email } = req.body
  const [newUser] = await pg('users').insert({ name, email }).returning('*')
  return res.json(newUser)
 }
 else if(req.method === 'PUT') {
  const { id, name } = req.body
  const [updatedUser] = await pg('users').where({ id }).update({ name }).returning('*')
  return res.json(updatedUser)
 }
 else if(req.method === 'DELETE') {
  const { id } = req.body
  const deletedUser = await pg('users').where({ id }).del()
  return res.json(deletedUser)
 }
 else {
  return res.json({ message: 'Method not allowed' })
 }
}

