import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const currentYears = new Date().getFullYear();

  return (
    <div className="flex flex-row items-center border-t-2 border-slate-400 py-8 dark:border-slate-300">
      <div className="flex flex-1 justify-start"></div>

      <div className="flex flex-1 justify-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-sm">© {currentYears} william phong</span>
        </Link>
      </div>

      <div className="flex flex-1 justify-end"></div>
    </div>
  );
};

export default Footer;
