import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — StarStripe Studio",
  description: "Sign in to your StarStripe Studio account to generate AI images and videos.",
  alternates: { canonical: "https://www.starstripestudio.com/login" },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
