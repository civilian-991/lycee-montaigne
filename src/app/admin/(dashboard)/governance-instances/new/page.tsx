import { GovernanceInstanceForm } from "../governance-instance-form";

export default function NewGovernanceInstancePage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Nouvelle instance</h1>
      </div>
      <GovernanceInstanceForm />
    </>
  );
}
