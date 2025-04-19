import { auth } from "@clerk/nextjs";

// Admin access check - in a real application, you would check for admin role
// For now, we'll just check if the user is authenticated
export const isAdmin = () => {
  const { userId } = auth();
  return !!userId;
};

// Get admin user ID
export const getAdminId = () => {
  const { userId } = auth();
  return userId;
};
