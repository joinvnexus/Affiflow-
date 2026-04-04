// app/dashboard/merchant/products/page.tsx
import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import { ProductList } from "@/components/dashboard/ProductList";
import { AddProductButton } from "@/components/dashboard/AddProductButton";

export default async function MerchantProductsPage() {
  const user = await getCurrentUser();

  if (user?.role !== "MERCHANT") {
    redirect("/dashboard/affiliate");
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Products</h1>
          <p className="text-gray-500">Manage your products and commission rates</p>
        </div>
        <AddProductButton />
      </div>

      <ProductList merchantId={user.id} />
    </div>
  );
}