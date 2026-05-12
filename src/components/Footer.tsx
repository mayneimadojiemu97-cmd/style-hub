import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Music2 } from "lucide-react";
import { PatternStrip } from "./PatternStrip";

export function Footer() {
  return (
    <footer className="mt-16 bg-forest text-ivory">
      <PatternStrip />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <h3 className="font-serif text-2xl font-bold mb-3">Àṣà & Style</h3>
          <p className="text-sm text-ivory/80 leading-relaxed">
            Honouring the looms, dyers and tailors of the African continent — one woman at a time.
          </p>
        </div>
        <div>
          <h4 className="font-serif text-lg mb-3">Shop</h4>
          <ul className="space-y-2 text-sm text-ivory/80">
            <li><Link to="/shop" className="hover:text-accent">All Pieces</Link></li>
            <li><Link to="/shop" className="hover:text-accent">Ankara Dresses</Link></li>
            <li><Link to="/shop" className="hover:text-accent">Aso-Oke Sets</Link></li>
            <li><Link to="/shop" className="hover:text-accent">Adire Tops</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-lg mb-3">House</h4>
          <ul className="space-y-2 text-sm text-ivory/80">
            <li><Link to="/about" className="hover:text-accent">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
            <li><Link to="/size-guide" className="hover:text-accent">Size Guide</Link></li>
            <li><Link to="/faq" className="hover:text-accent">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-lg mb-3">Stay close</h4>
          <p className="text-sm text-ivory/80 mb-3">Follow the rhythm.</p>
          <div className="flex gap-3">
            <a href="#" aria-label="Instagram" className="size-9 grid place-items-center rounded-full bg-ivory/10 hover:bg-accent hover:text-foreground transition"><Instagram className="size-4" /></a>
            <a href="#" aria-label="TikTok" className="size-9 grid place-items-center rounded-full bg-ivory/10 hover:bg-accent hover:text-foreground transition"><Music2 className="size-4" /></a>
            <a href="#" aria-label="Facebook" className="size-9 grid place-items-center rounded-full bg-ivory/10 hover:bg-accent hover:text-foreground transition"><Facebook className="size-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-ivory/10 py-5 text-center text-xs text-ivory/60">
        © {new Date().getFullYear()} Àṣà & Style. Wear your heritage.
      </div>
    </footer>
  );
}
