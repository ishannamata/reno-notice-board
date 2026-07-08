import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import NoticeCard from "../components/NoticeCard";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedId, setSelectedId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function fetchNotices() {
    try {
      const response = await fetch("/api/notices");

      if (!response.ok) {
        throw new Error("Failed to fetch notices");
      }

      const data = await response.json();
      setNotices(data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotices();
  }, []);

  function handleDeleteClick(id) {
    setSelectedId(id);
    setDeleteOpen(true);
  }

  async function confirmDelete() {
    if (!selectedId) return;

    setDeleteLoading(true);

    try {
      const response = await fetch(`/api/notices/${selectedId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete notice");
      }

      // Remove deleted notice from UI
      setNotices((prev) =>
        prev.filter((notice) => notice.id !== selectedId)
      );

      setDeleteOpen(false);
      setSelectedId(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete notice");
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <Loading />
        ) : notices.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notices.map((notice) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                onDeleteClick={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </main>

      <ConfirmDeleteModal
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedId(null);

          toast.success("Notice deleted successfully");
        }}
        onConfirm={confirmDelete}
        loading={deleteLoading}
      />
    </>
  );
}