import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

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

export default clerkMiddleware(async (auth, req) => {
  // If the route is not public and not ignored, protect it
  if (!isPublicRoute(req) && !isIgnoredRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
