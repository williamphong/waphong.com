'use client';
import styles from './loginPage.module.css';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import LoadingButton from '@/components/blog/loading-button';

const LoginPage = () => {
  const router = useRouter();
  const [pendingGoogle, setPendingGoogle] = useState(false);

  const handleSignInGoogle = async () => {
    await authClient.signIn.social(
      {
        provider: 'google',
        callbackURL: '/ether',
      },

      {
        onRequest: () => {
          setPendingGoogle(true);
        },
        onSuccess: () => {
          router.push('/ether');
          router.refresh();
        },
        onError: (ctx) => {
          console.log(ctx);
          alert(ctx.error.message);
        },
      }
    );
    setPendingGoogle(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <LoadingButton pending={pendingGoogle} onClick={handleSignInGoogle}>
          Continue with Google
        </LoadingButton>
      </div>
    </div>
  );
};

export default LoginPage;
