import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../components/Navbar";
import NoticeForm from "../../components/NoticeForm";

export default function AddNotice() {
  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-8">

        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6 transition"
        >
          <ArrowLeft size={18} />
          Back to Notices
        </Link>

        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Add New Notice
          </h1>
        </div>

        {/* Notice Form */}
        <NoticeForm />

      </main>
    </>
  );
}