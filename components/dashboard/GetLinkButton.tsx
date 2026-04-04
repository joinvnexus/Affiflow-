// components/dashboard/GetLinkButton.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { generateLink } from "@/actions/link";

interface GetLinkButtonProps {
  productId: string;
  productName: string;
}

export function GetLinkButton({ productId, productName }: GetLinkButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [linkData, setLinkData] = useState<{ shortLink: string; originalLink: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetLink = async () => {
    setIsLoading(true);
    try {
      const result = await generateLink(productId);
      setLinkData(result);
      setIsOpen(true);
    } catch (error) {
      console.error(error);
      alert("Failed to generate link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Link copied to clipboard!");
  };

  return (
    <>
      <Button onClick={handleGetLink} disabled={isLoading} className="w-full">
        {isLoading ? "Generating..." : "Get My Promotion Link"}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Unique Link for &quot;{productName}&quot;</DialogTitle>
          </DialogHeader>

          {linkData && (
            <div className="space-y-4 py-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Your Short Link</p>
                <div className="flex gap-2">
                  <code className="flex-1 bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm break-all">
                    {linkData.shortLink}
                  </code>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => copyToClipboard(linkData.shortLink)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button 
                onClick={() => copyToClipboard(linkData.originalLink)} 
                variant="secondary"
                className="w-full"
              >
                Copy Original Affiliate Link
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}