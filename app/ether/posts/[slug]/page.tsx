import React from 'react';
import { use } from 'react';
import styles from './singlePage.module.css';
import Image from 'next/image';
import Menu from '@/components/blog/menu/Menu';

const getData = async (slug: any) => {
  const res = await fetch(`http://localhost:3000/api/ether/posts/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed');
  }

  return res.json();
};

type Params = Promise<{ slug: string }>;

export default async function SinglePage(props: { params: Params }) {
  const params = use(props.params);
  const { slug } = params;

  const data = await getData(slug);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title}</h1>
          <div className={styles.user}>
            {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image
                  src={data.user.image}
                  alt=""
                  fill
                  className={styles.avatar}
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user.name}</span>
              <span className={styles.date}>01.01.2024</span>
            </div>
          </div>
        </div>
        {data?.img && (
          <div className={styles.imageContainer}>
            <Image src={data.img} alt="" fill className={styles.image} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />
          {/* 
          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
          */}
        </div>
        <Menu />
      </div>
    </div>
  );
}
