import { AnnouncementForm } from "../announcement-form";

export default function NewAnnouncementPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Nouvelle annonce</h1>
      </div>
      <AnnouncementForm />
    </>
  );
}
