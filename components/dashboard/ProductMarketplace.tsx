"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, DollarSign, TrendingUp } from "lucide-react";
import { GetLinkButton } from "./GetLinkButton";

interface Product {
  id: string;
  name: string;
  price: number;
  commissionRate: number;
  description: string | null;
  imageUrl: string | null;
  originalUrl: string;
  slug: string;
  isActive: boolean;
  createdAt: Date;
  merchant: {
    name: string | null;
    email: string;
  };
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ProductMarketplace({ products: initialProducts }: { products: Product[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = initialProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    product.merchant.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (initialProducts.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-500">No active products available right now.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
        <Input
          type="text"
          placeholder="Search products by name, description, or merchant..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Results count */}
      {searchQuery && (
        <p className="text-sm text-gray-500">
          Showing {filteredProducts.length} of {initialProducts.length} products
        </p>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => {
          const commissionAmount = (product.price * product.commissionRate) / 100;

          return (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {product.imageUrl ? (
                <div className="relative h-48 w-full">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  <div className="text-center">
                    <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No image</p>
                  </div>
                </div>
              )}

              <CardHeader>
                <CardTitle className="line-clamp-2 text-lg">{product.name}</CardTitle>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge className="font-semibold">
                    {formatCurrency(product.price)}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {product.commissionRate}%
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Earn {formatCurrency(commissionAmount)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                  {product.description || "No description provided."}
                </p>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                    {(product.merchant.name || product.merchant.email)[0].toUpperCase()}
                  </div>
                  <span>By {product.merchant.name || product.merchant.email}</span>
                </div>

                <GetLinkButton productId={product.id} productName={product.name} />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">No products match your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
