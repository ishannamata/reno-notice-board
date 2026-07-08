import Navbar from "../../components/Navbar";
import NoticeForm from "../../components/NoticeForm";

export default function AddNotice() {
  return (
    <>
      <Navbar />

      <main className="max-w-3xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          Add New Notice
        </h1>

        <NoticeForm />

      </main>
    </>
  );
}