import React from 'react';
import styles from './cardlist.module.css';
import Pagination from '@/components/blog/pagination/Pagination';
import Card from '@/components/blog/card/Card';

const getData = async (page, cat) => {
  const res = await fetch(
    'http://localhost:3000/api/ether/posts?page={page}&cat=${cat || "}',
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed');
  }

  return res.json();
};

export const CardList = async ({ page, cat }) => {
  const data = await getData();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        <div className={styles.post}>
          {data?.map((item) => <Card item={item} key={item._id} />)}
        </div>
      </div>
      {/* <Pagination /> */}
    </div>
  );
};

export default CardList;
