// app/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/current-user";

export default async function SignInPage() {
  const { userId } = await auth();
  
  if (userId) {
    const user = await getCurrentUser();
    if (!user?.role) {
      redirect("/onboarding");
    }
    if (user.role === "MERCHANT") {
      redirect("/merchant");
    }
    redirect("/affiliate");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">AffiFlow</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-3">
            Sign in to start earning or selling
          </p>
        </div>

        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-xl border border-gray-200 dark:border-gray-800",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
            },
          }}
          routing="path"
          path="/sign-in"
        />

        <div className="text-center mt-6 text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-primary hover:underline">
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
}