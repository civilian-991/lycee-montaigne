"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const subject = data.get("subject") as string;
    const message = data.get("message") as string;

    // Client-side validation
    const newErrors: Record<string, string> = {};
    if (!name || name.trim().length < 2) newErrors.name = "Le nom est requis (min. 2 caractères).";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Veuillez entrer un email valide.";
    if (!message || message.trim().length < 10) newErrors.message = "Le message doit contenir au moins 10 caractères.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), subject: subject?.trim(), message: message.trim() }),
      });

      if (!res.ok) throw new Error("Erreur serveur");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-6 text-center">
        <p className="font-medium text-green-800">Message envoyé avec succès !</p>
        <p className="mt-2 text-sm text-green-700">
          Nous vous répondrons dans les plus brefs délais.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-green-700 underline hover:text-green-900"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text">
          Nom complet <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Votre nom"
        />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="votre@email.com"
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-text">
          Sujet
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          className="mt-1 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Objet de votre message"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Votre message..."
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.
        </p>
      )}

      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Envoi en cours..." : "Envoyer le message"}
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
