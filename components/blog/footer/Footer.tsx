import React from 'react';
import styles from './footer.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const currentYears = new Date().getFullYear();

  return (
    <div className="flex-col">
      <hr className="-ml-[3333px] w-[9999px] overflow-hidden border-slate-400 dark:border-slate-300" />
      <div className="flex-row py-14">
        <div className="flex flex-1 items-center justify-center">
          {/* You can uncomment this section if needed */}
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
              © {currentYears} william an phong
            </div>
          </Link>
        </div>

        <div className={styles.links}></div>
      </div>
    </div>
  );
};

export default Footer;
