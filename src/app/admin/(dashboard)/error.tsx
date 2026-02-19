"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="rounded-lg border border-red-200 bg-red-50 p-8 max-w-md">
        <h2 className="text-lg font-semibold text-red-800">
          Erreur inattendue
        </h2>
        <p className="mt-2 text-sm text-red-600">
          {process.env.NODE_ENV === "development"
            ? error.message || "Une erreur s'est produite dans le panneau d'administration."
            : "Une erreur est survenue."}
        </p>
        {error.digest && (
          <p className="mt-1 text-xs text-red-400">Ref: {error.digest}</p>
        )}
        <button
          onClick={reset}
          className="mt-6 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
