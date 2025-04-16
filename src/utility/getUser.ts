import jwt from 'jsonwebtoken';

export function getUser(token: string | undefined): {id: string, name: string, email: string} | null {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
    return {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}