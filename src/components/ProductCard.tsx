import { Link } from "@tanstack/react-router";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart";
import { formatNaira, type Product } from "@/lib/products";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { add, toggleWish, wishlist } = useCart();
  const wished = wishlist.includes(product.slug);

  return (
    <article className="product-card group relative bg-card border border-border/60 rounded-lg overflow-hidden flex flex-col">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-[4/5] overflow-hidden bg-muted"
      >
        <img
          src={product.images[0]}
          alt={`${product.name} — ${product.english}`}
          loading="lazy"
          className="product-card-img absolute inset-0 w-full h-full object-cover"
        />
        <Badge className="absolute top-3 left-3 bg-forest text-ivory hover:bg-forest border-0">
          {product.origin}
        </Badge>
        <button
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.preventDefault();
            toggleWish(product.slug);
            toast(wished ? "Removed from wishlist" : "Saved to wishlist");
          }}
          className="absolute top-3 right-3 size-9 rounded-full bg-background/90 backdrop-blur grid place-items-center hover:bg-background transition"
        >
          <Heart className={`size-4 ${wished ? "fill-primary text-primary" : "text-foreground"}`} />
        </button>
        <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition">
          <Button
            variant="secondary"
            size="sm"
            className="w-full bg-background/95 hover:bg-background text-foreground"
          >
            <Eye className="size-4 mr-1" /> Quick view
          </Button>
        </div>
      </Link>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div>
          <h3 className="font-serif font-bold text-lg leading-tight">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.english}</p>
        </div>
        <div className="flex items-center gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c}
              className="size-3.5 rounded-full border border-border/70"
              style={{ background: c }}
              aria-label={`color ${c}`}
            />
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="font-semibold text-base">{formatNaira(product.price)}</span>
          <Button
            size="sm"
            onClick={() => {
              add(product.slug, product.sizes[Math.floor(product.sizes.length / 2)] ?? "M");
              toast.success(`${product.name} added to cart`);
            }}
          >
            <ShoppingBag className="size-4 mr-1" /> Add
          </Button>
        </div>
      </div>
    </article>
  );
}
