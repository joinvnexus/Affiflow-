// components/dashboard/EarningsOverview.tsx
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EarningsOverviewProps {
  affiliateId: string;
}

export async function EarningsOverview({ affiliateId }: EarningsOverviewProps) {
  const sales = await prisma.sale.findMany({
    where: { 
      affiliateId,
      status: "CONFIRMED" 
    },
    include: {
      product: true,
    },
    orderBy: { saleDate: "desc" },
  });

  const totalEarnings = sales.reduce((sum, sale) => sum + sale.commissionAmount, 0);
  const pendingSales = await prisma.sale.count({
    where: { 
      affiliateId,
      status: "PENDING" 
    },
  });

  if (sales.length === 0) {
    return (
      <Card>
        <CardContent className="py-16 text-center">
          <p className="text-2xl font-medium text-gray-400">No earnings yet</p>
          <p className="text-gray-500 mt-3">Start promoting products to earn commission</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Total Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">৳{totalEarnings.toFixed(0)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Confirmed Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{sales.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{pendingSales}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Earnings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Product</th>
                  <th className="text-left py-3">Amount</th>
                  <th className="text-left py-3">Commission</th>
                  <th className="text-left py-3">Status</th>
                  <th className="text-left py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {sales.slice(0, 10).map((sale) => (
                  <tr key={sale.id} className="border-b last:border-0">
                    <td className="py-4 font-medium">{sale.product.name}</td>
                    <td className="py-4">৳{sale.amount}</td>
                    <td className="py-4 font-medium text-green-600">
                      ৳{sale.commissionAmount}
                    </td>
                    <td className="py-4">
                      <Badge variant={sale.status === "CONFIRMED" ? "default" : "secondary"}>
                        {sale.status}
                      </Badge>
                    </td>
                    <td className="py-4 text-sm text-gray-500">
                      {new Date(sale.saleDate).toLocaleDateString()}
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