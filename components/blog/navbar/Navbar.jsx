import React from 'react';
import styles from './navbar.module.css';
import ThemeToggle from '@/components/blog/themeToggle/ThemeToggle';
import AuthLinks from '@/components/blog/authLinks/authLinks';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/ether">ether</Link>
      </div>
      <div className={styles.links}>
        <ThemeToggle />
        <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;
