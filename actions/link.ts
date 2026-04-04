// actions/link.ts
"use server";

import { getCurrentUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";
// import { revalidatePath } from "next/cache";

export async function generateLink(productId: string) {
  const user = await getCurrentUser();

  if (!user || user.role !== "AFFILIATE") {
    throw new Error("Only affiliates can generate links");
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) throw new Error("Product not found");

  // Check if link already exists for this product + affiliate
  let existingLink = await prisma.link.findFirst({
    where: {
      productId,
      affiliateId: user.id,
    },
  });

  if (!existingLink) {
    const shortSlug = `${product.slug}-${user.id.slice(0, 8)}`;

    existingLink = await prisma.link.create({
      data: {
        productId,
        affiliateId: user.id,
        shortSlug,
      },
    });
  }

  const shortLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/go/${existingLink.shortSlug}`;

  return {
    shortLink,
    originalLink: `${product.originalUrl}?aff=${user.id}`,
  };
}