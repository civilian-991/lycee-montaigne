"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-primary">500</h1>
      <p className="mt-4 text-xl font-medium text-text">Erreur serveur</p>
      <p className="mt-2 text-text-muted">
        Une erreur inattendue s&apos;est produite. Veuillez réessayer.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-light"
      >
        Réessayer
      </button>
    </div>
  );
}
