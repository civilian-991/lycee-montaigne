import { ActivityForm } from "../activity-form";

export default function NewActivityPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Nouvelle activité</h1>
      </div>
      <ActivityForm />
    </>
  );
}
