import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { getCurrentUser } from "@/lib/current-user";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (!user.role) {
    redirect("/onboarding");
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar user={user} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center border-b bg-white px-6 dark:bg-gray-900">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              AffiFlow
            </h1>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                {user.role === "MERCHANT" ? "Merchant" : "Affiliate"} Dashboard
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
