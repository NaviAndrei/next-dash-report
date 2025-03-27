import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the path
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/auth/login' || path === '/auth/register' || path === '/';
  
  // Check if the user is authenticated by looking for the auth token in cookies
  const authToken = request.cookies.get('auth-token')?.value;
  const isAuthTokenValid = authToken && authToken.includes('"isAuthenticated":true');
  
  // Debug log - would be visible in server logs only
  console.log(`Middleware check: path=${path}, authToken=${!!authToken}, isPublicPath=${isPublicPath}, isAuthTokenValid=${isAuthTokenValid}`);
  
  // Redirect logic
  // If the user is not authenticated and trying to access a protected route
  if (!isAuthTokenValid && !isPublicPath) {
    console.log('Redirecting to login (not authenticated)');
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  // If the user is authenticated and trying to access a login/register page
  if (isAuthTokenValid && isPublicPath && path !== '/') {
    console.log('Redirecting to dashboard (already authenticated)');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Allow the request to proceed normally
  console.log('Allowing request to proceed');
  return NextResponse.next();
}

// Configure which paths this middleware will run on
export const config = {
  matcher: ['/', '/dashboard/:path*', '/auth/login', '/auth/register'],
}; 