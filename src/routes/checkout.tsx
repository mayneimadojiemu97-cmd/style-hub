import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/products";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Àṣà & Style" }] }),
  component: Checkout,
});

function Checkout() {
  const nav = useNavigate();
  const { detailed, subtotal, clear } = useCart();
  const shipping = subtotal > 0 ? 3500 : 0;
  const total = subtotal + shipping;
  const [pay, setPay] = useState("paystack");

  if (detailed.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-serif text-3xl">Your basket is empty</h1>
        <Button className="mt-6" onClick={() => nav({ to: "/shop" })}>Discover the collection</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="font-serif text-4xl mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-[1fr_380px] gap-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Order placed! A confirmation has been sent to your email.");
            clear();
            nav({ to: "/account" });
          }}
          className="space-y-8"
        >
          <section className="bg-card border rounded-xl p-6">
            <h2 className="font-serif text-xl mb-4">Contact</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Full name</Label><Input required /></div>
              <div><Label>Email</Label><Input type="email" required /></div>
              <div className="sm:col-span-2"><Label>Phone</Label><Input type="tel" required /></div>
            </div>
          </section>

          <section className="bg-card border rounded-xl p-6">
            <h2 className="font-serif text-xl mb-4">Shipping address</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><Label>Address</Label><Textarea required rows={2} /></div>
              <div><Label>City</Label><Input required /></div>
              <div><Label>State</Label><Input required /></div>
              <div><Label>Postal code</Label><Input /></div>
              <div><Label>Country</Label><Input defaultValue="Nigeria" required /></div>
            </div>
          </section>

          <section className="bg-card border rounded-xl p-6">
            <h2 className="font-serif text-xl mb-4">Payment</h2>
            <RadioGroup value={pay} onValueChange={setPay} className="space-y-3">
              <label className="flex items-start gap-3 border rounded-lg p-4 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                <RadioGroupItem value="paystack" />
                <div>
                  <p className="font-semibold">Paystack</p>
                  <p className="text-xs text-muted-foreground">Card, bank, USSD, transfer — secure checkout (placeholder)</p>
                </div>
              </label>
              <label className="flex items-start gap-3 border rounded-lg p-4 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                <RadioGroupItem value="bank" />
                <div>
                  <p className="font-semibold">Bank transfer</p>
                  <p className="text-xs text-muted-foreground">Account details will be sent after order confirmation</p>
                </div>
              </label>
            </RadioGroup>
          </section>

          <Button type="submit" size="lg" className="w-full">Place order — {formatNaira(total)}</Button>
        </form>

        <aside className="bg-muted/30 border rounded-xl p-6 h-fit lg:sticky lg:top-24">
          <h2 className="font-serif text-xl mb-4">Order summary</h2>
          <ul className="space-y-3">
            {detailed.map((it) => (
              <li key={it.slug + it.size} className="flex gap-3 text-sm">
                <img src={it.product.images[0]} alt={it.product.name} className="size-14 rounded object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-serif font-bold truncate">{it.product.name}</p>
                  <p className="text-xs text-muted-foreground">Size {it.size} · Qty {it.qty}</p>
                </div>
                <span className="font-medium">{formatNaira(it.product.price * it.qty)}</span>
              </li>
            ))}
          </ul>
          <hr className="my-5" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatNaira(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{formatNaira(shipping)}</span></div>
            <div className="flex justify-between text-base font-semibold pt-2 border-t"><span>Total</span><span>{formatNaira(total)}</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}
