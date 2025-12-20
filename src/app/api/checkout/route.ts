import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const data = Object.fromEntries(formData);

    const items = Object.entries(data).map(([priceId, quantity]) => ({
      price: priceId,
      quantity: Number(quantity),
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items,
      success_url: `${req.headers.get("origin")}/thanks?order=completed`,
      cancel_url: `${req.headers.get("origin")}/#cart`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 },
      );
    }

    return NextResponse.redirect(session.url, { status: 303 });
  } catch (error) {
    console.error("Error checking out:", error);
    return NextResponse.json({ error: "Error checking out" }, { status: 500 });
  }
}
