import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify, JWTPayload } from 'jose'

// Define the user roles
export type UserRole = 'admin' | 'teacher' | 'student'

// Define the user payload structure
export interface UserPayload extends JWTPayload {
  role: UserRole
  name: string
  email: string
}

/**
 * Verify the JWT token and extract user information
 * @param token The JWT token to verify
 * @returns The decoded user payload or null if verification fails
 */
export async function verifyToken(token: string): Promise<UserPayload | null> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key')
    const { payload } = await jwtVerify(token, secret)
    return payload as UserPayload
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

/**
 * Middleware helper to check if a user has the required role
 * @param request The Next.js request object
 * @param allowedRoles Array of roles that are allowed to access the route
 * @returns NextResponse or null if authorization passes
 */
export async function checkRoleAuthorization(
  request: NextRequest,
  allowedRoles: UserRole[]
): Promise<NextResponse | null> {
  // Get the token from cookies
  const token = request.cookies.get('token')?.value
  
  // If no token is present, return unauthorized
  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized: No token provided' },
      { status: 401 }
    )
  }
  
  // Verify the token
  const payload = await verifyToken(token)
  
  // If token verification failed, return unauthorized
  if (!payload) {
    return NextResponse.json(
      { error: 'Unauthorized: Invalid token' },
      { status: 401 }
    )
  }
  
  // Check if the user's role is allowed
  if (!allowedRoles.includes(payload.role)) {
    return NextResponse.json(
      { error: 'Forbidden: Insufficient permissions' },
      { status: 403 }
    )
  }
  
  // Authorization passed
  return null
}

/**
 * Get the current user from the request
 * @param request The Next.js request object
 * @returns The user payload or null if not authenticated
 */
export async function getCurrentUser(request: NextRequest): Promise<UserPayload | null> {
  const token = request.cookies.get('token')?.value
  if (!token) return null
  
  return await verifyToken(token)
} 