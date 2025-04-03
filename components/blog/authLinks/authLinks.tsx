'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './authLinks.module.css';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

export default function AuthLinks() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleSignOutGoogle = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/ether'); // redirect to login page
          router.refresh();
        },
      },
    });
  };

  // Handle loading state
  if (isPending) {
    return <span>loading...</span>;
  }

  // Handle unauthenticated state or errors
  return !session ? (
    <Link href="/ether/login">login</Link>
  ) : (
    <div className="flex justify-center gap-6">
      <Link href="/ether/write">write</Link>
      <span
        className={styles.link}
        onClick={(e) => {
          e.preventDefault(); // Prevent default anchor behavior
          handleSignOutGoogle(); // Call signOut function
        }}
        role="button" // Accessible button role
        tabIndex={0} // Allow keyboard navigation
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleSignOutGoogle(); // Allow signing out with Enter or Space key
          }
        }}
      >
        logout
      </span>
    </div>
  );
}
