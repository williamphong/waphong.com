import React from 'react';
import Featured from '@/components/blog/featured/Featured';
import CardList from '@/components/blog/cardList/CardList';
import Menu from '@/components/blog/menu/Menu';

export default function Home() {
  return (
    <div className="bg-bg text-textColor">
      <hr className="mb-12 mt-12 border-slate-600 dark:border-slate-300" />
      <Featured />
      <hr className="mb-12 mt-12 border-slate-600 dark:border-slate-300" />
      <div className="flex">
        <CardList page={1} />
        <Menu />
      </div>
    </div>
  );
}
