'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { blogPosts } from '@/lib/data';

export const BlogSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/3 lg:flex-col lg:justify-start lg:py-24">
      <div>
        <h1 className="text-edge-outline text-rpd-text dark:text-rp-text cursor-default bg-clip-text pb-4 text-4xl font-normal tracking-normal whitespace-nowrap sm:text-3xl md:text-5xl">
          <Link
            href="/"
            className="focus-visible:text-rpd-rose dark:focus-visible:text-rp-love"
          >
            William Phong
          </Link>
        </h1>

        <h2 className="text-rpd-text dark:text-rp-text mb-8 text-2xl font-semibold tracking-normal">
          Blog
        </h2>

        <nav className="space-y-4">
          <ul className="space-y-2">
            {blogPosts.map((post) => {
              const postPath = `/blog/${post.id}`;
              const isActive = pathname === postPath;

              return (
                <li key={post.id}>
                  <Link
                    href={postPath}
                    className={`block rounded-lg p-3 transition-colors ${
                      isActive
                        ? 'bg-rpd-surface dark:bg-rp-surface text-rpd-text dark:text-rp-text'
                        : 'hover:bg-rpd-surface/50 dark:hover:bg-rp-surface/50'
                    }`}
                  >
                    <h3 className="font-medium text-sm mb-1">{post.title}</h3>
                    <p className="text-xs opacity-70">{post.date}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-8">
          <Link
            href="/"
            className="text-sm text-rpd-subtle dark:text-rp-subtle hover:text-rpd-text dark:hover:text-rp-text transition-colors"
          >
            ← Back to portfolio
          </Link>
        </div>
      </div>
    </aside>
  );
};
