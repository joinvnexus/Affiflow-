import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const merchantProductInputSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters"),
  price: z.number().positive("Price must be positive"),
  commissionRate: z
    .number()
    .min(1, "Commission rate must be at least 1%")
    .max(100, "Commission rate cannot exceed 100%"),
  description: z.string().trim().max(1000).optional().or(z.literal("")),
  originalUrl: z.url("Please enter a valid URL"),
});

export type MerchantProductInput = z.infer<typeof merchantProductInputSchema>;

function slugifyProductName(name: string) {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "product"
  );
}

async function generateUniqueProductSlug(name: string) {
  const baseSlug = slugifyProductName(name);
  let suffix = 0;

  while (true) {
    const candidate =
      suffix === 0 ? baseSlug : `${baseSlug}-${Math.random().toString(36).slice(2, 8)}`;

    const existingProduct = await prisma.product.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });

    if (!existingProduct) {
      return candidate;
    }

    suffix += 1;
  }
}

export async function createMerchantProduct(
  merchantId: string,
  data: MerchantProductInput,
) {
  const slug = await generateUniqueProductSlug(data.name);

  return prisma.product.create({
    data: {
      merchantId,
      name: data.name,
      price: data.price,
      commissionRate: data.commissionRate,
      description: data.description || null,
      originalUrl: data.originalUrl,
      slug,
    },
  });
}
