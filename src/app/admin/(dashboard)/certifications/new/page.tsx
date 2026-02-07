import { CertificationForm } from "../certification-form";

export default function NewCertificationPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Nouvelle certification</h1>
      </div>
      <CertificationForm />
    </>
  );
}
