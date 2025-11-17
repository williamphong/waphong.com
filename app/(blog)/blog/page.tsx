'use client';

import React from 'react';
import Link from 'next/link';
import { blogPosts } from '@/lib/data';

export default function BlogPage() {
  return (
    <div className="">
      <section className="mb-16">
        <h1 className="text-rpd-text dark:text-rp-text mb-8 text-4xl font-bold">
          All Posts
        </h1>

        <div className="space-y-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="border-rpd-muted/20 dark:border-rp-muted/20 border-b pb-8 last:border-0"
            >
              <Link href={`/blog/${post.id}`} className="group">
                <h2 className="text-rpd-text dark:text-rp-text group-hover:text-rpd-rose dark:group-hover:text-rp-love mb-2 text-2xl font-semibold transition-colors">
                  {post.title}
                </h2>
                <p className="text-rpd-muted dark:text-rp-muted mb-3 text-sm">
                  {post.date}
                </p>
                <p className="text-rpd-subtle dark:text-rp-subtle">
                  {post.excerpt}
                </p>
                <span className="text-rpd-rose dark:text-rp-love mt-3 inline-block text-sm group-hover:underline">
                  Read more →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
