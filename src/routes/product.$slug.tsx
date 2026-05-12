import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, Minus, Plus, Ruler, ShoppingBag } from "lucide-react";
import { getProduct, relatedProducts, formatNaira } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Àṣà & Style` },
          { name: "description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.images[0] },
        ]
      : [],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: NonNullable<ReturnType<typeof getProduct>> };
  const [size, setSize] = useState(product.sizes[Math.floor(product.sizes.length / 2)]);
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const { add, toggleWish, wishlist } = useCart();
  const wished = wishlist.includes(product.slug);
  const related = relatedProducts(product.slug, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <nav className="text-xs text-muted-foreground mb-6">
        <Link to="/" className="hover:text-primary">Home</Link> /{" "}
        <Link to="/shop" className="hover:text-primary">Shop</Link> /{" "}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <div className="aspect-[4/5] rounded-xl overflow-hidden bg-muted relative group">
            <img
              src={product.images[active]}
              alt={product.name}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
            />
            <Badge className="absolute top-4 left-4 bg-forest text-ivory border-0">{product.origin}</Badge>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {product.images.map((src, i) => (
              <button
                key={src}
                onClick={() => setActive(i)}
                className={`aspect-square rounded-md overflow-hidden border-2 ${active === i ? "border-primary" : "border-transparent"}`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">{product.name}</h1>
          <p className="text-lg text-muted-foreground mt-1">{product.english}</p>
          <p className="mt-5 text-2xl font-semibold">{formatNaira(product.price)}</p>

          <p className="mt-6 leading-relaxed text-foreground/80">{product.description}</p>

          <div className="mt-7">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Size</p>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-xs inline-flex items-center gap-1 text-primary hover:underline">
                    <Ruler className="size-3" /> Size guide
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle className="font-serif text-2xl">Size Guide</DialogTitle></DialogHeader>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="text-left bg-muted">
                        <tr><th className="p-2">Size</th><th className="p-2">Bust (in)</th><th className="p-2">Waist (in)</th><th className="p-2">Hip (in)</th></tr>
                      </thead>
                      <tbody>
                        {[["XS","32","24","34"],["S","34","26","36"],["M","36","28","38"],["L","38","30","40"],["XL","40","32","42"],["2XL","43","35","45"],["3XL","46","38","48"]].map(r => (
                          <tr key={r[0]} className="border-t"><td className="p-2 font-semibold">{r[0]}</td><td className="p-2">{r[1]}</td><td className="p-2">{r[2]}</td><td className="p-2">{r[3]}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-12 h-10 px-3 text-sm rounded border transition ${
                    size === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"
                  }`}
                >{s}</button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium mb-2">Colour</p>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <span key={c} className="size-8 rounded-full border border-border" style={{ background: c }} />
              ))}
            </div>
          </div>

          <div className="mt-7 flex items-center gap-3">
            <div className="inline-flex items-center border rounded-md">
              <button className="size-10 grid place-items-center hover:bg-muted" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease"><Minus className="size-4" /></button>
              <span className="w-10 text-center font-medium">{qty}</span>
              <button className="size-10 grid place-items-center hover:bg-muted" onClick={() => setQty(qty + 1)} aria-label="Increase"><Plus className="size-4" /></button>
            </div>
            <Button
              size="lg"
              className="flex-1"
              onClick={() => {
                add(product.slug, size, qty);
                toast.success(`${product.name} added to your basket`);
              }}
            >
              <ShoppingBag className="size-4 mr-2" /> Add to basket
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => { toggleWish(product.slug); toast(wished ? "Removed" : "Saved to wishlist"); }}
              aria-label="Wishlist"
            >
              <Heart className={`size-5 ${wished ? "fill-primary text-primary" : ""}`} />
            </Button>
          </div>

          <Accordion type="single" collapsible className="mt-8">
            <AccordionItem value="fabric">
              <AccordionTrigger>Fabric & cultural significance</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-foreground/80">
                {product.fabric} cloth has been worn for generations across West Africa. Each motif carries
                meaning — from prosperity and unity to feminine power. This piece honours that tradition
                while being cut for everyday wear.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="care">
              <AccordionTrigger>Care instructions</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-foreground/80">
                Hand wash in cold water with mild detergent. Dry in shade to preserve dye vibrancy.
                Iron on low heat, inside out. Do not bleach.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ship">
              <AccordionTrigger>Shipping & returns</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-foreground/80">
                Ships within 3–5 working days across Nigeria. International delivery 7–14 days.
                14-day return window for unworn items with tags.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-serif text-3xl mb-6">You may also like</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {related.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
    </div>
  );
}
