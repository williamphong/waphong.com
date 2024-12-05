import React from 'react';
import styles from './cardlist.module.css';
//import Pagination from '@/components/blog/pagination/Pagination';
import Card from '@/components/blog/card/Card';

interface CardListProps {
  page: number;
  cat?: string;
}

const getData = async (page: number, cat?: string) => {
  const res = await fetch(
    `http://localhost:3000/api/ether/posts?page=${page}&cat=${cat || ''}`, // Fixed template literal
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed');
  }

  return res.json();
};

const CardList: React.FC<CardListProps> = async ({ page, cat }) => {
  const data = await getData(page, cat); // Pass the page and cat here
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        <div className={styles.post}>
          {data?.map((item) => (
            <Card item={item} key={item._id || item.id} /> // Ensure unique key (fallback to item.id if _id is not available)
          ))}
        </div>
      </div>
      {/* <Pagination /> */}
    </div>
  );
};

export default CardList;
