import { MediaGrid } from "./media-grid";

export default function MediaPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Médiathèque</h1>
        <p className="mt-1 text-sm text-text-muted">Parcourir et gérer les fichiers uploadés</p>
      </div>
      <MediaGrid />
    </>
  );
}
