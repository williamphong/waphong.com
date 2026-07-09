import { defineCloudflareConfig } from '@opennextjs/cloudflare/config';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

// Prerendered pages of dynamic routes (/blog/[id]) are only reachable through
// the incremental cache. Without one configured, `dynamicParams = false` makes
// every lookup miss and Next.js answers 404 instead of falling back to SSR.
// This site never revalidates, so serving the cache from Workers static assets
// is enough and needs no KV or R2 binding.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
