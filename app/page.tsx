// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold tracking-tight mb-6">
            Earn More with <span className="text-primary">AffiFlow</span>
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Connect Merchants and Affiliates. Promote products, earn commission effortlessly.
          </p>

          <div className="flex gap-4 justify-center mt-10">
            <Link href="/sign-up">
              <Button size="lg" className="text-lg px-8">
                Get Started Free
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}