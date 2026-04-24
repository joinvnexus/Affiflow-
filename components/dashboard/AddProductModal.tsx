// components/dashboard/AddProductModal.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
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
  imageUrl: z.string().optional(),
});

type ProductForm = z.infer<typeof productSchema>;

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: ProductForm) => {
    setIsLoading(true);
    try {
      await addProduct({
        ...data,
        imageUrl: imageUrl || undefined,
      });
      reset();
      setImageUrl("");
      onClose();
      window.location.reload(); // Refresh to show new product
    } catch (error) {
      console.error(error);
      alert("Failed to add product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (res: { url: string }[]) => {
    setImageUrl(res[0].url);
  };

  const removeImage = () => {
    setImageUrl("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* Image Upload */}
          <div>
            <Label>Product Image</Label>
            {imageUrl ? (
              <div className="relative mt-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Product preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="mt-2">
                <UploadDropzone
                  endpoint="productImage"
                  onClientUploadComplete={handleImageUpload}
                  onUploadError={(error: Error) => {
                    console.error(error);
                    alert("Failed to upload image. Please try again.");
                  }}
                  className="ut-button:bg-primary ut-button:hover:bg-primary/90 ut-label:text-gray-500"
                />
              </div>
            )}
          </div>

          <div>
            <Label>Product Name</Label>
            <Input {...register("name")} placeholder="Wireless Earbuds" />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Price (৳)</Label>
              <Input 
                type="number" 
                {...register("price", { valueAsNumber: true })} 
                placeholder="2999" 
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>
            <div>
              <Label>Commission (%)</Label>
              <Input 
                type="number" 
                {...register("commissionRate", { valueAsNumber: true })} 
                placeholder="20" 
              />
              {errors.commissionRate && <p className="text-red-500 text-sm mt-1">{errors.commissionRate.message}</p>}
            </div>
          </div>

          <div>
            <Label>Original Product URL</Label>
            <Input 
              {...register("originalUrl")} 
              placeholder="https://yourshop.com/product/123" 
            />
            {errors.originalUrl && <p className="text-red-500 text-sm mt-1">{errors.originalUrl.message}</p>}
          </div>

          <div>
            <Label>Description (Optional)</Label>
            <textarea
              {...register("description")}
              placeholder="High quality wireless earbuds with noise cancellation..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 dark:border-gray-700 dark:bg-gray-800"
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Adding Product..." : "Add Product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
