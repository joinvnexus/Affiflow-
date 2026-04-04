"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Store, Users } from "lucide-react";
import { setUserRole } from "@/actions/user";

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
      router.push("/dashboard");
    } catch (error) {
      console.error("Error setting role:", error);
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-3">
            Welcome to AffiFlow
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Choose how you want to get started
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Merchant Card */}
          <Card
            className={`p-8 cursor-pointer transition-all border-2 ${
              selectedRole === "MERCHANT"
                ? "border-primary bg-primary/5"
                : "border-gray-200 dark:border-gray-800 hover:border-primary/50"
            }`}
            onClick={() => setSelectedRole("MERCHANT")}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 mb-4">
                <Store className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                I&apos;m a Merchant
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Sell your products and earn through the affiliate network
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-6 text-left w-full">
                <li>✓ Create and manage products</li>
                <li>✓ Set commission rates</li>
                <li>✓ Track sales and earnings</li>
                <li>✓ Grow your network</li>
              </ul>
            </div>
          </Card>

          {/* Affiliate Card */}
          <Card
            className={`p-8 cursor-pointer transition-all border-2 ${
              selectedRole === "AFFILIATE"
                ? "border-primary bg-primary/5"
                : "border-gray-200 dark:border-gray-800 hover:border-primary/50"
            }`}
            onClick={() => setSelectedRole("AFFILIATE")}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/30 mb-4">
                <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                I&apos;m an Affiliate
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Promote products and earn commissions on every sale
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-6 text-left w-full">
                <li>✓ Browse marketplace products</li>
                <li>✓ Generate unique links</li>
                <li>✓ Track your clicks and sales</li>
                <li>✓ Earn commissions instantly</li>
              </ul>
            </div>
          </Card>
        </div>

        <Button
          onClick={() => handleRoleSelection(selectedRole!)}
          disabled={!selectedRole || isLoading}
          className="w-full mt-8 py-6 text-lg"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Setting up your account...
            </>
          ) : (
            "Continue to Dashboard"
          )}
        </Button>
      </div>
    </div>
  );
}
