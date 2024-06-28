import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { Inter, Montserrat } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const satoshi = localFont({
  src: [
    {
      path: '/../public/fonts/Satoshi-Variable.ttf',
      style: 'normal',
    },
    {
      path: '/../public/fonts/Satoshi-VariableItalic.ttf',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-satoshi',
});

const manrope = localFont({
  src: '/../public/fonts/Manrope.ttf',
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'William Phong',
  description: "William Phong's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable} ${satoshi.variable} ${manrope.variable} ${montserrat.variable}`}
    >
      <body className="bg-slate-900 leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900">
        <div>
          <Analytics />
          <SpeedInsights />
          {children}
        </div>
      </body>
    </html>
  );
}
