"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-xl font-bold text-white">
            LM
          </div>
          <h1 className="mt-4 text-2xl font-bold text-text">Administration</h1>
          <p className="mt-1 text-sm text-text-muted">Lycée Montaigne — Beit Chabab</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="admin@lycee-montaigne.edu.lb"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
