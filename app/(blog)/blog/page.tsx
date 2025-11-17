'use client';

import React from 'react';
import Link from 'next/link';
import { blogPosts } from '@/lib/data';

export default function BlogPage() {
  return (
    <div className="">
      <section className="mb-16">
        <header className="flex items-center justify-start border-b px-16 py-6">
          <h1 className="text-edge-outline text-rpd-text dark:text-rp-text cursor-default bg-clip-text text-xl font-normal tracking-normal whitespace-nowrap">
            home
          </h1>
        </header>

        <div className="">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="border-rpd-muted/20 dark:border-rp-muted/20 border-b px-16 py-6 last:border-0"
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
