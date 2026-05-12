import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — Àṣà & Style" }] }),
  component: Signup,
});

function Signup() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  return (
    <div className="mx-auto max-w-md px-4 sm:px-6 py-16">
      <h1 className="font-serif text-4xl text-center">Join the tribe</h1>
      <p className="text-center text-muted-foreground mt-2">Create your account</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (typeof window !== "undefined") localStorage.setItem("asa_user", JSON.stringify({ email: form.email, name: form.name }));
          toast.success("Account created");
          nav({ to: "/account" });
        }}
        className="mt-10 space-y-4 bg-card border rounded-xl p-6"
      >
        <div><Label htmlFor="name">Full name</Label><Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div><Label htmlFor="email">Email</Label><Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
        <div><Label htmlFor="password">Password</Label><Input id="password" type="password" required minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
        <Button type="submit" className="w-full" size="lg">Create account</Button>
        <p className="text-center text-sm text-muted-foreground">
          Already have one? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
