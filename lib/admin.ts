import { auth } from "@clerk/nextjs";

export const getIsAdmin = () => {
  const { userId } = auth();
  const adminIds = process.env.CLERK_ADMIN_IDS?.split(", ");

  if (!userId) return false;

  return adminIds?.indexOf(userId) !== -1;
};
