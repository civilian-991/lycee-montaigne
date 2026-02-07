import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="mt-4 text-xl font-medium text-text">Page non trouvée</p>
      <p className="mt-2 text-text-muted">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-light"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
