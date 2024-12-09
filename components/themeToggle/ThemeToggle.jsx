'use client';

import React, { useContext } from 'react';
import styles from './themeToggle.module.css';
import Image from 'next/image';
import { ThemeContext } from '@/app/context/ThemeContext';

export const ThemeToggle = () => {
  const { toggle, theme } = useContext(ThemeContext);

  console.log(theme);

  return (
    <div
      className={styles.container}
      onClick={toggle}
      style={
        theme === 'dark' ? { background: '#f4f0e8' } : { background: '#0f172a' }
      }
    >
      <Image src="/images/ether/util/moon.png" alt="" width={14} height={14} />
      <div
        className={styles.ball}
        style={
          theme === 'dark'
            ? { left: 1, background: '#0f172a' }
            : { right: 1, background: '#f4f0e8' }
        }
      ></div>
      <Image src="/images/ether/util/sun.png" alt="" width={14} height={14} />
    </div>
  );
};

export default ThemeToggle;
