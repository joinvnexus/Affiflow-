"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CircleDollarSign,
  LayoutDashboard,
  Link as LinkIcon,
  LogOut,
  Settings,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

interface SidebarProps {
  user: {
    name: string | null;
    email: string;
    role: string;
  };
}

const merchantMenu = [
  { label: "Dashboard", href: "/dashboard/merchant", icon: LayoutDashboard },
  { label: "My Products", href: "/dashboard/merchant/products", icon: ShoppingBag },
  { label: "Sales", href: "/dashboard/merchant/sales", icon: TrendingUp },
  { label: "Payouts", href: "/dashboard/payouts", icon: CircleDollarSign },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const affiliateMenu = [
  { label: "Dashboard", href: "/dashboard/affiliate", icon: LayoutDashboard },
  { label: "Marketplace", href: "/dashboard/marketplace", icon: ShoppingBag },
  { label: "My Links", href: "/dashboard/affiliate/links", icon: LinkIcon },
  { label: "Earnings", href: "/dashboard/affiliate/earnings", icon: TrendingUp },
  { label: "Payouts", href: "/dashboard/payouts", icon: CircleDollarSign },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const menu = user.role === "MERCHANT" ? merchantMenu : affiliateMenu;

  return (
    <div className="flex w-64 flex-col border-r bg-white dark:bg-gray-900">
      <div className="border-b p-6">
        <h2 className="text-2xl font-bold text-primary">AffiFlow</h2>
        <p className="mt-1 text-sm text-gray-500">{user.name || user.email}</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t p-4">
        <SignOutButton>
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </SignOutButton>
      </div>
    </div>
  );
}
