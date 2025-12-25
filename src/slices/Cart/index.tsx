"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import formatPrice from "@/lib/formatPrice";
import { useCart } from "@/states/cart";
import SlideIn from "@/atoms/SlideIn";

export type CartProps = SliceComponentProps<Content.CartSlice>;

const Cart: FC<CartProps> = ({ slice }) => {
  const { items, totalItems, totalPrice, removeItem } = useCart();

  return (
    <SlideIn
      as="form"
      method="POST"
      action="/api/checkout"
      id="cart"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bounded rich-text min-h-screen"
    >
      <PrismicRichText field={slice.primary.title} />
      {totalItems > 0 ? (
        <>
          <PrismicRichText field={slice.primary.content} />
          <ul className="!mt-16">
            {Object.values(items).map(({ product, quantity }) => (
              <li key={product.id} className="flex items-center">
                <span className="flex-1">{product.name}</span>
                <span
                  aria-label={`Quantity of ${product.name}`}
                  className="flex-1 text-right"
                >
                  {quantity}
                </span>

                <span
                  aria-label={`Price for ${quantity} ${product.name}`}
                  className="flex-1 text-right"
                >
                  {formatPrice(quantity * product.price)}
                </span>
                <button
                  type="button"
                  title="Remove from cart"
                  onClick={() => removeItem(product.id)}
                  className="cta w-12.5 -mr-4"
                >
                  &times;
                </button>
                <input type="hidden" name={product.priceId} value={quantity} />
              </li>
            ))}
          </ul>
          <hr className="max-w-[40ch]" />
          <p aria-label="Total price" className="text-right pr-8.5">
            {formatPrice(totalPrice)}
          </p>
          <button className="cta primary w-full max-w-[40ch] mt-16">
            Check out
          </button>
        </>
      ) : (
        <PrismicRichText field={slice.primary.empty_content} />
      )}
    </SlideIn>
  );
};

export default Cart;
