import Image from 'next/image';
import React from 'react';

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen max-w-screen-xl items-center justify-center px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
      <div className="text-center">
        <h1 className="text-4xl">COMING SOON</h1>
        <Image
          src="/images/please_do_not_the_cat.png"
          alt="Description of the image"
          width={300}
          height={570}
          className="pt-24"
        />
      </div>
    </div>
  );
}
