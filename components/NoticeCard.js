import Link from "next/link";

export default function NoticeCard({ notice, onDelete }) {
  const formattedDate = new Date(notice.publishDate).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  const categoryColors = {
    EXAM: "bg-purple-100 text-purple-700",
    EVENT: "bg-green-100 text-green-700",
    GENERAL: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start p-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-800 break-words">
            {notice.title}
          </h2>

          <p className="text-gray-600 mt-3 whitespace-pre-wrap break-words">
            {notice.body}
          </p>
        </div>

        {notice.priority === "URGENT" && (
          <span className="ml-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
            Urgent
          </span>
        )}
      </div>

      {/* Details */}
      <div className="px-6 pb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              categoryColors[notice.category] ||
              "bg-gray-100 text-gray-700"
            }`}
          >
            {notice.category}
          </span>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-semibold text-gray-700">
              Publish Date:
            </span>{" "}
            {formattedDate}
          </p>

          <p>
            <span className="font-semibold text-gray-700">
              Priority:
            </span>{" "}
            {notice.priority}
          </p>
        </div>

        {notice.image && (
          <div className="mt-5">
            <img
              src={notice.image}
              alt={notice.title}
              className="w-full h-48 object-cover rounded-lg border"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <Link
            href={`/notices/edit/${notice.id}`}
            className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Edit
          </Link>

          <button
            onClick={() => onDelete(notice.id)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}