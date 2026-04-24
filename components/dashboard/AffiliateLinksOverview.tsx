"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";

interface LinkData {
  id: string;
  shortSlug: string;
  clicks: number;
  createdAt: Date;
  product: {
    name: string;
    commissionRate: number;
    price: number;
  };
}

interface AffiliateLinksOverviewProps {
  affiliateId: string;
  links: LinkData[];
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function AffiliateLinksOverview({ affiliateId, links }: AffiliateLinksOverviewProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Generated links</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{links.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Tracked clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalClicks}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Total potential earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {formatCurrency(
                links.reduce((sum, link) => {
                  return sum + (link.product.price * link.product.commissionRate) / 100;
                }, 0)
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My referral links</CardTitle>
        </CardHeader>
        <CardContent>
          {links.length === 0 ? (
            <p className="text-sm text-gray-500">
              You have not generated any links yet. Visit the marketplace to get started.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-3">Product</th>
                    <th className="py-3">Commission</th>
                    <th className="py-3">Short link</th>
                    <th className="py-3">Clicks</th>
                    <th className="py-3">Created</th>
                    <th className="py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link) => {
                    const shortLink = `${appUrl}/go/${link.shortSlug}`;
                    const commission = (link.product.price * link.product.commissionRate) / 100;

                    return (
                      <tr key={link.id} className="border-b last:border-0">
                        <td className="py-4 font-medium">{link.product.name}</td>
                        <td className="py-4 text-green-600 font-medium">
                          {formatCurrency(commission)}
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs max-w-[200px] truncate">
                              {shortLink}
                            </code>
                            <Link href={shortLink} target="_blank">
                              <ExternalLink className="h-4 w-4 text-gray-500 hover:text-primary" />
                            </Link>
                          </div>
                        </td>
                        <td className="py-4">{link.clicks}</td>
                        <td className="py-4 text-gray-500">
                          {new Date(link.createdAt).toLocaleDateString("en-US")}
                        </td>
                        <td className="py-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(shortLink, link.id)}
                          >
                            {copiedId === link.id ? (
                              <span className="text-green-600">Copied!</span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <Copy className="h-4 w-4" />
                                Copy
                              </span>
                            )}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
