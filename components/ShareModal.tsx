// components/ShareModal.tsx
"use client"

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Share2, QrCode } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ShareModalProps {
  slug: string; // Pass the slug instead of cardUrl and qrCodeUrl
  children: React.ReactNode;
}

export function ShareModal({ slug, children }: ShareModalProps) {
  const { toast } = useToast();
  const [cardUrl, setCardUrl] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    // Generate cardUrl and qrCodeUrl on the client side
    const baseUrl = window.location.origin;
    const fullCardUrl = `${baseUrl}/card/${slug}`;
    setCardUrl(fullCardUrl);

    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(fullCardUrl)}`;
    setQrCodeUrl(qrCodeUrl);
  }, [slug]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Link copied!",
        description: "The link to your business card has been copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `business-card-qrcode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <VisuallyHidden>
          <DialogTitle>Share Your Digital Business Card</DialogTitle>
        </VisuallyHidden>
        <Tabs defaultValue="qr">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="qr">QR Code</TabsTrigger>
            <TabsTrigger value="link">Share Link</TabsTrigger>
            <TabsTrigger value="download">Download</TabsTrigger>
          </TabsList>
          <TabsContent value="qr" className="p-4">
            <div className="flex flex-col items-center gap-4">
              <div className="h-48 w-48 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                {qrCodeUrl ? (
                  <Image
                    src={qrCodeUrl || "/placeholder.svg"}
                    alt="QR Code for your digital business card"
                    width={200}
                    height={200}
                  />
                ) : (
                  <QrCode className="h-24 w-24 text-gray-400" />
                )}
              </div>
              <p className="text-center text-sm text-gray-600">
                Scan this QR code to instantly share your digital business card
              </p>
              <Button onClick={downloadQRCode}>
                <Download className="mr-2 h-4 w-4" />
                Download QR Code
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="link" className="p-4">
            <div className="flex flex-col items-center gap-4">
              <div className="w-full p-3 bg-gray-100 rounded-md text-center break-all">{cardUrl}</div>
              <p className="text-center text-sm text-gray-600">
                Share this link via email, text, or social media
              </p>
              <Button onClick={() => copyToClipboard(cardUrl)}>
                <Share2 className="mr-2 h-4 w-4" />
                Copy Link
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="download" className="p-4">
            <div className="flex flex-col items-center gap-4">
              <p className="text-center text-sm text-gray-600">
                Download your digital business card to share offline or via email
              </p>
              <div className="grid grid-cols-2 gap-4 w-full">
                <Button variant="outline" onClick={downloadQRCode}>
                  <Download className="mr-2 h-4 w-4" />
                  PNG Format
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Coming soon",
                      description: "PDF download will be available in the next update.",
                    });
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  PDF Format
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}