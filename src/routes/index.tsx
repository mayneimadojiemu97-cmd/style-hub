import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero.jpg";
import ankaraCategoryImg from "@/assets/ankara-category.jpg";
import adireTopsImg from "@/assets/Adire_tops.jpg";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/lib/products";
import { Reveal } from "@/components/Reveal";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Àṣà & Style — Wear Your Heritage. Own Your Story." },
      { name: "description", content: "Vibrant African print dresses, wraps and sets for women. Shop Ankara, Kente, Adire, Aso-Oke and Batik." },
    ],
  }),
  component: Home,
});

const testimonials = [
  { name: "Adaeze O.", quote: "I wore the Ìṣọ Àṣà to my engagement and felt like the daughter of every queen who came before me.", role: "Lagos" },
  { name: "Naomi K.", quote: "The Aso-Oke set is heavier than I expected, in the best way. It moves like water, sits like stone.", role: "Accra" },
  { name: "Zola M.", quote: "Finally, African fashion that fits a tall woman. Tailoring is impeccable.", role: "Johannesburg" },
];

function Home() {
  const [email, setEmail] = useState("");
  const featured = products.slice(0, 8);

  return (
    <div>
      {/* HERO */}
      <section className="hero relative overflow-hidden bg-forest text-ivory">
        <div className="absolute inset-0 opacity-30 pattern-adire" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 md:py-32 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent animate-float-up">
              <Sparkles className="size-3.5" /> A women's house of African textile
            </span>
            <h1 className="mt-4 font-serif text-5xl md:text-7xl font-bold leading-[1.05] text-balance animate-float-up-delay-1">
              Wear Your Heritage. <span className="text-accent">Own Your Story.</span>
            </h1>
            <p className="mt-5 text-base md:text-lg text-white max-w-lg animate-float-up-delay-2">
              Àṣà & Style is a women's atelier celebrating the looms, dyers and tailors of Africa.
              Every piece is a love letter to the women who keep our culture alive.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 animate-float-up-delay-3">
              <Button asChild size="lg" className="bg-accent text-foreground hover:bg-accent/90">
                <Link to="/shop">Shop the collection <ArrowRight className="ml-1 size-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-forest bg-transparent">
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden shadow-2xl animate-float-up-delay-4">
            <img
              src={heroImage}
              alt="Black African woman in traditional Ankara attire"
              className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
            />
            <div className="absolute -bottom-1 -right-1 w-32 h-32 pattern-kente rounded-tl-2xl" aria-hidden />
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-16 text-center">
        <h2 className="font-serif text-3xl md:text-4xl">
          A celebration of African culture, cut for the modern woman.
        </h2>
        <p className="mt-4 text-muted-foreground text-balance">
          From the indigo vats of Abeokuta to the Asante looms of Bonwire, we work directly with
          women-led workshops to bring you fabric with memory — tailored for how you live now.
        </p>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-serif text-3xl md:text-4xl">Shop by category</h2>
          <Link to="/shop" className="text-sm text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {categories.map((c, i) => (
            <Link
              key={c.slug}
              to="/shop"
              className="category-tile group relative aspect-[4/5] rounded-xl overflow-hidden bg-muted block"
            >
              <img
              src={i === 0 ? adireTopsImg : `https://images.unsplash.com/photo-${
                ["1760907949889-eb62b7fd9f75", "1720343354552-dbcdba68f7d7", "1763368160924-abab3611ea3e", "1756842583327-d72f68f92dbd", "1666974932375-90e8a25bc1ef"][i]
              }?auto=format&fit=crop&w=600&q=80`}
                alt={c.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-x-3 bottom-3 text-ivory">
                <p className="font-serif font-bold text-lg leading-tight">{c.name}</p>
                <p className="text-[11px] text-ivory/80">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl">Featured pieces</h2>
            <p className="text-muted-foreground mt-1">Handpicked for the season</p>
          </div>
          <Link to="/shop" className="text-sm text-primary hover:underline">Shop all →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      {/* CULTURAL STORY */}
      <Reveal as="section" className="bg-terracotta text-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div className="aspect-[5/4] rounded-2xl overflow-hidden shadow-xl order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1687052093309-7a14efa58ecb?auto=format&fit=crop&w=1000&q=85"
              alt="Black African woman in traditional attire"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">Every fabric tells a story.</h2>
            <p className="mt-5 text-ivory/90 leading-relaxed">
              Adire was a quiet language between Yoruba women. Kente cloth was royal grammar in
              Asante courts. Aso-Oke is the heartbeat of Yoruba ceremony. We work with the
              keepers of these traditions, paying fair, sourcing slowly, and sewing each piece
              with pride.
            </p>
            <Button asChild className="mt-7 bg-ivory text-foreground hover:bg-ivory/90">
              <Link to="/about">Read our story</Link>
            </Button>
          </div>
        </div>
      </Reveal>

      {/* NEWSLETTER */}
      <Reveal as="section" className="mx-auto max-w-3xl px-4 sm:px-6 py-20 text-center">
        <h2 className="font-serif text-3xl md:text-4xl">Join the tribe</h2>
        <p className="mt-3 text-muted-foreground">
          Get style inspiration, cultural notes and first access to new arrivals.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!email.includes("@")) return toast.error("Please enter a valid email.");
            toast.success("Welcome to the tribe ✨");
            setEmail("");
          }}
          className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
        >
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 rounded-md flex-1"
            required
          />
          <Button type="submit" className="h-12 rounded-md px-8 text-sm">Join</Button>
        </form>
      </Reveal>

      {/* TESTIMONIALS */}
      <Reveal as="section" className="bg-muted/40 border-y border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-10">Worn with love</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <figure key={t.name} className="bg-card rounded-xl p-6 border border-border/60">
                <div className="text-accent text-2xl">★★★★★</div>
                <blockquote className="mt-3 font-serif text-lg leading-relaxed">"{t.quote}"</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold">{t.name}</span>
                  <span className="text-muted-foreground"> — {t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
