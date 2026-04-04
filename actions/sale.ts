// actions/sale.ts
"use server";

import { prisma } from "@/lib/prisma";

export async function confirmSale(data: {
  productId: string;
  amount: number;
  affiliateId: string;
  merchantId: string;
}) {
  const product = await prisma.product.findUnique({
    where: { id: data.productId },
  });

  if (!product) throw new Error("Product not found");

  const commissionAmount = (data.amount * product.commissionRate) / 100;

  await prisma.sale.create({
    data: {
      productId: data.productId,
      affiliateId: data.affiliateId,
      merchantId: data.merchantId,
      amount: data.amount,
      commissionAmount,
      status: "CONFIRMED",
    },
  });

  // Revalidate earnings page
  // revalidatePath("/dashboard/affiliate/earnings");
}