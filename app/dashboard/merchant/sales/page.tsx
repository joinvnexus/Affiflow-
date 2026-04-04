// app/dashboard/merchant/sales/page.tsx
import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import { SalesConfirmation } from "@/components/dashboard/SalesConfirmation";

export default async function MerchantSalesPage() {
  const user = await getCurrentUser();

  if (user?.role !== "MERCHANT") {
    redirect("/onboarding");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Confirm Sales</h1>
        <p className="text-gray-500">Enter sales that came through affiliate links</p>
      </div>

      <SalesConfirmation merchantId={user.id} />
    </div>
  );
}