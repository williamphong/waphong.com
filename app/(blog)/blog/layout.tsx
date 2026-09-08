import React from 'react';
import type { Metadata } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';

const ibm = IBM_Plex_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-ibm',
});

import { ThemeProvider } from '@/components/themeToggle/theme-provider';

import '@/app/globals.css';
import { BlogSidebar } from './_components/BlogSidebar';

export const metadata: Metadata = {
  metadataBase: new URL('https://waphong.com'),
  title: {
    template: "%s | William Phong's Blog",
    default: 'Blog | William Phong',
  },
  description: "William Phong's personal blog.",
  generator: 'Next.js',
  applicationName: 'William Phong Blog',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'William Phong',
    'blog',
    'software engineering',
    'machine learning',
    'technology',
  ],
  authors: [{ name: 'William Phong', url: 'https://waphong.com' }],
  creator: 'William Phong',
  publisher: 'William Phong',

  openGraph: {
    title: 'William Phong — Blog',
    description:
      "William Phong's personal blog about software engineering, machine learning, and technology.",
    url: 'https://waphong.com/blog',
    siteName: 'William Phong',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://waphong.com/images/xi_cat.jpg',
        width: 800,
        height: 800,
        alt: 'William Phong Blog',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'William Phong — Blog',
    description:
      "William Phong's personal blog about software engineering, machine learning, and technology.",
    creator: '@1waphong',
    images: ['https://waphong.com/images/xi_cat.jpg'],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${ibm.className} scroll-smooth motion-reduce:scroll-auto`}
      // Opts into Next's route-transition override: it swaps scroll-behavior
      // to auto for the navigation, so changing route jumps to the top
      // instead of animating the whole page past you. Same-page #hash links
      // take an earlier return and keep scrolling smoothly, which is what
      // scroll-smooth is here for.
      data-scroll-behavior="smooth"
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
          <div className="min-h-screen w-full">
            <div className="flex min-h-screen w-full flex-col lg:flex-row">
              <BlogSidebar />
              <main id="content" className="flex-1">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
