// components/dashboard/AddProductModal.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { addProduct } from "@/actions/product";

const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  price: z.number().positive("Price must be positive"),
  commissionRate: z.number().min(1).max(100),
  description: z.string().optional(),
  originalUrl: z.string().url("Please enter a valid URL"),
});

type ProductForm = z.infer<typeof productSchema>;

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: ProductForm) => {
    setIsLoading(true);
    try {
      await addProduct(data);
      reset();
      onClose();
      window.location.reload(); // Refresh to show new product
    } catch (error) {
      console.error(error);
      alert("Failed to add product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Product Name</Label>
            <Input {...register("name")} placeholder="Wireless Earbuds" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Price (৳)</Label>
              <Input 
                type="number" 
                {...register("price", { valueAsNumber: true })} 
                placeholder="2999" 
              />
            </div>
            <div>
              <Label>Commission (%)</Label>
              <Input 
                type="number" 
                {...register("commissionRate", { valueAsNumber: true })} 
                placeholder="20" 
              />
            </div>
          </div>

          <div>
            <Label>Original Product URL</Label>
            <Input 
              {...register("originalUrl")} 
              placeholder="https://yourshop.com/product/123" 
            />
          </div>

          <div>
            <Label>Description (Optional)</Label>
            {/* <Textarea 
              {...register("description")} 
              placeholder="High quality wireless earbuds with noise cancellation..." 
            /> */}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Adding Product..." : "Add Product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}