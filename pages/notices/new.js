import NoticeForm from "../../components/NoticeForm";

export default function NewNoticePage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">
        Add New Notice
      </h1>

      <NoticeForm />
    </div>
  );
}