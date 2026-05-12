import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart";
import { PatternStrip } from "./PatternStrip";

const navLinks = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "Our Story" },
  { to: "/size-guide", label: "Size Guide" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { count, setOpen } = useCart();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border/60">
      <PatternStrip />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center gap-4 h-16">
          <button
            className="md:hidden p-2 -ml-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Open menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <Link to="/" className="flex-1 md:flex-none flex items-center gap-2">
            <span className="font-serif text-2xl font-bold tracking-tight">
              Àṣà <span className="text-primary">&</span> Style
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 ml-8 flex-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                activeProps={{ className: "text-primary" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center relative w-64">
            <Search className="absolute left-3 size-4 text-muted-foreground" />
            <Input
              placeholder="Search the collection…"
              className="pl-9 h-9 bg-muted/40 border-border/60"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-1">
            <Button asChild variant="ghost" size="icon" className="hidden sm:inline-flex">
              <Link to="/account" aria-label="Account">
                <User className="size-5" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setOpen(true)}
              aria-label="Cart"
            >
              <ShoppingBag className="size-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold grid place-items-center">
                  {count}
                </span>
              )}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t pt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Search…" className="pl-9" />
            </div>
            <nav className="flex flex-col">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-base font-medium"
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/account" onClick={() => setMobileOpen(false)} className="py-2 text-base">
                My Account
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
