'use client';

import '@/app/globals.css';
import { ThemeProvider } from '@/components/themeToggle/theme-provider';

// There is no shared app/layout.tsx — each route group declares its own root
// layout — so an error thrown inside one of those layouts has no boundary above
// it. global-error is the only catch-all, and it must supply its own document.
// next-themes sets the .dark class, so the dark: utilities below only work
// inside ThemeProvider.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-rpd-base text-rpd-subtle-deep dark:bg-rp-base dark:text-rp-subtle antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex min-h-screen flex-col items-center justify-center gap-y-4 px-6 text-center">
            <h1 className="text-rpd-text dark:text-rp-text text-2xl font-bold">
              Something went wrong
            </h1>
            <p className="text-sm">
              An unexpected error occurred. Try again, or head back home.
            </p>
            {error.digest && (
              <p className="text-rpd-subtle-deep dark:text-rp-subtle font-mono text-xs">
                {error.digest}
              </p>
            )}
            <div className="mt-4 flex gap-4">
              <button
                type="button"
                onClick={reset}
                className="text-rpd-rose-deep dark:text-rp-love text-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
              >
                Try again
              </button>
              <a
                href="/"
                className="text-rpd-rose-deep dark:text-rp-love text-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
              >
                Go home
              </a>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
