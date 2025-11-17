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
              className="border-b border-rpd-muted/20 dark:border-rp-muted/20 pb-8 last:border-0"
            >
              <Link href={`/blog/${post.id}`} className="group">
                <h2 className="text-rpd-text dark:text-rp-text text-2xl font-semibold mb-2 group-hover:text-rpd-rose dark:group-hover:text-rp-love transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-rpd-muted dark:text-rp-muted mb-3">
                  {post.date}
                </p>
                <p className="text-rpd-subtle dark:text-rp-subtle">
                  {post.excerpt}
                </p>
                <span className="inline-block mt-3 text-sm text-rpd-rose dark:text-rp-love group-hover:underline">
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
