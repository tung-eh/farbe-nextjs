import { FC } from "react";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import CartContent from "./CartContent";

export type CartProps = SliceComponentProps<Content.CartSlice>;

const Cart: FC<CartProps> = ({ slice }) => {
  return (
    <section
      id="cart"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bounded rich-text min-h-screen"
    >
      <PrismicRichText field={slice.primary.title} />
      <CartContent
        content={slice.primary.content}
        emptyContent={slice.primary.empty_content}
      />
    </section>
  );
};

export default Cart;
