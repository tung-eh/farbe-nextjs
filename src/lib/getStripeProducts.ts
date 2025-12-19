import Stripe from "stripe";

type StripeProduct = {
  id: string;
  name: string;
  price: number;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const getStripeProducts = async () => {
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

  return productMap;
};

export default getStripeProducts;
