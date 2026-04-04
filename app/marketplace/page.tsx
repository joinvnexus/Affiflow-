// app/marketplace/page.tsx
import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import { ProductMarketplace } from "@/components/dashboard/ProductMarketplace";

export default async function MarketplacePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Affiliate-দের জন্যই এই পেজ, Merchant-কে redirect করবো
  if (user.role === "MERCHANT") {
    redirect("/dashboard/merchant/products");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <p className="text-gray-500">Browse products and start earning commission</p>
      </div>

      <ProductMarketplace />
    </div>
  );
}