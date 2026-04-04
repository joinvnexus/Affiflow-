"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function setUserRole(role: "MERCHANT" | "AFFILIATE") {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Update user role in database
    const user = await prisma.user.update({
      where: { clerkId: userId },
      data: { role },
    });

    return user;
  } catch (error) {
    console.error("Error setting user role:", error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function checkUserOnboarded() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return false;
    }

    // Check if user has a role set (means they've completed onboarding)
    return user.role !== null;
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    return false;
  }
}
