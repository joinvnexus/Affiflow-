// lib/current-user.ts
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function getCurrentUser() {
  const clerkUser = await currentUser();
  
  if (!clerkUser) {
    return null;
  }

  let user = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id },
  });

  const email =
    clerkUser.primaryEmailAddress?.emailAddress ||
    clerkUser.emailAddresses[0]?.emailAddress ||
    "";

  // Email is required/unique in our DB schema. Some Clerk configurations may not
  // provide an email (e.g. phone-only signups), so we fall back to a stable
  // synthetic address to avoid unique constraint violations.
  const ensuredEmail = email || `clerk_${clerkUser.id}@noemail.local`;

  if (!user && ensuredEmail) {
    user = await prisma.user.findUnique({
      where: { email: ensuredEmail },
    });

    if (user) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { clerkId: clerkUser.id },
      });
    }
  }

  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email: ensuredEmail,
        name: clerkUser.fullName || clerkUser.firstName || "User",
      },
    });
  }

  return user;
}