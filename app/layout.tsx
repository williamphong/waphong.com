import React from 'react';
import type { Metadata } from 'next';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

import { ThemeProvider } from '@/components/themeToggle/theme-provider';
import SpotlightCursor from '@/components/spotlight/SpotlightCursor';

import '@/app/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://waphong.com'),
  title: {
    template: '%s | William Phong',
    default: 'William Phong — Portfolio',
  },
  description: 'Personal portfolio of William Phong.',
  icons: {
    icon: '/favicon.ico',
  },
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
        url: 'https://waphong.com/images/xi-cat.jpg',
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
    images: ['https://waphong.com/images/xi-cat.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <Head>
        <link
          rel="preload"
          href="/fonts/Inter-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/SF-Pro-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <body className="bg-rpd-base text-rpd-subtle selection:bg-rpd-highlightMed dark:bg-rp-base dark:text-rp-subtle dark:selection:bg-rp-highlightMed leading-relaxed antialiased">
        <SpotlightCursor
          config={{
            radius: 300,
            brightness: 0.1,
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-20 lg:py-0">
            {children}
            <Analytics />
            <SpeedInsights />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
