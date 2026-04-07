import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function AffiliateDashboard() {
  const user = await getCurrentUser();

  if (user?.role !== "AFFILIATE") {
    redirect("/onboarding");
  }

  const [links, clicks, earnings, salesCount] = await Promise.all([
    prisma.link.count({ where: { affiliateId: user.id } }),
    prisma.link.aggregate({
      where: { affiliateId: user.id },
      _sum: { clicks: true },
    }),
    prisma.sale.aggregate({
      where: {
        affiliateId: user.id,
        status: {
          in: ["CONFIRMED", "PAID"],
        },
      },
      _sum: { commissionAmount: true },
    }),
    prisma.sale.count({
      where: {
        affiliateId: user.id,
        status: {
          in: ["CONFIRMED", "PAID"],
        },
      },
    }),
  ]);

  const totalClicks = clicks._sum.clicks || 0;
  const conversionRate = totalClicks === 0 ? 0 : (salesCount / totalClicks) * 100;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Affiliate dashboard</h1>
        <p className="text-gray-500">Generate referral links, track clicks, and monitor commissions.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Total links</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{links}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Total earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{formatCurrency(earnings._sum.commissionAmount || 0)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Conversion rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{conversionRate.toFixed(1)}%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
