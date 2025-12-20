"use client";

import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

import { useCart } from "@/states/cart";

const CartContent = ({
  content,
  emptyContent,
}: {
  content: RichTextField;
  emptyContent: RichTextField;
}) => {
  const { totalItems } = useCart();

  return totalItems > 0 ? (
    <PrismicRichText field={content} />
  ) : (
    <PrismicRichText field={emptyContent} />
  );
};

export default CartContent;
