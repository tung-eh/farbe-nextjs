"use client";

import { useState } from "react";

const AddToCart = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <form className="flex gap-4 text-sm max-w-[calc(40ch+1rem)] -ml-4 mt-16">
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
      </div>
    </form>
  );
};

export default AddToCart;
