import React from 'react';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import '@/app/globals.css';

import { ThemeProvider } from '@/components/themeToggle/theme-provider';
import SpotlightCursor from '@/components/spotlight/SpotlightCursor';

export const metadata: Metadata = {
  metadataBase: new URL('https://waphong.com'),
  title: {
    template: '%s | William Phong',
    default: 'William Phong', // a default is required when creating a template
  },
  creator: 'William Phong',
  description: "William Phong's portfolio website",
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
    description: "William Phong's portfolio",
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
    <html lang="en" className={`dark scroll-smooth`} suppressHydrationWarning>
      <body className="dark:bg-rp-base dark:selection:bg-rp-highlightMed selection:bg-rpd-highlightMed bg-rpd-base text-rpd-subtle dark:text-rp-subtle leading-relaxed antialiased">
        <SpotlightCursor
          config={{
            radius: 400,
            brightness: 0.15,
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
