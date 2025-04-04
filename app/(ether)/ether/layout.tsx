import React from 'react';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import Navbar from '@/components/blog/navbar/Navbar';
import Footer from '@/components/blog/footer/Footer';
import { ThemeProvider } from '@/components/themeToggle/theme-provider';

import '@/app/globals.css';

export const metadata: Metadata = {
  generator: 'Next.js',
  applicationName: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'William Phong', url: 'https://waphong.com/ether' }],
  creator: 'William Phong',
  metadataBase: new URL('https://waphong.com'),
  title: {
    template: '... | Ether',
    default: 'Ether', // a default is required when creating a template
  },
  description: 'my blog',
  openGraph: {
    title: 'Ether',
    description: 'idk thoughts',
    url: 'https://waphong.com/ether',
    siteName: 'Ether',
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
    title: 'Ether',
    description: 'idk thoughts',
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
          <div className="min-h-screen">
            <Navbar />
            <div className="mx-80">{children}</div>
            <Analytics />
            <SpeedInsights />
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
