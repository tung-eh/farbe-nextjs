import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

type StripeProduct = {
  id: string;
  name: string;
  price: number;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  try {
    const { data: products } = await stripe.products.list({
      active: true,
      expand: ["data.default_price"],
    });

    const productMap: Record<string, StripeProduct> = Object.fromEntries(
      products.map(({ id, name, default_price: defaultPrice }) => [
        id,
        {
          id,
          name,
          price:
            typeof defaultPrice === "string"
              ? Number(defaultPrice)
              : (defaultPrice?.unit_amount ?? 0),
        },
      ]),
    );

    return NextResponse.json({ productMap });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 },
    );
  }
}
