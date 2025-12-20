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

    const session = stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items,
    });

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error checking out:", error);
    return NextResponse.json({ error: "Error checking out" }, { status: 500 });
  }
}
