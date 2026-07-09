import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
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
    alternates: { canonical: `/blog/${id}` },
    // Without this the post inherits the blog layout's og:url, which is
    // hardcoded to /blog, so every shared post pointed at the index.
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${id}`,
      type: 'article',
    },
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
          {/* post.content is Markdown. Rendered in a Server Component, so this
              costs no client JS. `whitespace-pre-wrap` must stay off — it would
              preserve the source newlines inside the generated elements. */}
          <div className="prose dark:prose-invert prose-headings:text-rpd-text dark:prose-headings:text-rp-text text-rpd-subtle dark:text-rp-subtle max-w-none leading-relaxed">
            <Markdown>{post.content}</Markdown>
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
