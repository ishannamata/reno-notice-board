export default function validateNotice(data) {
  const errors = {};

  if (!data.title || data.title.trim() === "") {
    errors.title = "Title is required";
  }

  if (!data.body || data.body.trim() === "") {
    errors.body = "Body is required";
  }

  const validCategories = ["EXAM", "EVENT", "GENERAL"];

  if (!validCategories.includes(data.category)) {
    errors.category = "Invalid category";
  }

  const validPriorities = ["NORMAL", "URGENT"];

  if (!validPriorities.includes(data.priority)) {
    errors.priority = "Invalid priority";
  }

  if (!data.publishDate || isNaN(Date.parse(data.publishDate))) {
    errors.publishDate = "Invalid publish date";
  }

  return errors;
}