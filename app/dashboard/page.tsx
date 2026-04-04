// app/dashboard/page.tsx
import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (user.role === "MERCHANT") {
    redirect("/dashboard/merchant");
  } else {
    redirect("/dashboard/affiliate");
  }
}