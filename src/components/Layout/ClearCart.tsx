"use client";

import { useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { useCart } from "@/states/cart";

const ClearCart = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { clear: clearCart } = useCart();

  useEffect(() => {
    if (searchParams.get("order") === "completed") {
      clearCart();
      window.history.replaceState(null, "", pathname);
    }
  }, [searchParams, clearCart, router, pathname]);

  return null;
};

export default ClearCart;
