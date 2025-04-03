import React from 'react';
import './ether.global.css';
import type { Metadata } from 'next';

import Navbar from '@/components/blog/navbar/Navbar';
import Footer from '@/components/blog/footer/Footer';
import { ThemeProvider } from '@/components/themeToggle/theme-provider';

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
  description: 'my blog',
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

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark scroll-smooth`} suppressHydrationWarning>
      <body className="leading-relaxed text-slate-600 antialiased dark:bg-slate-900 dark:text-slate-400 dark:selection:bg-teal-300 dark:selection:text-teal-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-auto min-h-screen max-w-screen-xl">
            <Navbar />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
