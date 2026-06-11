import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up Free — 10 Free AI Credits",
  description: "Create your free StarStripe Studio account and get 10 free credits to generate AI images and videos instantly. No credit card required.",
  alternates: { canonical: "https://www.starstripestudio.com/signup" },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
