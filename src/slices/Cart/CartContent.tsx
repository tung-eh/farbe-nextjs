"use client";

import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

import formatPrice from "@/lib/formatPrice";
import { useCart } from "@/states/cart";

const CartContent = ({
  content,
  emptyContent,
}: {
  content: RichTextField;
  emptyContent: RichTextField;
}) => {
  const { items, totalItems, totalPrice, removeItem } = useCart();

  return totalItems > 0 ? (
    <>
      <PrismicRichText field={content} />
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
            <input type="hidden" name={product.id} value={quantity} />
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
    <PrismicRichText field={emptyContent} />
  );
};

export default CartContent;
