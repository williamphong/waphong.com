import prisma from "@/lib/connect";
import { NextRequest, NextResponse } from "next/server";

// GET SINGLE POST
export const GET = async (req: NextRequest, context: { params: { slug: string } }) => {
  const { slug } = context.params; // Extract slug from context.params

  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { user: true },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};
