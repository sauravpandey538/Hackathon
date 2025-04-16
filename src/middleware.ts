import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

// Define role-based route mappings with exact paths
const roleRoutes = {
  admin: ['/admin'],
  teacher: ['/teacher'],
  student: ['/student'],
}

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/admin/auth/login',
  '/admin/auth/signup',
  '/teacher/auth/login',
  '/student/auth/login',
  '/api/auth/login',
  '/api/auth/signup',
  '/api/user/me'
]

// Define API routes that require authentication
const protectedApiRoutes = [
  '/api/teachers',
  '/api/students',
  '/api/routines',
]

export async function middleware(request: NextRequest) {
  const url = request.nextUrl
  const pathname = url.pathname
  
  // Allow public routes without authentication
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'))) {
    return NextResponse.next()
  }
  
  // Get the token from cookies
  const token = request.cookies.get('token')?.value
  
  // If no token is present, redirect to login
  if (!token) {
    const redirectUrl = new URL('/admin/auth/login', request.url)
    redirectUrl.searchParams.set('redirect', pathname + url.search)
    return NextResponse.redirect(redirectUrl)
  }
  
  try {
    // Verify the token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    const { payload } = await jwtVerify(token, secret)
    
    // Extract user role from token
    const userRole = payload.role as string
    
    // Get the first path segment to determine the route type
    const firstPathSegment = pathname.split('/')[1]
    
    // Check if the user is trying to access a route for their role
    const isAllowedRoute = firstPathSegment === userRole
    
    // If trying to access a route not for their role, redirect to their dashboard
    if (!isAllowedRoute) {
      const dashboardRoute = `/${userRole}/dashboard`
      return NextResponse.redirect(new URL(dashboardRoute, request.url))
    }
    
    // For API routes, add the user role to the request headers
    if (pathname.startsWith('/api') && protectedApiRoutes.some(route => pathname.startsWith(route))) {
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-user-role', userRole)
      requestHeaders.set('x-user-id', payload.sub as string)
      
      // Return a new response with the modified headers
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    }
    
    // Allow access to the requested route
    return NextResponse.next()
  } catch (error) {
    // Token is invalid or expired
    console.error('Token validation error:', error)
    
    // Clear the invalid token
    const response = NextResponse.redirect(new URL('/admin/auth/login', request.url))
    response.cookies.delete('token')
    
    return response
  }
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /_next/ (Next.js internals)
     * 2. /_static (inside /public)
     * 3. /_vercel (Vercel internals)
     * 4. /favicon.ico, /sitemap.xml (static files)
     */
    '/((?!_next|_static|_vercel|favicon.ico|sitemap.xml).*)',
  ],
}
