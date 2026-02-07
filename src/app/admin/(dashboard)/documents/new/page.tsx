import { DocumentForm } from "../document-form";

export default function NewDocumentPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Nouveau document</h1>
      </div>
      <DocumentForm />
    </>
  );
}
