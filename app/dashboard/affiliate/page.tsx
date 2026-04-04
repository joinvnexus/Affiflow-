// app/dashboard/affiliate/page.tsx
import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";

export default async function AffiliateDashboard() {
  const user = await getCurrentUser();

  if (user?.role !== "AFFILIATE") {
    redirect("/onboarding");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Welcome to Affiliate Dashboard!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border">
          <h3 className="text-gray-500 text-sm">Total Links</h3>
          <p className="text-4xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border">
          <h3 className="text-gray-500 text-sm">Total Earnings</h3>
          <p className="text-4xl font-bold mt-2">৳0</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border">
          <h3 className="text-gray-500 text-sm">Conversion Rate</h3>
          <p className="text-4xl font-bold mt-2">0%</p>
        </div>
      </div>
    </div>
  );
}