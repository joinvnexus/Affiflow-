// app/(dashboard)/merchant/page.tsx
import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";

export default async function MerchantDashboard() {
  const user = await getCurrentUser();

  if (user?.role !== "MERCHANT") {
    redirect("/onboarding");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Welcome back, Merchant!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border">
          <h3 className="text-gray-500 text-sm">Total Products</h3>
          <p className="text-4xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border">
          <h3 className="text-gray-500 text-sm">Total Sales</h3>
          <p className="text-4xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border">
          <h3 className="text-gray-500 text-sm">Commission Paid</h3>
          <p className="text-4xl font-bold mt-2">৳0</p>
        </div>
      </div>
    </div>
  );
}
