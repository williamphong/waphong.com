'use client';
import React, { useEffect, useState } from 'react';
import styles from './cardlist.module.css';
import Card from '@/app/(ether)/ether/_components/card/Card';

interface Post {
  _id: string;
  id: string;
  img: string; // Add missing field
  createdAt: string; // Add missing field
  catSlug: string; // Add missing field
  slug: string; // Add missing field
  title: string;
  content: string;
  desc: string; // Add missing field
}

interface CardListProps {
  page: number;
  cat?: string;
}

const getData = async (page: number, cat?: string): Promise<Post[]> => {
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

const CardList: React.FC<CardListProps> = ({ page, cat }) => {
  const [data, setData] = useState<Post[]>([]); // State to store posts
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await getData(page, cat);
        setData(posts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, cat]); // Re-fetch data when page or category changes

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        <div className={styles.post}>
          {data.map((item) => (
            <Card item={item} key={item._id || item.id} />
          ))}
        </div>
      </div>
      {/* <Pagination /> */}
    </div>
  );
};

export default CardList;
