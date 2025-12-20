import { FC } from "react";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import CartContent from "./CartContent";

export type CartProps = SliceComponentProps<Content.CartSlice>;

const Cart: FC<CartProps> = ({ slice }) => {
  return (
    <form
      method="POST"
      action="/api/checkout"
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
    </form>
  );
};

export default Cart;
