import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Buy AI Credits",
  description: "Buy AI credits to generate images and videos. No subscription — credits never expire. Starter from $9, Creator $39, Pro $99.",
  alternates: { canonical: "https://www.starstripestudio.com/pricing" },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
