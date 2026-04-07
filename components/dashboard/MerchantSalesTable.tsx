import { markSalePaid } from "@/actions/sale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

interface MerchantSalesTableProps {
  merchantId: string;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export async function MerchantSalesTable({ merchantId }: MerchantSalesTableProps) {
  const sales = await prisma.sale.findMany({
    where: { merchantId },
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
    <Card>
      <CardHeader>
        <CardTitle>Recent sales</CardTitle>
      </CardHeader>
      <CardContent>
        {sales.length === 0 ? (
          <p className="text-sm text-gray-500">No affiliate sales have been confirmed yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3">Product</th>
                  <th className="py-3">Affiliate</th>
                  <th className="py-3">Sale amount</th>
                  <th className="py-3">Commission</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id} className="border-b last:border-0">
                    <td className="py-4 font-medium">{sale.product.name}</td>
                    <td className="py-4">{sale.affiliate.name || sale.affiliate.email}</td>
                    <td className="py-4">{formatCurrency(sale.amount)}</td>
                    <td className="py-4">{formatCurrency(sale.commissionAmount)}</td>
                    <td className="py-4">
                      <Badge variant={sale.status === "PAID" ? "default" : "secondary"}>
                        {sale.status}
                      </Badge>
                    </td>
                    <td className="py-4">
                      {sale.status === "CONFIRMED" ? (
                        <form action={markSalePaid.bind(null, sale.id)}>
                          <Button type="submit" size="sm">Mark paid</Button>
                        </form>
                      ) : (
                        <span className="text-xs text-gray-500">No action</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
