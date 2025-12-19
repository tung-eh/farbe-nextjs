import { NextResponse, NextRequest } from "next/server";

import getStripeProducts from "@/lib/getStripeProducts";

export async function GET(req: NextRequest) {
  try {
    const stripeProducts = await getStripeProducts();

    return NextResponse.json({ stripeProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 },
    );
  }
}
