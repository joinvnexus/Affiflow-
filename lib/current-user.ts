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

  if (!user && email) {
    user = await prisma.user.findUnique({
      where: { email },
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
        email,
        name: clerkUser.fullName || clerkUser.firstName || "User",
      },
    });
  }

  return user;
}