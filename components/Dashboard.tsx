'use client';
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const Dashboard = () => {
  const { data: session } = useSession();

  // Ensure user is logged in via Spotify
  if (!session) {
    return (
      <>
        <h1 className="text-3xl font-bold text-red-500">
          You&apos;re not logged in
        </h1>
        <div className="m-5 flex space-x-5">
          <button
            onClick={() => signIn('spotify', { callbackUrl: '/wordcloud' })}
            className="rounded-lg border border-black bg-slate-400 text-black"
          >
            Sign in with Spotify
          </button>
        </div>
      </>
    );
  }

  // Check if user is logged in with Spotify
  if (session.provider !== 'spotify') {
    return (
      <>
        <h1 className="text-3xl font-bold text-red-500">
          You need to be logged in with Spotify to access this page.
        </h1>
        <div className="m-5 flex space-x-5">
          <button
            onClick={() => signIn('spotify', { callbackUrl: '/wordcloud' })}
            className="rounded-lg border border-black bg-slate-400 text-black"
          >
            Sign in with Spotify
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <h1>Welcome Back</h1>
      <p>
        Signed in as {session.user?.name} {session.user?.email}
      </p>
      <Image
        src={session.user?.image ?? '/images/please_do_not_the_cat.png'}
        alt="Profile Picture"
        width={100}
        height={100}
        style={{ objectFit: 'cover' }}
      />
      <div className="m-5">
        <button
          onClick={() => signOut({ callbackUrl: '/wordcloud' })}
          className="rounded-lg border border-black bg-red-500 text-white"
        >
          Sign out
        </button>
      </div>
    </>
  );
};

export default Dashboard;
