import { redirect } from "next/navigation";
import { ProductMarketplace } from "@/components/dashboard/ProductMarketplace";
import { getCurrentUser } from "@/lib/current-user";

export default async function DashboardMarketplacePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (user.role !== "AFFILIATE") {
    redirect("/dashboard/merchant");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <p className="text-gray-500">Browse active offers and generate your personal referral links.</p>
      </div>

      <ProductMarketplace />
    </div>
  );
}
