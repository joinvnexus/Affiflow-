"use server";

import { getCurrentUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function confirmSale(data: {
  productId: string;
  amount: number;
  affiliateId: string;
}) {
  const user = await getCurrentUser();

  if (!user || user.role !== "MERCHANT") {
    throw new Error("Unauthorized");
  }

  const product = await prisma.product.findFirst({
    where: {
      id: data.productId,
      merchantId: user.id,
    },
    select: {
      id: true,
      merchantId: true,
      commissionRate: true,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const affiliate = await prisma.user.findFirst({
    where: {
      id: data.affiliateId,
      role: "AFFILIATE",
    },
    select: { id: true },
  });

  if (!affiliate) {
    throw new Error("Affiliate not found");
  }

  const commissionAmount = (data.amount * product.commissionRate) / 100;

  await prisma.sale.create({
    data: {
      productId: product.id,
      affiliateId: affiliate.id,
      merchantId: user.id,
      amount: data.amount,
      commissionAmount,
      status: "CONFIRMED",
      confirmedAt: new Date(),
    },
  });

  revalidatePath("/dashboard/merchant");
  revalidatePath("/dashboard/merchant/sales");
  revalidatePath("/dashboard/affiliate");
  revalidatePath("/dashboard/affiliate/earnings");
  revalidatePath("/dashboard/payouts");
}

export async function markSalePaid(saleId: string) {
  const user = await getCurrentUser();

  if (!user || user.role !== "MERCHANT") {
    throw new Error("Unauthorized");
  }

  const sale = await prisma.sale.findFirst({
    where: {
      id: saleId,
      merchantId: user.id,
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (!sale) {
    throw new Error("Sale not found");
  }

  if (sale.status === "PAID") {
    return;
  }

  await prisma.sale.update({
    where: { id: sale.id },
    data: {
      status: "PAID",
      paidAt: new Date(),
    },
  });

  revalidatePath("/dashboard/merchant");
  revalidatePath("/dashboard/merchant/sales");
  revalidatePath("/dashboard/affiliate");
  revalidatePath("/dashboard/affiliate/earnings");
  revalidatePath("/dashboard/payouts");
}
