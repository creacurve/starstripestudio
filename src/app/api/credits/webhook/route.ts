import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import Stripe from "stripe";

// Use service role to bypass RLS for webhook credit updates
function getServiceClient() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;
    const credits = parseInt(session.metadata?.credits || "0");

    if (!userId || !credits) {
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    const supabase = getServiceClient();

    // Add credits to user profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("credits")
      .eq("id", userId)
      .single();

    const currentCredits = profile?.credits ?? 0;

    await supabase
      .from("profiles")
      .update({ credits: currentCredits + credits })
      .eq("id", userId);

    // Record the purchase
    await supabase.from("credit_purchases").insert({
      user_id: userId,
      stripe_session_id: session.id,
      credits,
      amount_cents: session.amount_total ?? 0,
      status: "completed",
    });
  }

  return NextResponse.json({ received: true });
}
