import { useLocalStorage } from "@uidotdev/usehooks";
import { produce } from "immer";

import { StripeProduct } from "@/lib/getStripeProducts";

type CartItem = {
  product: StripeProduct;
  quantity: number;
};

type CartItems = Record<string, CartItem>;

const LOCAL_STORAGE_KEY = "fabre-cart";

export const useCart = () => {
  const [items, setItems] = useLocalStorage<CartItems>(LOCAL_STORAGE_KEY, {});

  const totalPrice = Object.values(items).reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const totalItems = Object.values(items).reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  function insertItem(item: CartItem) {
    setItems(
      produce((draft) => {
        const currentQuantity = draft[item.product.id]?.quantity ?? 0;
        draft[item.product.id] = {
          ...item,
          quantity: item.quantity + currentQuantity,
        };
      }),
    );
  }

  function upsertItem(item: CartItem) {
    if (item.quantity <= 0) {
      removeItem(item.product.id);
      return;
    }

    setItems(
      produce((draft) => {
        draft[item.product.id] = item;
      }),
    );
  }

  function removeItem(id: string) {
    setItems(
      produce((draft) => {
        delete draft[id];
      }),
    );
  }

  function clear() {
    setItems({});
  }

  return {
    items,
    setItems,
    totalPrice,
    totalItems,
    insertItem,
    upsertItem,
    removeItem,
    clear,
  };
};
