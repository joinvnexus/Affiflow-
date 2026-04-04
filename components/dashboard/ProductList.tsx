// components/dashboard/ProductList.tsx
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductListProps {
  merchantId: string;
}

export async function ProductList({ merchantId }: ProductListProps) {
  const products = await prisma.product.findMany({
    where: { merchantId, isActive: true },
    orderBy: { createdAt: "desc" },
  });

  if (products.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-500">No products added yet.</p>
          <p className="text-sm text-gray-400 mt-2">Click &quot;Add New Product&quot; to get started.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id}>
          <CardHeader>
            <CardTitle className="line-clamp-2">{product.name}</CardTitle>
            <div className="flex gap-2">
              <Badge variant="secondary">৳{product.price}</Badge>
              <Badge>{product.commissionRate}% Commission</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 line-clamp-3">{product.description}</p>
            <div className="mt-4 text-xs text-gray-400 break-all">
              {product.originalUrl}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}