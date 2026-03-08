import { NextRequest, NextResponse } from 'next/server';
import { checkSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const authRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  let accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const { pathname } = request.nextUrl;
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isPrivateRoute && !accessToken && refreshToken) {
    try {
      await checkSession();
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  if (isPrivateRoute && !accessToken) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
