import React from 'react';
import { NavigationWrapper } from './NavigationWrapper';
import { LeftFooter } from './Footers';
import Link from 'next/link';

export const LeftSide = () => {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div className="">
        <h1 className="text-edge-outline text-rpd-text dark:text-rp-text cursor-default bg-clip-text pb-4 text-4xl font-bold tracking-wide whitespace-nowrap sm:text-3xl md:text-6xl">
          <Link
            href="/"
            className="focus-visible:text-rpd-rose dark:focus-visible:text-rp-love"
          >
            William Phong
          </Link>
        </h1>

        <h2 className="text-rpd-text dark:text-rp-text max-w-xs text-lg font-medium tracking-tight sm:text-xl">
          M.S. in Computer Science, Graduate Research Assistant @ SDSU
        </h2>

        <p className="mt-4 max-w-xs">
          Hi! I'm currently looking for software or machine learning/data
          science roles, but I'm open to all opportunities!
        </p>

        {/* Client Navigation */}
        <NavigationWrapper />
      </div>

      <LeftFooter />
    </header>
  );
};
