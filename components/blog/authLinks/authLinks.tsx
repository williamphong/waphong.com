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
    return <span>Loading...</span>; // You can customize this as needed
  }

  return (
    <>
      {status === 'unauthenticated' ? (
        <Link href="/ether/login">Login</Link>
      ) : (
        <>
          <Link href="/ether/write">Write</Link>
          <span
            className={styles.link}
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              signOut(); // Call signOut function
            }}
            role="button" // Accessible button role
            tabIndex={0} // Allow keyboard navigation
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                signOut(); // Allow signing out with Enter key
              }
            }}
          >
            Logout
          </span>
        </>
      )}
    </>
  );
};

export default AuthLinks;
