import { auth } from "@clerk/nextjs/server";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

// Admin access check for client components
// Checks if user has admin role in their metadata
export const isAdmin = async () => {
  const { userId, sessionClaims } = await auth();
  if (!userId) return false;
  
  // Check if the user has admin role in their metadata
  const userRole = sessionClaims?.metadata?.role as string;
  return userRole === 'admin';
};

// Moderator access check for client components
// Checks if user has admin or moderator role in their metadata
export const isModerator = async () => {
  const { userId, sessionClaims } = await auth();
  if (!userId) return false;
  
  // Check if the user has admin or moderator role in their metadata
  const userRole = sessionClaims?.metadata?.role as string;
  return userRole === 'admin' || userRole === 'moderator';
};

// Admin access check for API routes
export const isAdminFromRequest = async (req: NextRequest): Promise<boolean> => {
  const { userId, sessionClaims } = getAuth(req);
  if (!userId) return false;
  
  // Check if the user has admin role in their metadata
  const userRole = sessionClaims?.metadata?.role as string;
  return userRole === 'admin';
};

// Moderator access check for API routes
export const isModeratorFromRequest = async (req: NextRequest): Promise<boolean> => {
  const { userId, sessionClaims } = getAuth(req);
  if (!userId) return false;
  
  // Check if the user has admin or moderator role in their metadata
  const userRole = sessionClaims?.metadata?.role as string;
  return userRole === 'admin' || userRole === 'moderator';
};

// Get admin user ID
export const getAdminId = async () => {
  const { userId } = await auth();
  return userId;
};

// Get user role from client components
export const getUserRole = async (): Promise<string | undefined> => {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata?.role as string | undefined;
};

// Get user role from API routes
export const getUserRoleFromRequest = (req: NextRequest): string | undefined => {
  const { sessionClaims } = getAuth(req);
  return sessionClaims?.metadata?.role as string | undefined;
};
