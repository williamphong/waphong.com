import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

import { ThemeProvider } from '@/components/themeToggle/theme-provider';
import SpotlightCursor from '@/components/spotlight/SpotlightCursor';

import '@/app/globals.css';
import { BlogSidebar } from './_components/BlogSidebar';

export const metadata: Metadata = {
  metadataBase: new URL('https://waphong.com'),
  title: {
    template: '%s | William Phong Blog',
    default: 'Blog | William Phong',
  },
  description: 'William Phong\'s personal blog about software engineering, machine learning, and technology.',
  icons: {
    icon: '/favicon.ico',
  },
  generator: 'Next.js',
  applicationName: 'William Phong Blog',
  referrer: 'origin-when-cross-origin',
  keywords: ['William Phong', 'blog', 'software engineering', 'machine learning', 'technology'],
  authors: [{ name: 'William Phong', url: 'https://waphong.com' }],
  creator: 'William Phong',
  publisher: 'William Phong',

  openGraph: {
    title: 'William Phong — Blog',
    description: 'William Phong\'s personal blog about software engineering, machine learning, and technology.',
    url: 'https://waphong.com/blog',
    siteName: 'William Phong',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://waphong.com/images/xi-cat.jpg',
        width: 800,
        height: 800,
        alt: 'William Phong Blog',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'William Phong — Blog',
    description: 'William Phong\'s personal blog about software engineering, machine learning, and technology.',
    creator: '@1waphong',
    images: ['https://waphong.com/images/xi-cat.jpg'],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark font-inter scroll-smooth`}>
      <body className="bg-rpd-base text-rpd-subtle dark:bg-rp-base dark:text-rp-subtle leading-relaxed antialiased">
        <SpotlightCursor config={{ radius: 300, brightness: 0.1 }} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-16 lg:py-0">
            <div className="lg:flex lg:justify-between lg:gap-4">
              {/* Left sidebar - blog post list */}
              <BlogSidebar />

              {/* Right side - blog content */}
              <main id="content" className="lg:w-2/3 lg:py-24">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
