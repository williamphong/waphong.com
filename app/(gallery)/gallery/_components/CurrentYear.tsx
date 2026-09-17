'use client';

import { useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

// The gallery is statically prerendered, so a year computed on the server is
// frozen at build time and goes stale on New Year. useSyncExternalStore lets
// the server snapshot stay the build-time value (matching the prerendered
// HTML) while the client snapshot reads the real year, correcting it right
// after hydration without a post-mount setState.
export function CurrentYear({ buildYear }: { buildYear: number }) {
  const year = useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => buildYear
  );

  return <>{year}</>;
}
