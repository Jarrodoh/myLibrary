import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED = ['/', '/view', '/api/upload', '/api/list', '/api/delete', '/api/sign'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const needs = PROTECTED.some(p => pathname === p || pathname.startsWith(p + '/'));
  if (!needs) return NextResponse.next();

  const cookie = req.cookies.get('passcode')?.value;
  if (cookie && process.env.PASSCODE && cookie === process.env.PASSCODE) {
    return NextResponse.next();
  }
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = '/login';
  loginUrl.searchParams.set('redirect', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = { matcher: ['/', '/view', '/api/:path*'] };
