import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/projects(.*)", "/appform(.*)", "/settings(.*)"]);
const isPublicRoute = createRouteMatcher(["/test-templates"]);

// This middleware will check if the user is authenticated before accessing protected routes

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return; // Allow access to test routes
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: ["/((?!.\\..|_next).*)", "/"],
};