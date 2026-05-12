import * as React from "react";
import { products, type Product } from "./products";

export type CartItem = {
  slug: string;
  size: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  add: (slug: string, size: string, qty?: number) => void;
  remove: (slug: string, size: string) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  wishlist: string[];
  toggleWish: (slug: string) => void;
  detailed: Array<CartItem & { product: Product }>;
};

const CartContext = React.createContext<CartContextValue | null>(null);

const CART_KEY = "asa_cart";
const WISH_KEY = "asa_wish";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [wishlist, setWishlist] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const c = localStorage.getItem(CART_KEY);
      if (c) setItems(JSON.parse(c));
      const w = localStorage.getItem(WISH_KEY);
      if (w) setWishlist(JSON.parse(w));
    } catch {}
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const add = (slug: string, size: string, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.slug === slug && x.size === size);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [...prev, { slug, size, qty }];
    });
    setOpen(true);
  };

  const remove = (slug: string, size: string) =>
    setItems((p) => p.filter((x) => !(x.slug === slug && x.size === size)));

  const setQty = (slug: string, size: string, qty: number) =>
    setItems((p) =>
      p.map((x) => (x.slug === slug && x.size === size ? { ...x, qty: Math.max(1, qty) } : x)),
    );

  const clear = () => setItems([]);

  const toggleWish = (slug: string) =>
    setWishlist((w) => (w.includes(slug) ? w.filter((s) => s !== slug) : [...w, slug]));

  const detailed = items
    .map((it) => {
      const product = products.find((p) => p.slug === it.slug);
      return product ? { ...it, product } : null;
    })
    .filter(Boolean) as Array<CartItem & { product: Product }>;

  const count = items.reduce((s, x) => s + x.qty, 0);
  const subtotal = detailed.reduce((s, x) => s + x.product.price * x.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, add, remove, setQty, clear, count, subtotal, open, setOpen, wishlist, toggleWish, detailed }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
