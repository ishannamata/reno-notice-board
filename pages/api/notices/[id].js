import prisma from "../../../lib/prisma";
import validateNotice from "../../../utils/validateNotice";

export default async function handler(req, res) {
  const id = Number(req.query.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      error: "Invalid notice ID",
    });
  }

  // GET /api/notices/:id
  if (req.method === "GET") {
    try {
      const notice = await prisma.notice.findUnique({
        where: { id },
      });

      if (!notice) {
        return res.status(404).json({
          success: false,
          error: "Notice not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: notice,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        error: "Failed to fetch notice",
      });
    }
  }

  // PUT /api/notices/:id
  if (req.method === "PUT") {
    try {
      const errors = validateNotice(req.body);

      if (Object.keys(errors).length > 0) {
        return res.status(400).json({
          success: false,
          errors,
        });
      }

      const {
        title,
        body,
        category,
        priority,
        publishDate,
        image,
      } = req.body;

      const updatedNotice = await prisma.notice.update({
        where: { id },
        data: {
          title: title.trim(),
          body: body.trim(),
          category,
          priority,
          publishDate: new Date(publishDate),
          image: image || null,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Notice updated successfully",
        data: updatedNotice,
      });
    } catch (error) {
      console.error(error);

      if (error.code === "P2025") {
        return res.status(404).json({
          success: false,
          error: "Notice not found",
        });
      }

      return res.status(500).json({
        success: false,
        error: "Failed to update notice",
      });
    }
  }

  // DELETE /api/notices/:id
  if (req.method === "DELETE") {
    try {
      await prisma.notice.delete({
        where: { id },
      });

      return res.status(200).json({
        success: true,
        message: "Notice deleted successfully",
      });
    } catch (error) {
      console.error(error);

      if (error.code === "P2025") {
        return res.status(404).json({
          success: false,
          error: "Notice not found",
        });
      }

      return res.status(500).json({
        success: false,
        error: "Failed to delete notice",
      });
    }
  }

  return res.status(405).json({
    success: false,
    error: `Method ${req.method} Not Allowed`,
  });
}