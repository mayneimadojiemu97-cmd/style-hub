import { Link } from "@tanstack/react-router";
import { Home, Search, Heart, ShoppingBag, Store } from "lucide-react";
import { useCart } from "@/lib/cart";

export function MobileBottomNav() {
  const { count, setOpen, wishlist } = useCart();
  const item = "flex flex-col items-center gap-1 text-[10px] font-medium text-muted-foreground hover:text-primary transition";
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur border-t border-border h-16 grid grid-cols-5 px-2">
      <Link to="/" className={item} activeProps={{ className: item + " text-primary" }}>
        <Home className="size-5" /> Home
      </Link>
      <Link to="/shop" className={item} activeProps={{ className: item + " text-primary" }}>
        <Store className="size-5" /> Shop
      </Link>
      <Link to="/shop" className={item}>
        <Search className="size-5" /> Search
      </Link>
      <Link to="/account" className={item + " relative"}>
        <Heart className="size-5" /> Wishlist
        {wishlist.length > 0 && (
          <span className="absolute top-0 right-3 min-w-4 h-4 px-1 rounded-full bg-primary text-primary-foreground text-[9px] grid place-items-center">{wishlist.length}</span>
        )}
      </Link>
      <button onClick={() => setOpen(true)} className={item + " relative"}>
        <ShoppingBag className="size-5" /> Cart
        {count > 0 && (
          <span className="absolute top-0 right-3 min-w-4 h-4 px-1 rounded-full bg-primary text-primary-foreground text-[9px] grid place-items-center">{count}</span>
        )}
      </button>
    </nav>
  );
}
