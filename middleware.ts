import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/products(.*)",
  "/api/products(.*)",
  "/api/webhooks(.*)",
  "/api/seed",
  "/categories(.*)",
  "/search(.*)",
  "/checkout(.*)",
]);

// Define webhook routes to be ignored
const isIgnoredRoute = createRouteMatcher([
  "/api/webhooks/clerk",
]);

// Define admin routes that require admin role
const isAdminRoute = createRouteMatcher([
  "/admin(.*)",
  "/api/admin(.*)",
]);

// Define moderator routes that require moderator or admin role
const isModeratorRoute = createRouteMatcher([
  "/moderator(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // If the route is ignored, allow it through
  if (isIgnoredRoute(req)) {
    return;
  }
  
  // If the route is not public, protect it
  if (!isPublicRoute(req)) {
    // First check if user is authenticated
    const authObject = await auth.protect();
    
    // Get user role from session claims
    const userRole = authObject.sessionClaims?.metadata?.role as string;
    
    // Check if trying to access admin routes
    if (isAdminRoute(req) && userRole !== 'admin') {
      // Redirect to home page if not admin
      return NextResponse.redirect(new URL('/', req.url));
    }
    
    // Check if trying to access moderator routes
    if (isModeratorRoute(req) && userRole !== 'admin' && userRole !== 'moderator') {
      // Redirect to home page if not admin or moderator
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
