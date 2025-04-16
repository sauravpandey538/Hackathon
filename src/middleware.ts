import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const token = request.cookies.get('token')?.value

  // 🚫 Protect dashboard routes
  if (url.pathname.startsWith('/dashboard')) {
    if (!token) {
      // Include the full URL (including query parameters) as a redirect parameter
      const redirectUrl = new URL('/auth/login', request.url)
      redirectUrl.searchParams.set('redirect', url.pathname + url.search)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
}
