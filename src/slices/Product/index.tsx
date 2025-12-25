import { Fragment, ComponentProps, FC } from "react";
import { isFilled, Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicTable,
  SliceComponentProps,
} from "@prismicio/react";

import { StripeProduct } from "@/lib/getStripeProducts";
import formatPrice from "@/lib/formatPrice";
import getSceneAttributes from "@/lib/getSceneAttributes";
import SlideIn from "@/atoms/SlideIn";

import AddToCart from "./AddToCart";

export type ProductProps = SliceComponentProps<
  Content.ProductSlice,
  { stripeProducts: Record<string, StripeProduct> }
>;

const Dl = (props: ComponentProps<"dl">) => <dl {...props} />;
const Dt = (props: ComponentProps<"dt">) => <dt {...props} />;
const Dd = (props: ComponentProps<"dd">) => <dd {...props} />;
const Div = (props: ComponentProps<"div">) => <div {...props} />;

const getProduct = (
  slice: ProductProps["slice"],
  context: ProductProps["context"],
) => {
  const { product } = slice.primary;
  const { stripeProducts } = context;

  if (!isFilled.contentRelationship(product) || !product.data?.stripe_id) {
    return undefined;
  }

  return {
    ...product,
    stripe: stripeProducts[product.data.stripe_id],
  };
};

const Product: FC<ProductProps> = ({ slice, context }) => {
  const product = getProduct(slice, context);

  return product?.data ? (
    <SlideIn
      as="article"
      scrollTrigger={{
        start: "top top+=25%",
      }}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      {...getSceneAttributes({
        position: "center",
        model: product.uid,
        rotate: true,
      })}
      className="bounded min-h-[150vh] flex flex-col justify-center"
    >
      <header id={product.uid} className="rich-text pt-[25vh]">
        <PrismicRichText field={product.data.name} />
        <p aria-label="Price">{formatPrice(product.stripe.price)} / roll</p>
      </header>
      <section className="rich-text">
        <h2 className="sr-only">Description</h2>
        <PrismicRichText field={product.data.description} />
      </section>
      <section className="rich-text">
        <h2 className="sr-only">Characteristics</h2>
        <PrismicTable
          field={product.data.characteristics}
          components={{
            table: Dl,
            tbody: Fragment,
            tr: Div,
            th: Dt,
            td: Dd,
          }}
        />
      </section>
      <AddToCart stripeProduct={product.stripe} />
    </SlideIn>
  ) : (
    <article>
      <p>Product not found</p>
    </article>
  );
};

export default Product;
