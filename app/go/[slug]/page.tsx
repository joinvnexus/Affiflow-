// app/go/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

interface Props {
  params: { slug: string };
}

export default async function ShortLinkRedirect({ params }: Props) {
  const link = await prisma.link.findUnique({
    where: { shortSlug: params.slug },
    include: {
      product: true,
    },
  });

  if (!link) {
    redirect("/");
  }

  // Optional: Click count বাড়ানো (শুরুতে সিম্পল রাখছি)
  // পরে middleware দিয়ে আরও ভালো ট্র্যাকিং করা যাবে

  // Redirect to original product URL
  redirect(link.product.originalUrl);
}