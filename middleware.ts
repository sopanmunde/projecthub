import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/projects(.*)", "/appform(.*)", "/settings(.*)", "/enhanced-dashboard(.*)", "/search(.*)"]);
const isPublicRoute = createRouteMatcher(["/test-templates", "/demo-dashboard.html", "/templates-demo.html"]);

// This middleware will check if the user is authenticated before accessing protected routes

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return; // Allow access to test routes
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: ["/dashboard(.*)", "/projects(.*)", "/appform(.*)", "/settings(.*)", "/enhanced-dashboard(.*)", "/search(.*)"],
};