import React from 'react';
import styles from './ether.module.css';
import Featured from '@/components/blog/featured/Featured';
import CardList from '@/components/blog/cardList/CardList';
import Menu from '@/components/blog/menu/Menu';

export default function Home() {
  return (
    <div className="bg-bg text-textColor">
      <Featured />
      <hr className="mb-12 mt-12" />
      <div className={styles.content}>
        <CardList page={1} />
        <Menu />
      </div>
    </div>
  );
}
