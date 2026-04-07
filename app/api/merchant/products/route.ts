import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/current-user";
import {
  createMerchantProduct,
  merchantProductInputSchema,
} from "@/lib/products";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const user = await getCurrentUser();

  if (!user || user.role !== "MERCHANT") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const activeOnly = searchParams.get("activeOnly") === "true";

  const products = await prisma.product.findMany({
    where: {
      merchantId: user.id,
      ...(activeOnly ? { isActive: true } : {}),
    },
    select: {
      id: true,
      name: true,
      price: true,
      commissionRate: true,
      description: true,
      originalUrl: true,
      slug: true,
      isActive: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user || user.role !== "MERCHANT") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsedData = merchantProductInputSchema.safeParse(body);

  if (!parsedData.success) {
    return NextResponse.json(
      {
        error: "Invalid product data",
        issues: parsedData.error.issues,
      },
      { status: 400 },
    );
  }

  const product = await createMerchantProduct(user.id, parsedData.data);

  revalidatePath("/dashboard/merchant/products");

  return NextResponse.json(product, { status: 201 });
}
