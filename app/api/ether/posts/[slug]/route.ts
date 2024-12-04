import prisma from "@/lib/connect";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;  // `slug` is part of the query parameters

  try {
    // Assuming `prisma` is set up correctly
    const post = await prisma.post.findUnique({
      where: { slug: slug as string },
    });

    if (post) {
      return res.status(200).json(post);
    } else {
      return res.status(404).json({ error: "Post not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};