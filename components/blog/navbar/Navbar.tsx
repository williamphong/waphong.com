import React from 'react';
import styles from './navbar.module.css';
import { ModeToggle } from '@/components/themeToggle/theme-toggle';
import AuthLinks from '@/components/blog/authLinks/authLinks';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/ether">
            <h1 className="font-satoshi font-bold">ether</h1>
          </Link>
        </div>
        <div className={styles.links}>
          <Link href="/ether/about">
            <h1 className="">about</h1>
          </Link>
          <AuthLinks />
          <ModeToggle />
        </div>
      </div>
      <hr className="-ml-[3333px] mb-3 mt-6 w-[9999px] overflow-hidden border-slate-400 dark:border-slate-300" />
    </div>
  );
};

export default Navbar;
