import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { GetLinkButton } from "./GetLinkButton";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export async function ProductMarketplace() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: {
      merchant: {
        select: { name: true, email: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  if (products.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-500">No active products available right now.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={1200}
              height={800}
              className="h-48 w-full object-cover"
            />
          ) : (
            <div className="flex h-48 items-center justify-center bg-gray-100 text-sm text-gray-500 dark:bg-gray-800">
              No product image
            </div>
          )}

          <CardHeader>
            <CardTitle className="line-clamp-2">{product.name}</CardTitle>
            <div className="mt-2 flex gap-2">
              <Badge>{formatCurrency(product.price)}</Badge>
              <Badge variant="secondary">{product.commissionRate}% commission</Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
              {product.description || "No description provided."}
            </p>

            <div className="text-xs text-gray-500">
              By {product.merchant.name || product.merchant.email}
            </div>

            <GetLinkButton productId={product.id} productName={product.name} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
