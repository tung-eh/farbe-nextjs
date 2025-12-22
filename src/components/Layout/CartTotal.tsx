"use client";

import { useIsMounted } from "usehooks-ts";

import { useCart } from "@/states/cart";

const CartTotal = () => {
  const isMounted = useIsMounted()();

  const { totalItems } = useCart();

  return isMounted ? totalItems : "~";
};

export default CartTotal;
