'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { blogPosts } from '@/lib/data';
import { LeftFooter } from '@/app/(portfolio)/_components/Footers';

export const BlogSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="border-r-1 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-1/5 lg:flex-col lg:justify-start">
      <header className="flex items-center justify-center border-b py-6 text-center">
        <h1 className="text-edge-outline text-rpd-text dark:text-rp-text cursor-default bg-clip-text text-xl font-normal tracking-normal whitespace-nowrap">
          <Link
            href="/blog"
            className="focus-visible:text-rpd-rose dark:focus-visible:text-rp-love hover:underline-4"
          >
            (insert blog name)
          </Link>
        </h1>
      </header>
      <div className="flex h-full flex-col px-6 py-12 md:px-12 md:py-20 lg:px-4 lg:py-6">
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
                        : 'hover:bg-rpd-highlightMed/50 dark:hover:bg-rp-highlightMed/50'
                    }`}
                  >
                    <h3 className="mb-1 text-sm font-medium">{post.title}</h3>
                    <p className="text-xs opacity-70">{post.date}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="flex flex-col items-center justify-center space-y-4 py-12 md:py-20 lg:py-20">
        <Link
          href="/"
          className="text-rpd-subtle dark:text-rp-subtle hover:text-rpd-text dark:hover:text-rp-text mb-12 text-sm transition-colors"
        >
          ← back to portfolio
        </Link>
        <LeftFooter />
      </div>
    </aside>
  );
};
