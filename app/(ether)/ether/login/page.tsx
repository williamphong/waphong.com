'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import LoadingButton from '@/app/(ether)/ether/_components/loading-button';

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
    <div className="mt-16 flex items-center justify-center">
      <div className="bg-softBg flex flex-col gap-12 rounded-lg p-24 md:p-12">
        <LoadingButton pending={pendingGoogle} onClick={handleSignInGoogle}>
          Continue with Google
        </LoadingButton>
      </div>
    </div>
  );
};

export default LoginPage;
