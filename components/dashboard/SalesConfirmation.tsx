// components/dashboard/SalesConfirmation.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { confirmSale } from "@/actions/sale";

interface SalesConfirmationProps {
  merchantId: string;
}

interface ProductItem {
  id: string;
  name: string;
  price: number;
  commissionRate: number;
}

export function SalesConfirmation({ merchantId }: SalesConfirmationProps) {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [affiliateId, setAffiliateId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("/api/merchant/products")
      .then(res => res.json())
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
        merchantId,
      });
      
      alert("Sale confirmed successfully!");
      setAmount("");
      setAffiliateId("");
      setSelectedProduct("");
    } catch (error) {
      console.error(error);
      alert("Failed to confirm sale");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <Label>Select Product</Label>
            <select 
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full p-3 border rounded-lg mt-1"
            >
              <option value="">-- Select Product --</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} (৳{product.price} - {product.commissionRate}%)
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Sale Amount (৳)</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="5000"
            />
          </div>

          <div>
            <Label>Affiliate ID (from link)</Label>
            <Input
              value={affiliateId}
              onChange={(e) => setAffiliateId(e.target.value)}
              placeholder="user_2abc123xyz..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Affiliate-এর Clerk User ID দাও (লিংকে ?aff=... থেকে পাবে)
            </p>
          </div>

          <Button 
            onClick={handleConfirm} 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Confirming Sale..." : "Confirm Sale & Credit Commission"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}