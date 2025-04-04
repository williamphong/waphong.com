import React from 'react';
import { ModeToggle } from '@/components/themeToggle/theme-toggle';
import AuthLinks from '@/components/blog/authLinks/authLinks';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <div className="relative flex flex-row justify-between border-b-2 border-slate-400 p-6 dark:border-slate-300">
      <div className="flex w-1/3 place-content-center">
        <Link href="/ether">
          <h1 className="font-satoshi text-2xl font-bold">ether</h1>
        </Link>
      </div>
      <div className="flex w-1/3"></div>
      <div className="flex w-1/3 place-content-center gap-6">
        <Link href="/ether/about">
          <h1 className="">about</h1>
        </Link>
        <AuthLinks />
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
