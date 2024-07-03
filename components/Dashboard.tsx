'use client';
import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';

const Dashboard = () => {
  const { data: session } = useSession();
  const imageUrl = session?.user?.image ?? '/images/please_do_not_the_cat.png';
  return (
    <>
      {session ? (
        <>
          <h1> Welcome Back </h1>
          <p>
            Signed in as {session.user?.name} {session.user?.email}
          </p>
          <Image
            src={imageUrl}
            alt="asd"
            width="100"
            height="100"
            style={{ objectFit: 'cover' }}
          />
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-red-500">
            You&apos;re not logged in
          </h1>
          <div className="m-5 flex space-x-5">
            <button
              onClick={() => signIn('spotify', { callbackUrl: '/wordcloud' })}
              className="rounded-lg border border-black bg-slate-400 text-black"
            >
              sign into spotify
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
