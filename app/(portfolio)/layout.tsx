import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

import { ThemeProvider } from '@/components/themeToggle/theme-provider';
import SpotlightCursor from '@/components/spotlight/SpotlightCursor';

import '@/app/globals.css';
import { LeftSide } from './_components/LeftSide';

export const metadata: Metadata = {
  metadataBase: new URL('https://waphong.com'),
  title: {
    template: '%s | William Phong',
    default: 'William Phong',
  },
  description: 'Personal portfolio of William Phong.',
  generator: 'Next.js',
  applicationName: 'William Phong Portfolio',
  referrer: 'origin-when-cross-origin',
  keywords: ['William Phong', 'portfolio', 'student', 'developer', 'engineer'],
  authors: [{ name: 'William Phong', url: 'https://waphong.com' }],
  creator: 'William Phong',
  publisher: 'William Phong',

  openGraph: {
    title: 'William Phong — Portfolio',
    description: 'Personal portfolio of William Phong.',
    url: 'https://waphong.com',
    siteName: 'William Phong',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://waphong.com/images/xi_cat.jpg',
        width: 800,
        height: 800,
        alt: 'William Phong Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary', // ← this makes it a small card
    title: 'William Phong — Portfolio',
    description: 'Personal portfolio of William Phong.',
    creator: '@1waphong',
    images: ['https://waphong.com/images/xi_cat.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.className} scroll-smooth motion-reduce:scroll-auto`}
      suppressHydrationWarning
    >
      <body className="bg-rpd-base text-rpd-subtle-deep dark:bg-rp-base dark:text-rp-subtle leading-relaxed antialiased">
        <a
          href="#content"
          className="focus:bg-rpd-surface focus:text-rpd-text dark:focus:bg-rp-surface dark:focus:text-rp-text sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:px-4 focus:py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SpotlightCursor config={{ radius: 300, brightness: 0.1 }} />
          <div className="mx-auto min-h-screen max-w-7xl px-6 py-12 md:px-12 md:py-20 lg:px-16 lg:py-0">
            <div className="lg:flex lg:justify-between lg:gap-4">
              {/* Left side – static */}
              <LeftSide />

              {/* Right side – dynamic */}
              <main id="content" className="lg:w-1/2 lg:py-24">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
