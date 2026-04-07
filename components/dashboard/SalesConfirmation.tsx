"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { confirmSale } from "@/actions/sale";

interface ProductItem {
  id: string;
  name: string;
  price: number;
  commissionRate: number;
}

export function SalesConfirmation() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [affiliateId, setAffiliateId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("/api/merchant/products?activeOnly=true")
      .then((res) => res.json())
      .then((data: ProductItem[]) => setProducts(data));
  }, []);

  const handleConfirm = async () => {
    if (!selectedProduct || !amount || !affiliateId) {
      alert("All fields are required");
      return;
    }

    setIsLoading(true);
    try {
      await confirmSale({
        productId: selectedProduct,
        amount: parseFloat(amount),
        affiliateId,
      });

      alert("Sale confirmed successfully.");
      setAmount("");
      setAffiliateId("");
      setSelectedProduct("");
    } catch (error) {
      console.error(error);
      alert("Failed to confirm sale.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <Label>Select product</Label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="mt-1 w-full rounded-lg border p-3"
            >
              <option value="">-- Select product --</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} ({product.price} - {product.commissionRate}%)
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Sale amount</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="5000"
            />
          </div>

          <div>
            <Label>Affiliate user ID</Label>
            <Input
              value={affiliateId}
              onChange={(e) => setAffiliateId(e.target.value)}
              placeholder="Paste the affiliate user ID"
            />
            <p className="mt-1 text-xs text-gray-500">
              Use the affiliate user ID associated with the referral link that generated the sale.
            </p>
          </div>

          <Button onClick={handleConfirm} className="w-full" disabled={isLoading}>
            {isLoading ? "Confirming sale..." : "Confirm sale and credit commission"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
