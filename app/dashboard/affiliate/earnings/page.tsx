// app/dashboard/affiliate/earnings/page.tsx
import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import { EarningsOverview } from "@/components/dashboard/EarningsOverview";

export default async function EarningsPage() {
  const user = await getCurrentUser();

  if (user?.role !== "AFFILIATE") {
    redirect("/onboarding");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Earnings</h1>
        <p className="text-gray-500">Track your commission from promotions</p>
      </div>

      <EarningsOverview affiliateId={user.id} />
    </div>
  );
}