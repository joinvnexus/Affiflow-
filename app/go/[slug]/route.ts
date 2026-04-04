import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: unknown) {
  const { params } = context as { params: { slug: string } };

  const link = await prisma.link.findUnique({
    where: { shortSlug: params.slug },
    include: { product: true },
  });

  if (!link) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.redirect(link.product.originalUrl);
}
