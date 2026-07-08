import prisma from "../../../lib/prisma";
import validateNotice from "../../../utils/validateNotice";

export default async function handler(req, res) {
    // GET /api/notices
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
            return res.status(500).json({
                success: false,
                error: "Failed to fetch notices",
            });
        }
    }

    // POST /api/notices
    if (req.method === "POST") {
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

            const notice = await prisma.notice.create({
                data: {
                    title: title.trim(),
                    body: body.trim(),
                    category,
                    priority,
                    publishDate: new Date(publishDate),
                    image: image?.trim() || null,
                },
            });

            return res.status(201).json({
                success: true,
                message: "Notice created successfully",
                data: notice,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                error: "Failed to create notice",
            });
        }
    }

    return res.status(405).json({
        success: false,
        error: `Method ${req.method} Not Allowed`,
    });
}