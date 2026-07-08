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

  const [filter, setFilter] = useState("ALL");

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
      console.error(error);
      toast.error("Failed to load notices");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotices();
  }, []);

  // Dashboard Statistics

  const totalNotices = notices.length;

  const urgentNotices = notices.filter(
    (notice) => notice.priority === "URGENT"
  ).length;

  const normalNotices = notices.filter(
    (notice) => notice.priority === "NORMAL"
  ).length;

  // Filtered List

  const filteredNotices =
    filter === "ALL"
      ? notices
      : notices.filter((notice) => notice.priority === filter);

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

      setNotices((prev) =>
        prev.filter((notice) => notice.id !== selectedId)
      );

      toast.success("Notice deleted successfully");

      setDeleteOpen(false);
      setSelectedId(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete notice");
    } finally {
      setDeleteLoading(false);
    }
  }

  function handleModalClose() {
    setDeleteOpen(false);
    setSelectedId(null);
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100">

        <main className="max-w-7xl mx-auto px-6 py-8">

          {/* Dashboard Cards */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            {/* Total */}

            <div
              onClick={() => setFilter("ALL")}
              className={`cursor-pointer rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
              ${
                filter === "ALL"
                  ? "bg-blue-600 text-white"
                  : "bg-white"
              }`}
            >
              <p className="text-sm font-medium">
                📋 Total Notices
              </p>

              <h2 className="text-5xl font-bold mt-2">
                {totalNotices}
              </h2>

              <p className="mt-4 text-sm">
                View all notices →
              </p>
            </div>

            {/* Urgent */}

            <div
              onClick={() => setFilter("URGENT")}
              className={`cursor-pointer rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
              ${
                filter === "URGENT"
                  ? "bg-red-600 text-white"
                  : "bg-white"
              }`}
            >
              <p className="text-sm font-medium">
                🚨 Urgent Notices
              </p>

              <h2 className="text-5xl font-bold mt-2">
                {urgentNotices}
              </h2>

              <p className="mt-4 text-sm">
                View →
              </p>
            </div>

            {/* Normal */}

            <div
              onClick={() => setFilter("NORMAL")}
              className={`cursor-pointer rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
              ${
                filter === "NORMAL"
                  ? "bg-green-600 text-white"
                  : "bg-white"
              }`}
            >
              <p className="text-sm font-medium">
                📌 Normal Notices
              </p>

              <h2 className="text-5xl font-bold mt-2">
                {normalNotices}
              </h2>

              <p className="mt-4 text-sm">
                View →
              </p>
            </div>

          </div>

          {/* Heading */}

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-3xl font-bold">

              {filter === "ALL" &&
                `All Notices (${totalNotices})`}

              {filter === "URGENT" &&
                `Urgent Notices (${urgentNotices})`}

              {filter === "NORMAL" &&
                `Normal Notices (${normalNotices})`}

            </h2>

          </div>

          {/* Notices */}

          {loading ? (
            <Loading />
          ) : filteredNotices.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {filteredNotices.map((notice) => (
                <NoticeCard
                  key={notice.id}
                  notice={notice}
                  onDeleteClick={handleDeleteClick}
                />
              ))}

            </div>
          )}

        </main>

      </div>

      <ConfirmDeleteModal
        open={deleteOpen}
        onClose={handleModalClose}
        onConfirm={confirmDelete}
        loading={deleteLoading}
      />
    </>
  );
}