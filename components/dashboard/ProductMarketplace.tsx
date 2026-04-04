// components/dashboard/ProductMarketplace.tsx
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GetLinkButton } from "./GetLinkButton";
import Image from "next/image";
export async function ProductMarketplace() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: {
      merchant: {
        select: { name: true, email: true }
      }
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          {product.imageUrl && (
            <Image
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-48 object-cover"
            />
          )}
          
          <CardHeader>
            <CardTitle className="line-clamp-2">{product.name}</CardTitle>
            <div className="flex gap-2 mt-2">
              <Badge variant="default">৳{product.price}</Badge>
              <Badge variant="secondary">{product.commissionRate}% Commission</Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600 line-clamp-3">
              {product.description}
            </p>

            <div className="text-xs text-gray-500">
              By: {product.merchant.name || product.merchant.email}
            </div>

            <GetLinkButton 
              productId={product.id}
              productName={product.name}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}