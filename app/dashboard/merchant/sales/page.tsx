import { redirect } from "next/navigation";
import { SalesConfirmation } from "@/components/dashboard/SalesConfirmation";
import { MerchantSalesTable } from "@/components/dashboard/MerchantSalesTable";
import { getCurrentUser } from "@/lib/current-user";

export default async function MerchantSalesPage() {
  const user = await getCurrentUser();

  if (user?.role !== "MERCHANT") {
    redirect("/onboarding");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Sales and payouts</h1>
        <p className="text-gray-500">Confirm affiliate-driven sales and mark commissions as paid.</p>
      </div>

      <SalesConfirmation />
      <MerchantSalesTable merchantId={user.id} />
    </div>
  );
}
