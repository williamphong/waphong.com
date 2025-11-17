import React from 'react';
import { NavigationWrapper } from './NavigationWrapper';
import { LeftFooter } from './Footers';
import Link from 'next/link';

export const LeftSide = () => {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div className="">
        <h1 className="text-edge-outline text-rpd-text dark:text-rp-text cursor-default bg-clip-text pb-4 text-4xl font-normal tracking-normal whitespace-nowrap sm:text-3xl md:text-7xl">
          <Link
            href="/"
            className="focus-visible:text-rpd-rose dark:focus-visible:text-rp-love"
          >
            William Phong
          </Link>
        </h1>

        <h2 className="text-rpd-text dark:text-rp-text max-w-sm font-normal tracking-normal sm:text-lg">
          MSCS, Graduate Research Assistant @ SDSU
        </h2>

        <p className="mt-4 max-w-xs tracking-normal">
          Hi! I'm currently looking for software or machine learning/data
          science roles, but I'm open to all opportunities!
        </p>

        {/* Client Navigation */}
        <NavigationWrapper />

        {/* Blog Link */}
        <div className="mt-8 lg:mt-4">
          <Link
            href="/blog"
            className="group inline-flex items-center text-sm font-medium text-rpd-text dark:text-rp-text hover:text-rpd-rose dark:hover:text-rp-love transition-colors"
          >
            <span className="mr-2">📝</span>
            <span>Visit my blog</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      </div>

      <LeftFooter />
    </header>
  );
};
