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
        <Link href="/ether/login">login</Link>
      ) : (
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
              if (e.key === 'Enter') {
                signOut(); // Allow signing out with Enter key
              }
            }}
          >
            logout
          </span>
        </>
      )}
    </>
  );
};

export default AuthLinks;
