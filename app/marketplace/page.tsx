// app/marketplace/page.tsx
import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import { ProductMarketplace } from "@/components/dashboard/ProductMarketplace";
import { prisma } from "@/lib/prisma";

export default async function MarketplacePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (!user.role) {
    redirect("/onboarding");
  }

  // Merchant-দের জন্য এই পেজ না, তাই Merchant-কে redirect করবো
  if (user.role === "MERCHANT") {
    redirect("/dashboard/merchant/products");
  }

  // Fetch products server-side
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: {
      merchant: {
        select: { name: true, email: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <p className="text-gray-500">Browse products and start earning commission</p>
      </div>

      <ProductMarketplace products={products} />
    </div>
  );
}
