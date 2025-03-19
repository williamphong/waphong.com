import React from 'react';
import type { Metadata } from 'next';

import ThemeToggle from '@/components/themeToggle/ThemeToggle';
import Footer from '@/components/blog/footer/Footer';
import SessionWrapper from '@/components/SessionWrapper';
import Link from 'next/link';

export const metadata: Metadata = {
  generator: 'Next.js',
  applicationName: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'William Phong', url: 'https://waphong.com' }],
  creator: 'William Phong',
  metadataBase: new URL('https://waphong.com'),
  title: {
    template: '... | William Phong',
    default: 'William Phong', // a default is required when creating a template
  },
  description: 'wordcloud app',
  openGraph: {
    title: 'William Phong',
    description: "William Phong's portfolio website",
    url: 'https://waphong.com',
    siteName: 'William Phong',
    /*images: [
      {
        url: 'https://nextjs.org/og.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://nextjs.org/og-alt.png', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    */
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'William Phong',
    description: "William Phong's portfolio website",
    //siteId: '1467726470533754880',
    creator: 'William Phong',
    //creatorId: '1467726470533754880',
    //images: ['https://nextjs.org/og.png'], // Must be an absolute URL
  },
};

export default function WordCloud({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionWrapper>
      <div className="bg-bg text-textColor">
        <div className="flex items-center justify-center">
          <div className="">
            <Link href="/ether">
              <h1 className="font-satoshi font-bold">Spotify Word Cloud</h1>
            </Link>
          </div>
          <div className="">
            <ThemeToggle />
          </div>
        </div>
        <hr className="-ml-[3333px] mb-3 mt-6 w-[9999px] overflow-hidden border-slate-400 dark:border-slate-300" />

        <div className="mx-auto min-h-screen max-w-screen-xl">{children}</div>

        <Footer />
      </div>
    </SessionWrapper>
  );
}
