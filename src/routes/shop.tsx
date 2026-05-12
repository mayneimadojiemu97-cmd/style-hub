import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products, fabrics, allSizes, allColors, categories, formatNaira } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop African Fashion — Àṣà & Style" },
      { name: "description", content: "Browse Ankara, Kente, Adire, Aso-Oke and Batik pieces for women. Filter by fabric, size and colour." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [cats, setCats] = useState<string[]>([]);
  const [fabs, setFabs] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [price, setPrice] = useState<[number, number]>([0, 80000]);
  const [sort, setSort] = useState("newest");

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (cats.length && !cats.includes(p.category)) return false;
      if (fabs.length && !fabs.includes(p.fabric)) return false;
      if (sizes.length && !p.sizes.some((s) => sizes.includes(s))) return false;
      if (colors.length && !p.colors.some((c) => colors.includes(c))) return false;
      if (p.price < price[0] || p.price > price[1]) return false;
      return true;
    });
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "best") list = [...list].sort((a, b) => Number(!!b.bestseller) - Number(!!a.bestseller));
    else list = [...list].sort((a, b) => Number(!!b.newArrival) - Number(!!a.newArrival));
    return list;
  }, [cats, fabs, sizes, colors, price, sort]);

  const toggle = (arr: string[], setter: (v: string[]) => void, v: string) =>
    setter(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const Filters = (
    <div className="space-y-7">
      <FilterGroup title="Category">
        {categories.map((c) => (
          <label key={c.slug} className="flex items-center gap-2 text-sm cursor-pointer">
            <Checkbox checked={cats.includes(c.slug)} onCheckedChange={() => toggle(cats, setCats, c.slug)} />
            {c.name}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Price range">
        <Slider min={0} max={80000} step={1000} value={price} onValueChange={(v) => setPrice([v[0], v[1]] as [number, number])} />
        <p className="text-xs text-muted-foreground mt-2">{formatNaira(price[0])} — {formatNaira(price[1])}</p>
      </FilterGroup>

      <FilterGroup title="Fabric">
        {fabrics.map((f) => (
          <label key={f} className="flex items-center gap-2 text-sm cursor-pointer">
            <Checkbox checked={fabs.includes(f)} onCheckedChange={() => toggle(fabs, setFabs, f)} />
            {f}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => (
            <button
              key={s}
              onClick={() => toggle(sizes, setSizes, s)}
              className={`min-w-10 px-2 h-9 text-xs rounded border transition ${
                sizes.includes(s) ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"
              }`}
            >{s}</button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Colour">
        <div className="flex flex-wrap gap-2">
          {allColors.map((c) => (
            <button
              key={c.hex}
              title={c.name}
              onClick={() => toggle(colors, setColors, c.hex)}
              className={`size-8 rounded-full border-2 transition ${
                colors.includes(c.hex) ? "border-primary scale-110" : "border-border"
              }`}
              style={{ background: c.hex }}
              aria-label={c.name}
            />
          ))}
        </div>
      </FilterGroup>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="font-serif text-4xl md:text-5xl">The Collection</h1>
        <p className="text-muted-foreground mt-2">{filtered.length} pieces</p>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="hidden lg:block sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
          {Filters}
        </aside>

        <div>
          <div className="flex items-center justify-between mb-5 gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <SlidersHorizontal className="size-4 mr-1" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="overflow-y-auto">
                <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
                <div className="mt-6">{Filters}</div>
              </SheetContent>
            </Sheet>

            <div className="ml-auto">
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-44 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="low">Price: Low → High</SelectItem>
                  <SelectItem value="high">Price: High → Low</SelectItem>
                  <SelectItem value="best">Best Selling</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filtered.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
          {filtered.length === 0 && (
            <p className="text-center py-20 text-muted-foreground">No pieces match those filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-serif text-base font-semibold mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
