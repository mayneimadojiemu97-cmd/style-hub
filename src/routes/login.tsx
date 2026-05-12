import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Àṣà & Style" }] }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  return (
    <div className="mx-auto max-w-md px-4 sm:px-6 py-16">
      <h1 className="font-serif text-4xl text-center">Welcome back</h1>
      <p className="text-center text-muted-foreground mt-2">Sign in to your account</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (typeof window !== "undefined") localStorage.setItem("asa_user", JSON.stringify({ email: form.email, name: form.email.split("@")[0] }));
          toast.success("Welcome back");
          nav({ to: "/account" });
        }}
        className="mt-10 space-y-4 bg-card border rounded-xl p-6"
      >
        <div><Label htmlFor="email">Email</Label><Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
        <div><Label htmlFor="password">Password</Label><Input id="password" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
        <Button type="submit" className="w-full" size="lg">Sign in</Button>
        <p className="text-center text-sm text-muted-foreground">
          New here? <Link to="/signup" className="text-primary hover:underline">Create an account</Link>
        </p>
      </form>
    </div>
  );
}
