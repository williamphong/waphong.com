import React from 'react';
import styles from './ether.module.css';
import Featured from '@/components/blog/featured/Featured';
import CardList from '@/components/blog/cardList/CardList';
import Menu from '@/components/blog/menu/Menu';

export default function Home() {
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
      <div className={styles.container}>
        <Featured />
        <div className={styles.content}>
          <CardList />
          <Menu />
        </div>
      </div>
    </div>
  );
}
