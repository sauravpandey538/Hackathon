import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  "/",
  "/admin",
  "/teacher",
  "/student",
  "/admin/auth/login",
  "/admin/auth/signup",
  "/teacher/auth/login",
  "/student/auth/login",
];

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  // ✅ Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // return NextResponse.json({ route: "Protected" });
  // 🔐 Get token from cookie
  const token = request.cookies.get("token")?.value;
  // ❌ If no tokenc→ redirect to "/"
  if (!token) {
    const redirectUrl = new URL("/", request.url);
    redirectUrl.searchParams.set("redirect", pathname + search);
    return NextResponse.redirect(redirectUrl);
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    console.log({ payload });
    const userRole = payload.role as string;
    const firstPathSegment = pathname.split("/")[1]; // route role
    // Check if the user is trying to access a route for their role
    const isAllowedRoute = firstPathSegment === userRole;

    // If trying to access a route not for their role, redirect to their dashboard
    if (!isAllowedRoute) {
      const dashboardRoute = `/${userRole}/dashboard`;
      return NextResponse.redirect(new URL(dashboardRoute, request.url));
    }

    // ✅ Role matches route → allow
    return NextResponse.next();
  } catch (err) {
    console.error("Token validation failed:", err);
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete("token");
    return response;
  }
}

// ✅ use path names
export const config = {
  matcher: [
    "/", //public
    "/admin", //public
    "/teacher", //public
    "/student", //public
    "/admin/auth/login", //public
    "/admin/auth/signup", //public
    "/teacher/auth/login", //public
    "/student/auth/login", //public
    "/admin/:path*", //protected
    "/student/:path*", //protected
    "/teacher/:path*", //protected
  ],
};
