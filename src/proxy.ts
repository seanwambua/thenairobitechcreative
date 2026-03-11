import { auth } from '@/lib/auth'; // Ensure this points to your Auth.js config
import { NextResponse } from 'next/server';

// 1. Scalable Routing Configuration
const AUTH_ROUTES = ['/login', '/signup'];
const PROTECTED_ROUTES = ['/dashboard'];
const DEFAULT_REDIRECT = '/dashboard';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // Scenario A: Authenticated user tries to access /login or /signup
  // Redirect to dashboard to prevent re-authentication
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  // Scenario B: Unauthenticated user tries to access a protected route
  // We capture the intended URL to redirect them back after sign-in
  if (!isLoggedIn && isProtectedRoute) {
    const callbackUrl = encodeURIComponent(`${nextUrl.pathname}${nextUrl.search}`);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, nextUrl)
    );
  }

  return NextResponse.next();
});

// 2. Optimization: Ensure the middleware doesn't run on static assets/images
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};