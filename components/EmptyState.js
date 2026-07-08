import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="text-center py-24">

      <div className="text-7xl mb-4">
        📢
      </div>

      <h2 className="text-3xl font-bold">
        No Notices Yet
      </h2>

      <p className="text-gray-500 mt-2">
        Create your first notice to get started.
      </p>

      <Link
        href="/notices/new"
        className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Create Notice
      </Link>

    </div>
  );
}