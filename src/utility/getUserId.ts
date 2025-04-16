import jwt from "jsonwebtoken";

export function getUserIdFromToken(token: string | undefined): string | null {
  if (!token) return null;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;
    return decoded.id;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
