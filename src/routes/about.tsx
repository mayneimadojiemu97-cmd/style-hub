import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Àṣà & Style" },
      { name: "description", content: "How Àṣà & Style began — celebrating African textile heritage through fashion made for the modern woman." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="bg-terracotta text-ivory">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-20 text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold">Cloth with memory.</h1>
          <p className="mt-5 text-lg text-ivory/90 max-w-2xl mx-auto">
            We are a women-led house honouring the dyers, weavers and seamstresses of Africa.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 prose prose-lg">
        <h2 className="font-serif text-3xl">Our beginning</h2>
        <p className="mt-4 text-foreground/80 leading-relaxed">
          Àṣà & Style was founded in Lagos by three friends who refused to let African textile
          traditions become souvenir. We grew up around aunties draped in Aso-Oke, mothers dyeing
          Adire in their backyards, grandmothers tying gele as if drawing constellations.
        </p>
        <h2 className="font-serif text-3xl mt-12">Our promise</h2>
        <p className="mt-4 text-foreground/80 leading-relaxed">
          Every piece is sourced from women-led workshops paid fair, sewn by tailors we know by name,
          and quality-checked twice before it reaches you. We believe fashion can carry heritage
          forward without flattening it.
        </p>
        <h2 className="font-serif text-3xl mt-12">Our mission</h2>
        <p className="mt-4 text-foreground/80 leading-relaxed">
          To dress the modern African woman — and every woman who loves her — in cloth that
          remembers where it came from.
        </p>
      </div>
    </div>
  );
}
