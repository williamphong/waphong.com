// Documents are rendered by the Worker, so public/_headers cannot reach them —
// those rules only decorate responses served by the static asset server. Page
// headers have to be set here; asset headers stay in public/_headers.

// Compared against 'development' rather than 'production' on purpose: if
// NODE_ENV is ever unset, this must fall through to the strict policy.
const isDev = process.env.NODE_ENV === 'development';

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Next.js inlines its bootstrap and the next-themes anti-flash script.
      // Replacing 'unsafe-inline' with a nonce requires per-request rendering,
      // which would give up static generation for the whole site.
      //
      // React's development build calls eval() to rebuild call stacks across
      // the server/client boundary; without it the error overlay loses those
      // frames. The production build never evals, and allowing it there would
      // undo much of what this policy exists for — so it is dev-only.
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://i.scdn.co https://lh3.googleusercontent.com",
      "media-src 'self'",
      "font-src 'self'",
      "connect-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      'upgrade-insecure-requests',
    ].join('; '),
  },
  // No `preload` — that is a commitment you can only undo slowly, and it should
  // not be made until every subdomain is known to serve HTTPS.
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

/** @type {import('next').NextConfig} */

const nextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  images: {
    // OpenNext ships no image optimizer, so /_next/image returned the original
    // bytes for every width — a Worker invocation per image that resized
    // nothing and set no cache headers. Serving the files directly makes them
    // static assets, which public/_headers can actually cache.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'waphong.com',
      },
    ],
  },
  experimental: {
    // Only list packages the app actually imports; entries for absent packages
    // are silently inert and mislead about what is in the bundle.
    optimizePackageImports: ['motion'],
    // Three root layouts and no app/layout.tsx means an app/not-found.tsx has
    // nothing to render inside. global-not-found supplies its own document.
    globalNotFound: true,
  },
};

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();

import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
