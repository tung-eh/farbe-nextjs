"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { twMerge } from "tailwind-merge";

import { StripeProduct } from "@/lib/getStripeProducts";
import { useCart } from "@/states/cart";

const AddToCart = ({ stripeProduct }: { stripeProduct: StripeProduct }) => {
  const [quantity, setQuantity] = useState(1);

  const { items, insertItem } = useCart();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    insertItem({
      product: stripeProduct,
      quantity,
    });

    setQuantity(1);
  };

  return (
    <form
      className="flex gap-4 text-sm max-w-[calc(40ch+1rem)] -ml-4 mt-16 items-start"
      onSubmit={handleSubmit}
    >
      <div className="flex-1 flex items-center justify-between">
        <button
          type="button"
          className="cta"
          onClick={() => setQuantity((c) => Math.max(1, c - 1))}
          disabled={quantity === 1}
        >
          -
        </button>
        <div>{quantity}</div>
        <button
          type="button"
          className="cta"
          onClick={() => setQuantity((c) => c + 1)}
        >
          +
        </button>
      </div>
      <div className="flex-1">
        <button className="w-full cta primary">Add to cart</button>
        <Link href="/#cart" className="cta mute">
          <p
            className={twMerge(
              "text-center",
              !items[stripeProduct.id] && "invisible",
            )}
          >
            {items[stripeProduct.id]?.quantity} in cart
          </p>
        </Link>
      </div>
    </form>
  );
};

export default AddToCart;
