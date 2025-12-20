"use client";

import { useCart } from "@/states/cart";

const CartTotal = () => {
  const { totalItems } = useCart();

  return totalItems;
};

export default CartTotal;
