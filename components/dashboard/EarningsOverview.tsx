import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

interface EarningsOverviewProps {
  affiliateId: string;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export async function EarningsOverview({ affiliateId }: EarningsOverviewProps) {
  const sales = await prisma.sale.findMany({
    where: {
      affiliateId,
      status: {
        in: ["PENDING", "CONFIRMED", "PAID"],
      },
    },
    include: {
      product: {
        select: { name: true },
      },
    },
    orderBy: { saleDate: "desc" },
  });

  const pendingAmount = sales
    .filter((sale) => sale.status === "PENDING")
    .reduce((sum, sale) => sum + sale.commissionAmount, 0);
  const confirmedAmount = sales
    .filter((sale) => sale.status === "CONFIRMED")
    .reduce((sum, sale) => sum + sale.commissionAmount, 0);
  const paidAmount = sales
    .filter((sale) => sale.status === "PAID")
    .reduce((sum, sale) => sum + sale.commissionAmount, 0);

  if (sales.length === 0) {
    return (
      <Card>
        <CardContent className="py-16 text-center">
          <p className="text-2xl font-medium text-gray-400">No earnings yet</p>
          <p className="mt-3 text-gray-500">Start promoting products to earn commission.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(pendingAmount)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(confirmedAmount)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(paidAmount)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3">Product</th>
                  <th className="py-3">Sale amount</th>
                  <th className="py-3">Commission</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id} className="border-b last:border-0">
                    <td className="py-4 font-medium">{sale.product.name}</td>
                    <td className="py-4">{formatCurrency(sale.amount)}</td>
                    <td className="py-4 font-medium text-green-600">
                      {formatCurrency(sale.commissionAmount)}
                    </td>
                    <td className="py-4">
                      <Badge variant={sale.status === "PAID" ? "default" : "secondary"}>
                        {sale.status}
                      </Badge>
                    </td>
                    <td className="py-4 text-gray-500">
                      {new Date(sale.saleDate).toLocaleDateString("en-US")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
