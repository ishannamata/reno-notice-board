import Link from "next/link";

export default function NoticeCard({ notice, onDeleteClick }) {
  const formattedDate = new Date(notice.publishDate).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  function getCategoryColor(category) {
    switch (category) {
      case "EXAM":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "EVENT":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">

      {/* Image */}
      {notice.image && (
        <img
          src={notice.image}
          alt={notice.title}
          onError={(e) => {
            e.target.style.display = "none";
          }}
          className="w-full h-40 object-cover"
        />
      )}

      <div className="p-6 flex flex-col flex-1">

        {/* Header */}
        <div className="flex justify-between items-start gap-3">

          <h2 className="text-xl font-bold text-gray-800 break-words">
            {notice.title}
          </h2>

          {notice.priority === "URGENT" ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 border border-red-300 text-xs font-semibold whitespace-nowrap">
              🚨 Urgent
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-300 text-xs font-semibold whitespace-nowrap">
              Normal
            </span>
          )}

        </div>

        {/* Body */}
        <p className="text-gray-600 mt-4 whitespace-pre-wrap break-words leading-relaxed">
          {notice.body}
        </p>

        {/* Category */}
        <div className="mt-5 flex flex-wrap gap-2">

          <span
            className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold ${getCategoryColor(
              notice.category
            )}`}
          >
            📂 {notice.category}
          </span>

        </div>

        {/* Details */}
        <div className="mt-5 space-y-2 text-sm text-gray-600">

          <div className="flex items-center gap-2">
            📅
            <span>
              Published on{" "}
              <strong>{formattedDate}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            ⚡
            <span>
              Priority:{" "}
              <strong>{notice.priority}</strong>
            </span>
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-auto pt-6 flex gap-3">

          <Link
            href={`/notices/edit/${notice.id}`}
            className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-200"
          >
            Edit
          </Link>

          <button
            onClick={() => onDeleteClick(notice.id)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition duration-200"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}