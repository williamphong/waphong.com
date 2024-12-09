import React from 'react';
import styles from './footer.module.css';
import Image from 'next/image';
import { svg } from '@/lib/data';
import Link from 'next/link';

export const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.social}>
        {/*
        <ul className="flex items-center" aria-label="Social media">
          {svg.map((img, index) => (
            <li key={index} className="mr-5 shrink-0 text-xs">
              <a
                className="block hover:text-slate-200"
                href={img.link}
                target="blank"
                title={img.name}
              >
                <span className="sr-only">{img.name}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox={img.viewbox}
                  fill="currentColor"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d={img.path}></path>
                </svg>
              </a>
            </li>
          ))}
        </ul>
      */}
      </div>

      <div className={styles.main}>
        <Link href="/" className={styles.logoText}>
          <div className={styles.logo}>
            <Image
              src="/favicon.ico"
              alt="waphong blog"
              width={30}
              height={30}
            />
            © 2024 william an phong
          </div>
        </Link>
      </div>

      <div className={styles.links}></div>
    </div>
  );
};

export default Footer;
