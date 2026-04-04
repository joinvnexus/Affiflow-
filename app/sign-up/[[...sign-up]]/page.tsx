// app/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/current-user";

export default async function SignUpPage() {
  const { userId } = await auth();
  
  if (userId) {
    const user = await getCurrentUser();
    if (!user?.role) {
      redirect("/onboarding");
    }
    redirect("/dashboard");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">AffiFlow</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-3">
            Join as Merchant or Affiliate
          </p>
        </div>

        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-xl border border-gray-200 dark:border-gray-800",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
            },
          }}
          routing="path"
          path="/sign-up"
        />

        <div className="text-center mt-6 text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}