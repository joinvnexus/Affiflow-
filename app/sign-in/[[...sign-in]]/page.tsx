import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import { getCurrentUser } from "@/lib/current-user";

export default async function SignInPage() {
  const { userId } = await auth();

  if (userId) {
    const user = await getCurrentUser();
    if (!user?.role) {
      redirect("/onboarding");
    }
    if (user.role === "MERCHANT") {
      redirect("/dashboard/merchant");
    }
    redirect("/dashboard/affiliate");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary">AffiFlow</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Sign in to start earning or selling
          </p>
        </div>

        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "border border-gray-200 shadow-xl dark:border-gray-800",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
            },
          }}
          routing="path"
          path="/sign-in"
        />

        <div className="mt-6 text-center text-sm text-gray-500">
          Do not have an account? {" "}
          <Link href="/sign-up" className="text-primary hover:underline">
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
}
