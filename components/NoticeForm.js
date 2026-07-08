import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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

    // Remove error when user starts typing
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
        alert(data.error || "Something went wrong");
        return;
      }

      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Failed to save notice.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-xl p-6 space-y-5"
    >
      <div>
        <label className="font-medium">
          Title *
        </label>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {errors.title && (
          <p className="text-red-600 text-sm mt-1">
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label className="font-medium">
          Body *
        </label>

        <textarea
          rows={5}
          name="body"
          value={form.body}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {errors.body && (
          <p className="text-red-600 text-sm mt-1">
            {errors.body}
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-5">

        <div>
          <label className="font-medium">
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
          <label className="font-medium">
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

      <div>
        <label className="font-medium">
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

      <div>
        <label className="font-medium">
          Image URL (Optional)
        </label>

        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
      >
        {loading
          ? "Saving..."
          : isEditing
          ? "Update Notice"
          : "Create Notice"}
      </button>
    </form>
  );
}