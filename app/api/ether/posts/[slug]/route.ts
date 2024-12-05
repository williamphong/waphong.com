import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/connect';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: any }> }
) {
  const slug = (await params).slug; // 'a', 'b', or 'c'

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
      { message: 'Something went wrong!' },
      { status: 500 }
    );
  }
}
