'use client';

import '@/app/globals.css';

// There is no shared app/layout.tsx — each route group declares its own root
// layout — so an error thrown inside one of those layouts has no boundary above
// it. global-error is the only catch-all, and it must supply its own document.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-rpd-base text-rpd-subtle dark:bg-rp-base dark:text-rp-subtle antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center gap-y-4 px-6 text-center">
          <h1 className="text-rpd-text dark:text-rp-text text-2xl font-bold">
            Something went wrong
          </h1>
          <p className="text-sm">
            An unexpected error occurred. Try again, or head back home.
          </p>
          {error.digest && (
            <p className="text-rpd-muted dark:text-rp-muted font-mono text-xs">
              {error.digest}
            </p>
          )}
          <div className="mt-4 flex gap-4">
            <button
              type="button"
              onClick={reset}
              className="text-rpd-rose dark:text-rp-love text-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            >
              Try again
            </button>
            <a
              href="/"
              className="text-rpd-rose dark:text-rp-love text-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            >
              Go home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
