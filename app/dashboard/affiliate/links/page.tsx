import { redirect } from "next/navigation";
import { AffiliateLinksOverview } from "@/components/dashboard/AffiliateLinksOverview";
import { getCurrentUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

export default async function AffiliateLinksPage() {
  const user = await getCurrentUser();

  if (user?.role !== "AFFILIATE") {
    redirect("/onboarding");
  }

  // Fetch links server-side
  const links = await prisma.link.findMany({
    where: { affiliateId: user.id },
    include: {
      product: {
        select: {
          name: true,
          commissionRate: true,
          price: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My links</h1>
        <p className="text-gray-500">Review your generated referral links and tracked clicks.</p>
      </div>

      <AffiliateLinksOverview affiliateId={user.id} links={links} />
    </div>
  );
}
