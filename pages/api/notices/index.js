import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const notices = await prisma.notice.findMany({
        orderBy: [
          {
            priority: "desc",
          },
          {
            publishDate: "desc",
          },
        ],
      });

      return res.status(200).json(notices);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch notices" });
    }
  }

  if (req.method === "POST") {
    try {
      const {
        title,
        body,
        category,
        priority,
        publishDate,
        image,
      } = req.body;

      // Server-side Validation
      if (!title || !body) {
        return res.status(400).json({
          error: "Title and Body are required",
        });
      }

      if (
        !["EXAM", "EVENT", "GENERAL"].includes(category)
      ) {
        return res.status(400).json({
          error: "Invalid category",
        });
      }

      if (
        !["NORMAL", "URGENT"].includes(priority)
      ) {
        return res.status(400).json({
          error: "Invalid priority",
        });
      }

      if (isNaN(new Date(publishDate))) {
        return res.status(400).json({
          error: "Invalid publish date",
        });
      }

      const notice = await prisma.notice.create({
        data: {
          title,
          body,
          category,
          priority,
          publishDate: new Date(publishDate),
          image,
        },
      });

      return res.status(201).json(notice);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Failed to create notice",
      });
    }
  }

  return res.status(405).json({
    error: "Method Not Allowed",
  });
}