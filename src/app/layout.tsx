import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const BASE_URL = "https://www.starstripestudio.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "StarStripe Studio — Free AI Image & Video Generator",
    template: "%s | StarStripe Studio",
  },
  description: "Generate stunning AI images and videos for free using FLUX, Google Veo 3, Kling, and Runway. No subscription — pay only per credit. Start with 10 free credits.",
  keywords: [
    "AI image generator", "AI video generator", "text to image", "text to video",
    "FLUX AI", "Veo 3", "Kling video", "Runway AI", "free AI art",
    "AI art generator", "AI video maker", "AI image maker online free",
    "generate images with AI", "generate videos with AI", "AI studio",
  ],
  authors: [{ name: "StarStripe Studio", url: BASE_URL }],
  creator: "StarStripe Studio",
  publisher: "StarStripe Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "StarStripe Studio",
    title: "StarStripe Studio — Free AI Image & Video Generator",
    description: "Generate stunning AI images and videos for free. FLUX, Veo 3, Kling, Runway — all in one studio. Start with 10 free credits.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "StarStripe Studio AI Generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "StarStripe Studio — Free AI Image & Video Generator",
    description: "Generate stunning AI images and videos for free. Start with 10 free credits.",
    images: ["/og-image.png"],
    creator: "@starstripestudio",
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
