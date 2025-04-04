import React from 'react';
import Featured from '@/components/blog/featured/Featured';
import CardList from '@/components/blog/cardList/CardList';
import Menu from '@/components/blog/menu/Menu';

export default function Home() {
  return (
    <div className="">
      <Featured />
      <hr className="my-20 border-slate-400 dark:border-slate-300" />
      <div className="flex">
        <CardList page={1} />
        <Menu />
      </div>
    </div>
  );
}
