import React from 'react';
import Featured from '../ether/_components/featured/Featured';
import CardList from '../ether/_components//cardList/CardList';
import Menu from '../ether/_components/menu/Menu';

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
