import Stripe from "stripe";

export type StripeProduct = {
  id: string;
  name: string;
  priceId: string;
  price: number;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const isNotUndefined = <T>(value: T | undefined): value is T =>
  value !== undefined;

const getStripeProducts = async () => {
  const { data: products } = await stripe.products.list({
    active: true,
    expand: ["data.default_price"],
  });

  const productMap: Record<string, StripeProduct> = Object.fromEntries(
    products
      .map(({ id, name, default_price: defaultPrice }) => {
        if (!defaultPrice || typeof defaultPrice !== "object") return undefined;

        return [
          id,
          {
            id,
            name,
            priceId: defaultPrice.id,
            price: defaultPrice.unit_amount ?? 0,
          },
        ];
      })
      .filter(isNotUndefined),
  );

  return productMap;
};

export default getStripeProducts;
