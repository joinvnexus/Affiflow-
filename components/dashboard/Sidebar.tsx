// components/dashboard/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Link as LinkIcon, 
  TrendingUp, 
  Settings,
  LogOut 
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
  { label: "Settings", href: "/dashboard/merchant/settings", icon: Settings },
];

const affiliateMenu = [
  { label: "Dashboard", href: "/dashboard/affiliate", icon: LayoutDashboard },
  { label: "Marketplace", href: "/marketplace", icon: ShoppingBag },
  { label: "My Links", href: "/dashboard/affiliate/links", icon: LinkIcon },
  { label: "Earnings", href: "/dashboard/affiliate/earnings", icon: TrendingUp },
  { label: "Settings", href: "/dashboard/affiliate/settings", icon: Settings },
];

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const menu = user.role === "MERCHANT" ? merchantMenu : affiliateMenu;

  return (
    <div className="w-64 border-r bg-white dark:bg-gray-900 flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-primary">AffiFlow</h2>
        <p className="text-sm text-gray-500 mt-1">{user.name || user.email}</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary text-white" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <SignOutButton>
          <button className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </SignOutButton>
      </div>
    </div>
  );
}