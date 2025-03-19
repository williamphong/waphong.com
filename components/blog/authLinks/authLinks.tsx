'use client';
import React, { useState } from 'react';
import styles from './authLinks.module.css';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  // Handle loading state
  if (status === 'loading') {
    return <span>loading...</span>;
  }

  // Handle unauthenticated state or errors
  if (status === 'unauthenticated' || session?.provider !== 'google') {
    return <Link href="/ether/login">login</Link>;
  }
  // Handle authenticated state
  return (
    <>
      <Link href="/ether/write">write</Link>
      <span
        className={styles.link}
        onClick={(e) => {
          e.preventDefault(); // Prevent default anchor behavior
          signOut(); // Call signOut function
        }}
        role="button" // Accessible button role
        tabIndex={0} // Allow keyboard navigation
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            signOut({ callbackUrl: '/ether' }); // Allow signing out with Enter or Space key
          }
        }}
      >
        logout
      </span>
    </>
  );
};

export default AuthLinks;
