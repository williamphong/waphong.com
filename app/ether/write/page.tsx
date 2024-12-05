'use client';
import React, { useState } from 'react';
import styles from './write.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const WritePage = () => {
  const [open, setOpen] = useState(false);

  // Explicitly type the state to allow File or null
  const [file, setFile] = useState<File | null>(null);

  const { status } = useSession();
  const router = useRouter();

  // Handle loading and unauthenticated state
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
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFile(e.target.files[0]);
                }
              }}
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
