import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NoticeForm from "../../../components/NoticeForm";

export default function EditNoticePage() {
  const router = useRouter();
  const { id } = router.query;

  const [notice, setNotice] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchNotice() {
      try {
        const res = await fetch(`/api/notices/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch notice");
        }

        const data = await res.json();
        setNotice(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchNotice();
  }, [id]);

  if (!notice) {
    return (
      <div className="text-center py-20 text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">
        Edit Notice
      </h1>

      <NoticeForm notice={notice} />
    </div>
  );
}