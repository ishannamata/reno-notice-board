import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function NoticeForm({
  initialData = null,
  isEditing = false,
}) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    body: "",
    category: "GENERAL",
    priority: "NORMAL",
    publishDate: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        body: initialData.body || "",
        category: initialData.category || "GENERAL",
        priority: initialData.priority || "NORMAL",
        publishDate: initialData.publishDate
          ? initialData.publishDate.slice(0, 10)
          : "",
        image: initialData.image || "",
      });
    }
  }, [initialData]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    

    // Clear error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function validate() {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!form.body.trim()) {
      newErrors.body = "Body is required";
    }

    if (!form.publishDate) {
      newErrors.publishDate = "Publish date is required";
    }

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const url = isEditing
        ? `/api/notices/${initialData.id}`
        : "/api/notices";

      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      toast.success(
        isEditing
          ? "Notice updated successfully!"
          : "Notice created successfully!"
      );

      setTimeout(() => {
        router.push("/");
      }, 800);

    } catch (error) {
      console.error(error);
      toast.error("Failed to save notice.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-8 space-y-6"
    >
      {/* Title */}
      <div>
        <label className="font-semibold">
          Title *
        </label>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter notice title"
        />

        {errors.title && (
          <p className="text-red-600 text-sm mt-1">
            {errors.title}
          </p>
        )}
      </div>

      {/* Body */}
      <div>
        <label className="font-semibold">
          Body *
        </label>

        <textarea
          rows={5}
          name="body"
          value={form.body}
          onChange={handleChange}
          placeholder="Write your notice here..."
          className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {errors.body && (
          <p className="text-red-600 text-sm mt-1">
            {errors.body}
          </p>
        )}
      </div>

      {/* Category & Priority */}
      <div className="grid md:grid-cols-2 gap-5">

        <div>
          <label className="font-semibold">
            Category
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="EXAM">Exam</option>
            <option value="EVENT">Event</option>
            <option value="GENERAL">General</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">
            Priority
          </label>

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="NORMAL">Normal</option>
            <option value="URGENT">Urgent</option>
          </select>
        </div>

      </div>

      {/* Publish Date */}
      <div>
        <label className="font-semibold">
          Publish Date *
        </label>

        <input
          type="date"
          name="publishDate"
          value={form.publishDate}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {errors.publishDate && (
          <p className="text-red-600 text-sm mt-1">
            {errors.publishDate}
          </p>
        )}
      </div>

      {/* Image URL */}
      <div>
        <label className="font-semibold">
          Image URL (Optional)
        </label>

        <input
          type="url"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition duration-200 flex justify-center items-center gap-2"
      >
        {loading ? (
          <>
            <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Saving...
          </>
        ) : isEditing ? (
          "Update Notice"
        ) : (
          "Create Notice"
        )}
      </button>
    </form>
  );
}