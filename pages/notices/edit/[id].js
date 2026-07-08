import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Navbar from "../../../components/Navbar";
import NoticeForm from "../../../components/NoticeForm";

export default function EditNotice() {
  const router = useRouter();
  const { id } = router.query;

  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchNotice() {
      try {
        const res = await fetch(`/api/notices/${id}`);

        if (res.status === 404) {
          setNotFound(true);
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to fetch notice");
        }

        const result = await res.json();
        setNotice(result.data);
      } catch (error) {
        console.error(error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchNotice();
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <>
        <Navbar />

        <main className="max-w-3xl mx-auto p-6">
          <div className="bg-white shadow rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold">
              Loading...
            </h2>

            <p className="text-gray-500 mt-2">
              Please wait while we load the notice.
            </p>
          </div>
        </main>
      </>
    );
  }

  // Notice Not Found
  if (notFound) {
    return (
      <>
        <Navbar />

        <main className="max-w-3xl mx-auto p-6">
          <div className="bg-white shadow rounded-xl p-8 text-center">

            <h1 className="text-4xl font-bold text-red-600">
              404
            </h1>

            <h2 className="text-2xl font-semibold mt-3">
              Notice Not Found
            </h2>

            <p className="text-gray-500 mt-2">
              The notice you're trying to edit doesn't exist.
            </p>

            <button
              onClick={() => router.push("/")}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
            >
              Back to Notice Board
            </button>

          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="max-w-3xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          Edit Notice
        </h1>

        <NoticeForm
          initialData={notice}
          isEditing={true}
        />

      </main>
    </>
  );
}