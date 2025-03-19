import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function about() {
  return (
    <div className="">
      <div className="justify-center px-6 py-12 align-middle md:px-12 md:py-20 lg:px-24 lg:py-0">
        <h1 className="mb-12 mt-24 text-5xl font-bold">into the ether //</h1>
        <p className="text-lg">
          hi, i&apos;m william and welcome to my blog! i named this blog after a
          specific feeling that i found hard to describe (yes, i was inspired by
          lily chou chou) — the purpose of this blog was write about things
          around this theme of ether but it&apos;ll probably just be a space for
          me to write about anything. if you&apos;ve somehow found this, thank
          you for stopping by and reading &lt;3{' '}
        </p>
        <p className="mt-6 text-lg">
          if you want to find out more about my professional side, read more on
          my portfolio page{' '}
          <Link
            href="/"
            className="text-slate-400 underline dark:text-slate-200"
          >
            waphong.com
          </Link>
        </p>
        <p className="mt-20 text-lg">
          take a listen to my all time favorite artist, yerin baek
        </p>

        <div className="mt-8 flex items-center justify-center">
          <iframe
            className="border-r-20"
            src="https://open.spotify.com/embed/playlist/757Xmvk1EU2n9JxvG0fREz?utm_source=generator"
            width="75%"
            height="400"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
