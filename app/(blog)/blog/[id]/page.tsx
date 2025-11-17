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
      <div className="text-center py-12">
        <h1 className="text-rpd-text dark:text-rp-text text-3xl font-bold mb-4">
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
    <article className="">
      <header className="mb-8">
        <Link
          href="/blog"
          className="text-sm text-rpd-subtle dark:text-rp-subtle hover:text-rpd-text dark:hover:text-rp-text transition-colors mb-4 inline-block"
        >
          ← All posts
        </Link>
        <h1 className="text-rpd-text dark:text-rp-text text-4xl font-bold mb-2">
          {post.title}
        </h1>
        <p className="text-rpd-muted dark:text-rp-muted">{post.date}</p>
      </header>

      <div className="prose prose-invert max-w-none">
        <div className="text-rpd-subtle dark:text-rp-subtle leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </div>

      <footer className="mt-12 pt-8 border-t border-rpd-muted/20 dark:border-rp-muted/20">
        <Link
          href="/blog"
          className="text-sm text-rpd-rose dark:text-rp-love hover:underline"
        >
          ← Back to all posts
        </Link>
      </footer>
    </article>
  );
}
