import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoticeCard from "../components/NoticeCard";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

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

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/notices/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete notice");
      }

      setNotices((prev) => prev.filter((notice) => notice.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete notice.");
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
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}