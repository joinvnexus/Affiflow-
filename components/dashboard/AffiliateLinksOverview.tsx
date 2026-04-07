import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

interface AffiliateLinksOverviewProps {
  affiliateId: string;
}

function getAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

export async function AffiliateLinksOverview({ affiliateId }: AffiliateLinksOverviewProps) {
  const links = await prisma.link.findMany({
    where: { affiliateId },
    include: {
      product: {
        select: {
          name: true,
          commissionRate: true,
          price: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const appUrl = getAppUrl();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                    <th className="py-3">Short link</th>
                    <th className="py-3">Clicks</th>
                    <th className="py-3">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link) => {
                    const shortLink = `${appUrl}/go/${link.shortSlug}`;

                    return (
                      <tr key={link.id} className="border-b last:border-0">
                        <td className="py-4 font-medium">{link.product.name}</td>
                        <td className="py-4">
                          <Link href={shortLink} target="_blank" className="text-primary hover:underline">
                            {shortLink}
                          </Link>
                        </td>
                        <td className="py-4">{link.clicks}</td>
                        <td className="py-4 text-gray-500">
                          {new Date(link.createdAt).toLocaleDateString("en-US")}
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
