"use server";

import { getCurrentUser } from "@/lib/current-user";
import { createMerchantProduct, merchantProductInputSchema } from "@/lib/products";
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

  const parsedData = merchantProductInputSchema.parse(data);

  await createMerchantProduct(user.id, parsedData);

  revalidatePath("/dashboard/merchant/products");
}
