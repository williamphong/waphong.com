import React from 'react';
import Link from 'next/link';
import Featured from '@/components/blog/featured/Featured';
import CardList from '@/components/blog/cardList/CardList';
import Menu from '@/components/blog/menu/Menu';

export default function Home() {
  return (
    <div className="mx-20">
      {/* 
      <div className="flex justify-center gap-10 align-middle">
        <div>
          <Link href="/ether">
            <h1 className="font-satoshi font-semibold">Home</h1>
          </Link>
        </div>
        <div>
          <Link href="/about">
            <h1 className="font-satoshi font-semibold">Archive</h1>
          </Link>
        </div>
        <div>
          <Link href="/about">
            <h1 className="font-satoshi font-semibold">About me</h1>
          </Link>
        </div>
      </div>
      
      <hr className="mb-12 mt-3 border-slate-600 dark:border-slate-300" />
      */}
      <Featured />
      <hr className="my-20 border-slate-400 dark:border-slate-300" />
      <div className="flex">
        <CardList page={1} />
        <Menu />
      </div>
    </div>
  );
}
