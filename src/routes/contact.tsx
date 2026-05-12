import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Instagram, Facebook, Music2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(10).max(1000),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Àṣà & Style" },
      { name: "description", content: "Reach out via email, WhatsApp or social. We respond within 24 hours." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
      <h1 className="font-serif text-5xl text-center">Talk to us</h1>
      <p className="text-center text-muted-foreground mt-3">
        We love hearing from our community.
      </p>

      <div className="grid md:grid-cols-2 gap-10 mt-12">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const r = schema.safeParse(form);
            if (!r.success) return toast.error(r.error.issues[0]?.message ?? "Invalid input");
            toast.success("Sent! We'll reply within 24 hours.");
            setForm({ name: "", email: "", message: "" });
          }}
          className="space-y-4 bg-card border rounded-xl p-6"
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
          </div>
          <Button type="submit" className="w-full">Send message</Button>
        </form>

        <div className="space-y-5">
          <div className="bg-forest text-ivory rounded-xl p-6">
            <h3 className="font-serif text-2xl">Visit our studio</h3>
            <p className="mt-2 text-ivory/85 text-sm leading-relaxed">
              14 Bishop Aboyade Cole, Victoria Island, Lagos<br />
              Mon–Sat · 10am – 7pm
            </p>
          </div>
          <a
            href="https://wa.me/2348000000000"
            className="flex items-center gap-3 bg-secondary text-secondary-foreground rounded-xl p-5 hover:opacity-90 transition"
          >
            <MessageCircle className="size-6" />
            <div>
              <p className="font-semibold">WhatsApp</p>
              <p className="text-xs opacity-80">Chat with a stylist now</p>
            </div>
          </a>
          <div className="flex gap-3">
            <a href="#" className="flex-1 grid place-items-center bg-card border rounded-xl py-5 hover:border-primary transition" aria-label="Instagram"><Instagram /></a>
            <a href="#" className="flex-1 grid place-items-center bg-card border rounded-xl py-5 hover:border-primary transition" aria-label="TikTok"><Music2 /></a>
            <a href="#" className="flex-1 grid place-items-center bg-card border rounded-xl py-5 hover:border-primary transition" aria-label="Facebook"><Facebook /></a>
          </div>
        </div>
      </div>
    </div>
  );
}
