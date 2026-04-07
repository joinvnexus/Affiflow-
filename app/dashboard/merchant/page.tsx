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

export default async function MerchantDashboard() {
  const user = await getCurrentUser();

  if (user?.role !== "MERCHANT") {
    redirect("/onboarding");
  }

  const [totalProducts, totalSales, paidCommissions] = await Promise.all([
    prisma.product.count({ where: { merchantId: user.id } }),
    prisma.sale.count({ where: { merchantId: user.id } }),
    prisma.sale.aggregate({
      where: {
        merchantId: user.id,
        status: "PAID",
      },
      _sum: { commissionAmount: true },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Merchant dashboard</h1>
        <p className="text-gray-500">Manage products, confirm sales, and track payout obligations.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Total products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalProducts}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Confirmed sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalSales}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Commissions paid</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{formatCurrency(paidCommissions._sum.commissionAmount || 0)}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
