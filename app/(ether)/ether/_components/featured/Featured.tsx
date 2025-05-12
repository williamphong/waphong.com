import React from 'react';
import Image from 'next/image';
import featureImg from '@/public/images/ether/ether.jpg';

const Featured = () => {
  return (
    <div className="mt-16">
      <h1 className="text-4xl font-light">
        what is <b>ether</b> // {/* "ethernet" -christine */}
      </h1>
      <h2 className="text-base font-thin">
        to me, the word{' '}
        <b>
          <i>ether</i>
        </b>{' '}
        describes a state of mind — a stream of emotions or feelings. it
        resembles the word ethereal — dreamy, nostalgic, but neither positive
        nor negative.
      </h2>
      <div className="mt-24 flex items-center gap-12">
        <div className="relative h-80 flex-1">
          <Image
            src={featureImg}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-1 flex-col gap-5">
          <h1 className="text-3xl">{`a moment in time`}</h1>
          <p className="text-softTextColor text-xl font-light">
            life captured through film
          </p>
          <button className="rounded-lg border-none underline">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
