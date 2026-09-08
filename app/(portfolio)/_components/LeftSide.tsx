import React from 'react';
import { NavigationWrapper } from './NavigationWrapper';
import { LeftFooter } from './Footers';
import { ArrowIcon } from './ArrowIcon';
import Link from 'next/link';

export const LeftSide = () => {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div className="flex h-full flex-col">
        {/* Below lg the column is full width, so 7xl fits. At lg the column is
            ~448px and "William Phong" at 7xl is ~483px, overlapping <main>;
            6xl (~403px) fits, and xl restores 7xl. */}
        <h1 className="text-rpd-text dark:text-rp-text cursor-default pb-4 text-4xl font-normal tracking-normal whitespace-nowrap sm:text-5xl md:text-7xl lg:text-6xl xl:text-7xl">
          <Link
            href="/"
            className="focus-visible:text-rpd-rose-deep dark:focus-visible:text-rp-love"
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
        <div className="mt-8">
          <Link
            href="/blog"
            className="group text-rpd-text dark:text-rp-text hover:text-rpd-rose-deep dark:hover:text-rp-love inline-flex items-center text-sm font-medium transition-colors"
          >
            <span>Visit my blog</span>
            <ArrowIcon className="-translate-y-px transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <LeftFooter />
    </header>
  );
};
