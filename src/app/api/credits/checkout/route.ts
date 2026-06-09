import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe, CREDIT_PLANS } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { planName } = await req.json();
  const plan = CREDIT_PLANS.find((p) => p.name === planName);
  if (!plan) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [{ price: plan.priceId, quantity: 1 }],
    success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/pricing`,
    metadata: {
      user_id: user.id,
      credits: String(plan.credits),
      plan_name: plan.name,
    },
    customer_email: user.email,
  });

  return NextResponse.json({ url: session.url });
}
