import { NewsForm } from "../news-form";

export default function NewNewsPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Nouvelle actualité</h1>
      </div>
      <NewsForm />
    </>
  );
}
