import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const redirections: Record<string, string> = {
    '/admin/user': '/admin/users',
    '/signin' : '/handler/sign-in',
    '/sign-in' : '/handler/sign-in',
    '/signup' : '/handler/sign-up',
    '/sign-up' : '/handler/sign-up',
    '/login' : '/handler/sign-in',
    '/register' : '/handler/sign-up',
  };

  if (redirections[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = redirections[pathname];
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}