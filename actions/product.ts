// actions/product.ts
"use server";

import { getCurrentUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addProduct(data: {
  name: string;
  price: number;
  commissionRate: number;
  description?: string;
  originalUrl: string;
}) {
  const user = await getCurrentUser();

  if (!user || user.role !== "MERCHANT") {
    throw new Error("Unauthorized");
  }

  const slug = data.name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now().toString().slice(-6);

  await prisma.product.create({
    data: {
      merchantId: user.id,
      name: data.name,
      price: data.price,
      commissionRate: data.commissionRate,
      description: data.description,
      originalUrl: data.originalUrl,
      slug,
    },
  });

  revalidatePath("/dashboard/merchant/products");
}