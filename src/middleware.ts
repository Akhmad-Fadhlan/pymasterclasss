import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Retrieve all cookies to look for the Supabase authentication token cookie
  const allCookies = req.cookies.getAll();
  const hasAuthSession = allCookies.some(
    (cookie) => cookie.name.startsWith("sb-") && cookie.name.endsWith("-auth-token")
  );

  // Define route classifications
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/learning") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/onboarding") ||
    pathname.startsWith("/checkout");

  // 1. Unauthenticated users trying to access protected routes -> redirect to login
  if (isProtectedRoute && !hasAuthSession) {
    const loginUrl = new URL("/login", req.url);
    // Keep reference to the originally requested route to redirect back after login
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Authenticated users trying to access login/register -> redirect to dashboard
  if (isAuthRoute && hasAuthSession) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Allow the request to proceed if checks pass
  return NextResponse.next();
}

// Configure middleware coverage paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes (/api)
     * - static files (/_next/static, /_next/image, favicon.ico)
     * - images/media assets in public folder
     */
    "/((?!api|_next/static|_next/image|images|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)",
  ],
};
