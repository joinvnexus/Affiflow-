import { redirect } from "next/navigation";
import { AffiliateLinksOverview } from "@/components/dashboard/AffiliateLinksOverview";
import { getCurrentUser } from "@/lib/current-user";

export default async function AffiliateLinksPage() {
  const user = await getCurrentUser();

  if (user?.role !== "AFFILIATE") {
    redirect("/onboarding");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My links</h1>
        <p className="text-gray-500">Review your generated referral links and tracked clicks.</p>
      </div>

      <AffiliateLinksOverview affiliateId={user.id} />
    </div>
  );
}
