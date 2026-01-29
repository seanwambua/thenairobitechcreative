import { auth } from '@/auth';
import { NextResponse } from 'next/server';

// 1. Configuration: Centralize your route logic for easier maintenance
const AUTH_ROUTES = ['/login', '/signup'];
const PROTECTED_ROUTES = ['/dashboard'];
const DEFAULT_REDIRECT = '/dashboard';

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session;
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // QA Scenario A: Authenticated user tries to access /login or /signup
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  // QA Scenario B: Unauthenticated user tries to access a protected route
  if (!isLoggedIn && isProtectedRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return NextResponse.next();
});

// 2. Optimization: Ensure the middleware doesn't run on static assets
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
