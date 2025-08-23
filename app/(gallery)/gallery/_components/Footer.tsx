import React from 'react';
import Link from 'next/link';
import { Socials } from './Socials';

const Footer = () => {
  const currentYears = new Date().getFullYear();

  return (
    <div className="my-12 flex flex-row items-center">
      <div className="flex flex-1 justify-start"></div>

      <div className="flex flex-1 justify-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-sm">
            Copyright © {currentYears} - william phong
          </span>
        </Link>
      </div>

      <div className="flex flex-1 justify-end"></div>
    </div>
  );
};

export default Footer;
