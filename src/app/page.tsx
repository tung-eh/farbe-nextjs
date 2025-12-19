import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import getStripeProducts from "@/lib/getStripeProducts";

export default async function Home() {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  const stripeProducts = await getStripeProducts();

  // <SliceZone> renders the page's slices.
  return (
    <SliceZone
      slices={home.data.slices}
      components={components}
      context={{ stripeProducts }}
    />
  );
}
