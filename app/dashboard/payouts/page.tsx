import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function PayoutsPage() {
  const user = await getCurrentUser();

  if (!user || !user.role) {
    redirect("/onboarding");
  }

  if (user.role === "MERCHANT") {
    const sales = await prisma.sale.findMany({
      where: { merchantId: user.id },
      include: {
        affiliate: {
          select: { name: true, email: true },
        },
        product: {
          select: { name: true },
        },
      },
      orderBy: { saleDate: "desc" },
    });

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Payout tracking</h1>
          <p className="text-gray-500">Monitor what you owe affiliates and what has already been paid.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Merchant payout ledger</CardTitle>
          </CardHeader>
          <CardContent>
            {sales.length === 0 ? (
              <p className="text-sm text-gray-500">No sales recorded yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="py-3">Affiliate</th>
                      <th className="py-3">Product</th>
                      <th className="py-3">Commission</th>
                      <th className="py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.map((sale) => (
                      <tr key={sale.id} className="border-b last:border-0">
                        <td className="py-4">{sale.affiliate.name || sale.affiliate.email}</td>
                        <td className="py-4">{sale.product.name}</td>
                        <td className="py-4">{formatCurrency(sale.commissionAmount)}</td>
                        <td className="py-4">
                          <Badge variant={sale.status === "PAID" ? "default" : "secondary"}>
                            {sale.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  const sales = await prisma.sale.findMany({
    where: { affiliateId: user.id },
    include: {
      product: {
        select: { name: true },
      },
    },
    orderBy: { saleDate: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payout tracking</h1>
        <p className="text-gray-500">See which commissions are pending, confirmed, or paid.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Affiliate payout ledger</CardTitle>
        </CardHeader>
        <CardContent>
          {sales.length === 0 ? (
            <p className="text-sm text-gray-500">No payout activity yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-3">Product</th>
                    <th className="py-3">Commission</th>
                    <th className="py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale) => (
                    <tr key={sale.id} className="border-b last:border-0">
                      <td className="py-4">{sale.product.name}</td>
                      <td className="py-4">{formatCurrency(sale.commissionAmount)}</td>
                      <td className="py-4">
                        <Badge variant={sale.status === "PAID" ? "default" : "secondary"}>
                          {sale.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
