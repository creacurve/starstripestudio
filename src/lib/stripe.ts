import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

export const CREDIT_PLANS = [
  { name: "Starter",  credits: 100,  price: 900,   priceId: process.env.STRIPE_PRICE_STARTER!,  popular: false },
  { name: "Creator",  credits: 500,  price: 3900,  priceId: process.env.STRIPE_PRICE_CREATOR!,  popular: true  },
  { name: "Pro",      credits: 1500, price: 9900,  priceId: process.env.STRIPE_PRICE_PRO!,       popular: false },
  { name: "Studio",   credits: 5000, price: 27900, priceId: process.env.STRIPE_PRICE_STUDIO!,   popular: false },
];
