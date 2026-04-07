"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Loader2, Store, Users } from "lucide-react";
import { setUserRole } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function OnboardingPage() {
  const router = useRouter();
  const { userId } = useAuth();
  const [selectedRole, setSelectedRole] = useState<"MERCHANT" | "AFFILIATE" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userId) {
      router.push("/sign-in");
    }
  }, [userId, router]);

  if (!userId) {
    return null;
  }

  async function handleRoleSelection(role: "MERCHANT" | "AFFILIATE") {
    setIsLoading(true);
    try {
      await setUserRole(role);
      router.push(role === "MERCHANT" ? "/dashboard/merchant" : "/dashboard/affiliate");
    } catch (error) {
      console.error("Error setting role:", error);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 dark:from-gray-950 dark:to-gray-900">
      <div className="w-full max-w-2xl">
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-4xl font-bold text-gray-900 dark:text-gray-50">Welcome to AffiFlow</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Choose how you want to get started</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card
            className={`cursor-pointer border-2 p-8 transition-all ${
              selectedRole === "MERCHANT"
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-primary/50 dark:border-gray-800"
            }`}
            onClick={() => setSelectedRole("MERCHANT")}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-lg bg-blue-100 p-4 dark:bg-blue-900/30">
                <Store className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-50">I am a merchant</h2>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Launch offers, manage products, and confirm affiliate sales.
              </p>
            </div>
          </Card>

          <Card
            className={`cursor-pointer border-2 p-8 transition-all ${
              selectedRole === "AFFILIATE"
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-primary/50 dark:border-gray-800"
            }`}
            onClick={() => setSelectedRole("AFFILIATE")}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-lg bg-green-100 p-4 dark:bg-green-900/30">
                <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-50">I am an affiliate</h2>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Browse offers, generate referral links, and track your commissions.
              </p>
            </div>
          </Card>
        </div>

        <Button
          onClick={() => handleRoleSelection(selectedRole!)}
          disabled={!selectedRole || isLoading}
          className="mt-8 w-full py-6 text-lg"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Setting up your account...
            </>
          ) : (
            "Continue to dashboard"
          )}
        </Button>
      </div>
    </div>
  );
}
