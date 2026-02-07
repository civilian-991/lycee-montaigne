import { EventForm } from "../event-form";

export default function NewAlumniEventPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Nouvel événement</h1>
      </div>
      <EventForm />
    </>
  );
}
