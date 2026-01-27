import { auth } from '@/auth';
import { NextResponse, type NextRequest } from 'next/server';
import type { Session } from 'next-auth';

interface AppRouteRequest extends NextRequest {
  auth: Session | null;
}

export default auth((req: AppRouteRequest) => {
  if (!req.auth && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
  }
});