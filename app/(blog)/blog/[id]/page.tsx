import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/data';

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ id: post.id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <article className="flex-col lg:flex lg:h-screen">
      <div className="h-full">
        <header className="flex flex-row items-center justify-between border-b px-16 py-6">
          <Link
            href="/blog"
            className="text-rpd-subtle dark:text-rp-subtle hover:text-rpd-text dark:hover:text-rp-text inline-block text-sm transition-colors"
          >
            ← All posts
          </Link>
          <h1 className="text-rpd-text dark:text-rp-text text-xl font-bold">
            {post.title}
          </h1>
          <p className="text-rpd-muted dark:text-rp-muted">{post.date}</p>
        </header>
        <section className="px-16 py-6">
          <div className="prose prose-invert max-w-none">
            <div className="text-rpd-subtle dark:text-rp-subtle leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </section>
      </div>

      <footer className="border-rpd-muted/20 dark:border-rp-muted/20 flex flex-col items-center justify-center gap-y-4 border-t py-12 md:py-20 lg:py-8">
        <Link
          href="/blog"
          className="text-rpd-rose dark:text-rp-love text-sm hover:underline"
        >
          ← Back to all posts
        </Link>
      </footer>
    </article>
  );
}
