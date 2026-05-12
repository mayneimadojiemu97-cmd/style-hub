import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/products";

export function CartDrawer() {
  const { open, setOpen, detailed, setQty, remove, subtotal } = useCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-md p-0">
        <SheetHeader className="px-5 pt-5 pb-3 border-b">
          <SheetTitle className="font-serif text-2xl">Your Basket</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {detailed.length === 0 ? (
            <div className="h-full grid place-items-center text-center text-muted-foreground py-16">
              <div>
                <ShoppingBag className="mx-auto mb-3 size-8 opacity-50" />
                <p>Your basket is empty.</p>
                <Button asChild className="mt-4" onClick={() => setOpen(false)}>
                  <Link to="/shop">Discover the collection</Link>
                </Button>
              </div>
            </div>
          ) : (
            <ul className="space-y-4">
              {detailed.map((it) => (
                <li key={it.slug + it.size} className="flex gap-3">
                  <img
                    src={it.product.images[0]}
                    alt={it.product.name}
                    className="size-20 rounded-md object-cover bg-muted"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-serif font-bold truncate">{it.product.name}</p>
                        <p className="text-xs text-muted-foreground">Size {it.size}</p>
                      </div>
                      <button
                        onClick={() => remove(it.slug, it.size)}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label="Remove"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center border rounded-md">
                        <button
                          className="size-7 grid place-items-center hover:bg-muted"
                          onClick={() => setQty(it.slug, it.size, it.qty - 1)}
                          aria-label="Decrease"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{it.qty}</span>
                        <button
                          className="size-7 grid place-items-center hover:bg-muted"
                          onClick={() => setQty(it.slug, it.size, it.qty + 1)}
                          aria-label="Increase"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <span className="font-semibold text-sm">
                        {formatNaira(it.product.price * it.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {detailed.length > 0 && (
          <SheetFooter className="border-t bg-muted/30 p-5 gap-3 flex-col sm:flex-col">
            <div className="flex justify-between text-base">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">{formatNaira(subtotal)}</span>
            </div>
            <Button asChild size="lg" onClick={() => setOpen(false)}>
              <Link to="/checkout">Proceed to checkout</Link>
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
