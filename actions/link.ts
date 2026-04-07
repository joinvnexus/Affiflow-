"use server";

import { getCurrentUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

async function generateUniqueShortSlug(baseSlug: string) {
  let attempt = 0;

  while (true) {
    const suffix = Math.random().toString(36).slice(2, 8);
    const shortSlug = `${baseSlug}-${suffix}`;

    const existingLink = await prisma.link.findUnique({
      where: { shortSlug },
      select: { id: true },
    });

    if (!existingLink) {
      return shortSlug;
    }

    attempt += 1;

    if (attempt > 10) {
      throw new Error("Could not generate a unique referral slug");
    }
  }
}

export async function generateLink(productId: string) {
  const user = await getCurrentUser();

  if (!user || user.role !== "AFFILIATE") {
    throw new Error("Only affiliates can generate links");
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: {
      id: true,
      slug: true,
      originalUrl: true,
      isActive: true,
    },
  });

  if (!product || !product.isActive) {
    throw new Error("Product not found or inactive");
  }

  let existingLink = await prisma.link.findFirst({
    where: {
      productId,
      affiliateId: user.id,
    },
  });

  if (!existingLink) {
    existingLink = await prisma.link.create({
      data: {
        productId,
        affiliateId: user.id,
        shortSlug: await generateUniqueShortSlug(product.slug),
      },
    });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const shortLink = `${appUrl}/go/${existingLink.shortSlug}`;

  return {
    shortLink,
    originalLink: `${product.originalUrl}?aff=${user.id}`,
  };
}
