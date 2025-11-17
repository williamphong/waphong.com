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
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase: new URL('https://waphong.com'),
  title: {
    template: "%s | William Phong's Blog",
    default: 'Blog | William Phong',
  },
  description: "William Phong's personal blog.",
  icons: {
    icon: '/favicon.ico',
  },
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
    description:
      "William Phong's personal blog about software engineering, machine learning, and technology.",
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
    <html lang="en" className={`dark ${ibm.className} scroll-smooth`}>
      <body className="bg-rpd-base text-rpd-subtle dark:bg-rp-base dark:text-rp-subtle leading-relaxed antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen w-full px-6 py-12 md:px-12 md:py-20 lg:px-16 lg:py-0">
            <div className="lg:flex lg:justify-between lg:gap-4">
              {/* Left sidebar - blog post list */}
              <BlogSidebar />

              {/* Right side - blog content */}
              <main id="content" className="px-16 lg:w-3/4 lg:py-24">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
