import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import '@/app/globals.css';
import { Socials } from './_components/Socials';
import { ThemeProvider } from '@/components/themeToggle/theme-provider';

export const metadata: Metadata = {
  metadataBase: new URL('https://waphong.com'),
  title: {
    template: '%s | William Phong',
    default: 'William Phong', // a default is required when creating a template
  },
  creator: 'William Phong',
  description: "William Phong's gallery",
  openGraph: {
    title: 'William Phong',
    description: "William Phong's gallery",
    url: 'https://waphong.com/gallery',
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
    description: "William Phong's gallery",
    //siteId: '1467726470533754880',
    creator: 'William Phong',
    //creatorId: '1467726470533754880',
    //images: ['https://nextjs.org/og.png'], // Must be an absolute URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className="dark font-sf scroll-smooth"
      suppressHydrationWarning
    >
      <body className="bg-rpd-base text-rpd-subtle selection:bg-rpd-highlightMed leading-relaxed antialiased">
        <header className="my-16 flex items-center justify-between text-center">
          <h1 className="text-edge-outline text-rpd-text flex-1 cursor-default bg-clip-text pb-4 text-xl font-bold tracking-wide whitespace-nowrap sm:text-2xl md:text-4xl">
            <Link href="/" className="focus-visible:text-rpd-rose">
              William Phong
            </Link>
          </h1>

          <h1 className="flex-1"></h1>
          <div className="flex flex-1 justify-center">
            <Socials />
          </div>
        </header>

        <div className="mx-auto min-h-screen max-w-screen-xl px-1 py-2 md:px-2 md:py-4 lg:px-0 lg:py-0">
          {children}
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}
