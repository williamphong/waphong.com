'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '@/lib/data';

export default function BlogPostPage() {
  const params = useParams();
  const post = blogPosts.find((p) => p.id === params.id);

  if (!post) {
    return (
      <div className="py-12 text-center">
        <h1 className="text-rpd-text dark:text-rp-text mb-4 text-3xl font-bold">
          Post Not Found
        </h1>
        <p className="text-rpd-subtle dark:text-rp-subtle mb-6">
          The blog post you're looking for doesn't exist.
        </p>
        <Link
          href="/blog"
          className="text-rpd-rose dark:text-rp-love hover:underline"
        >
          ← Back to all posts
        </Link>
      </div>
    );
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

      <footer className="border-rpd-muted/20 dark:border-rp-muted/20 flex flex-col items-center justify-center space-y-4 border-t py-12 md:py-20 lg:py-8">
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
