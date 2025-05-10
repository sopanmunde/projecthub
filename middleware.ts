import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*), /dashboard/settings(.*)"]);

// This middleware will check if the user is authenticated before accessing protected routes

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: ["/((?!.\\..|_next).*)", "/"],
};