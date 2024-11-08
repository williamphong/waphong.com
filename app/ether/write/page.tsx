'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import styles from './write.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const WritePage = () => {
  const [open, setOpen] = useState(false);

  const [file, setFile] = useState(null);
  const { status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/');
  }

  return (
    <div className={styles.container}>
      <input type="text" placeholder="Title" />

      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/images/blog/plus.png" alt="" width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: 'none' }}
            />

            <button className={styles.addButton}>
              <label htmlFor="image">
                <Image
                  src="/images/blog/image.png"
                  alt=""
                  width={16}
                  height={16}
                />
              </label>
            </button>
            <button className={styles.addButton}>
              <Image
                src="/images/blog/external.png"
                alt=""
                width={16}
                height={16}
              />
            </button>
            <button className={styles.addButton}>
              <Image
                src="/images/blog/video.png"
                alt=""
                width={16}
                height={16}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WritePage;
