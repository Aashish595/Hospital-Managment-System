import { authMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: ['/', '/sign-in', '/sign-up', '/choose-role'],
  afterAuth(auth, req) {
    const { userId, isPublicRoute } = auth;

    // If user is not logged in and trying to access a protected route
    if (!userId && !isPublicRoute) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    // If user is logged in and tries to access a public route
    if (userId && isPublicRoute) {
      const user = auth.user;
      const role = user?.publicMetadata?.role;

      if (role) {
        return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
      } else {
        return NextResponse.redirect(new URL('/choose-role', req.url));
      }
    }

    // If user is logged in but has no role and tries to access protected route
    if (userId && !isPublicRoute) {
      const user = auth.user;
      const role = user?.publicMetadata?.role;

      if (!role) {
        return NextResponse.redirect(new URL('/choose-role', req.url));
      }
    }
  }
});

// export const config = {
//   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// };