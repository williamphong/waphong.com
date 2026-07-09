import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

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
    images: [
      {
        url: 'https://waphong.com/images/xi_cat.jpg',
        width: 800,
        height: 800,
        alt: "William Phong's gallery",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    // Was summary_large_image with the image commented out, which renders a
    // blank card. `creator` must be an @handle, not a display name.
    card: 'summary_large_image',
    title: 'William Phong',
    description: "William Phong's gallery",
    creator: '@1waphong',
    images: ['https://waphong.com/images/xi_cat.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className="font-sfpro scroll-smooth"
      suppressHydrationWarning
    >
      <body className="bg-rpd-base text-rpd-subtle dark:bg-rp-base dark:text-rp-subtle selection:bg-rpd-highlightMed leading-relaxed antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="my-16 flex items-center justify-between text-center">
            <h1 className="text-edge-outline text-rpd-text dark:text-rp-text flex-1 cursor-default bg-clip-text pb-4 text-xl font-bold tracking-wide whitespace-nowrap sm:text-2xl md:text-4xl">
              <Link href="/" className="focus-visible:text-rpd-rose">
                William Phong
              </Link>
            </h1>
            <div className="flex-1" aria-hidden="true" />
            <div className="flex flex-1 justify-center">
              <Socials />
            </div>
          </header>

          <div className="mx-auto min-h-screen max-w-screen-xl px-1 py-2 md:px-2 md:py-4 lg:px-0 lg:py-0">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
