import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/lib/cart";
import { products, formatNaira } from "@/lib/products";
import { toast } from "sonner";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My Account — Àṣà & Style" }] }),
  component: Account,
});

function Account() {
  const nav = useNavigate();
  const { wishlist, toggleWish } = useCart();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const u = localStorage.getItem("asa_user");
    if (u) setUser(JSON.parse(u));
    else nav({ to: "/login" });
  }, [nav]);

  if (!user) return null;

  const wished = products.filter((p) => wishlist.includes(p.slug));

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <div>
          <h1 className="font-serif text-4xl">Hello, {user.name}</h1>
          <p className="text-muted-foreground mt-1">{user.email}</p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            if (typeof window !== "undefined") localStorage.removeItem("asa_user");
            toast.success("Signed out");
            nav({ to: "/" });
          }}
        >Sign out</Button>
      </div>

      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-6">
          <div className="bg-card border rounded-xl p-10 text-center text-muted-foreground">
            <p>You haven't placed any orders yet.</p>
            <Button asChild className="mt-4"><Link to="/shop">Start shopping</Link></Button>
          </div>
        </TabsContent>

        <TabsContent value="wishlist" className="mt-6">
          {wished.length === 0 ? (
            <div className="bg-card border rounded-xl p-10 text-center text-muted-foreground">
              Your wishlist is empty.
            </div>
          ) : (
            <ul className="grid sm:grid-cols-2 gap-4">
              {wished.map((p) => (
                <li key={p.slug} className="flex gap-3 bg-card border rounded-xl p-3">
                  <img src={p.images[0]} alt={p.name} className="size-24 rounded-md object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif font-bold">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.english}</p>
                    <p className="font-semibold mt-1">{formatNaira(p.price)}</p>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => toggleWish(p.slug)}>Remove</Button>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>

        <TabsContent value="profile" className="mt-6 max-w-md space-y-4 bg-card border rounded-xl p-6">
          <div><Label>Name</Label><Input value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} /></div>
          <div><Label>Email</Label><Input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} /></div>
          <Button onClick={() => {
            if (typeof window !== "undefined") localStorage.setItem("asa_user", JSON.stringify(user));
            toast.success("Profile saved");
          }}>Save changes</Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
