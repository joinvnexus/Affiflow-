import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const link = await prisma.link.findUnique({
    where: { shortSlug: slug },
    include: { product: true },
  });

  if (!link || !link.product.isActive) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  await prisma.link.update({
    where: { id: link.id },
    data: {
      clicks: { increment: 1 },
    },
  });

  return NextResponse.redirect(link.product.originalUrl);
}
