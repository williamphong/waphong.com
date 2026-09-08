import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/app/globals.css';
import { ThemeProvider } from '@/components/themeToggle/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Page not found | William Phong',
  description: 'The page you are looking for does not exist.',
  robots: { index: false },
};

// There is no shared app/layout.tsx — each route group declares its own root
// layout — so an unmatched URL has no layout to render a not-found.tsx inside.
// global-not-found bypasses layouts entirely and must supply its own document,
// styles, font and theme class (next-themes sets .light/.dark on <html>).
export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="bg-rpd-base text-rpd-subtle-deep dark:bg-rp-base dark:text-rp-subtle leading-relaxed antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex min-h-screen flex-col items-center justify-center gap-y-4 px-6 text-center">
            <p className="text-rpd-pine dark:text-rp-gold text-xs font-semibold tracking-widest uppercase">
              404
            </p>
            <h1 className="text-rpd-text dark:text-rp-text text-2xl font-bold">
              Page not found
            </h1>
            <p className="max-w-md text-sm">
              There is nothing at this address. It may have moved, or the link
              may be out of date.
            </p>
            <a
              href="/"
              className="link--color hover:underline-4 mt-4 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            >
              Back to the portfolio
            </a>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
