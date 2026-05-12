import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Àṣà & Style" },
      { name: "description", content: "Answers to common questions on sizing, shipping, returns and fabric care." },
    ],
  }),
  component: Faq,
});

const faqs = [
  { q: "How do I find my size?", a: "Use our Size Guide page or the Size Guide button on each product. If you're between sizes, we recommend sizing up for Aso-Oke and Kente, and true-to-size for Ankara and Adire." },
  { q: "Do you ship internationally?", a: "Yes, we ship worldwide. International orders arrive in 7–14 working days. Customs duties are the buyer's responsibility." },
  { q: "What is your return policy?", a: "We accept returns within 14 days of delivery on unworn items with original tags. Custom and bridal pieces are final sale." },
  { q: "How should I care for my pieces?", a: "Hand wash in cold water with mild detergent. Dry in shade. Iron inside out on low heat. Avoid bleach and harsh chemicals." },
  { q: "Are your fabrics authentic?", a: "Yes. We work directly with women-led workshops in Nigeria, Ghana and across West Africa. Every piece is documented with its origin." },
  { q: "Can I order custom pieces?", a: "Absolutely. WhatsApp us with your inspiration and measurements — bridal lead time is 4–6 weeks." },
];

function Faq() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
      <h1 className="font-serif text-5xl text-center">Questions</h1>
      <Accordion type="single" collapsible className="mt-10">
        {faqs.map((f) => (
          <AccordionItem key={f.q} value={f.q}>
            <AccordionTrigger className="font-serif text-lg text-left">{f.q}</AccordionTrigger>
            <AccordionContent className="text-foreground/80 leading-relaxed">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
