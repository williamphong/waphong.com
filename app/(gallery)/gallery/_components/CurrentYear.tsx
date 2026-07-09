'use client';

import { useEffect, useState } from 'react';

// The gallery is statically prerendered, so a year computed on the server is
// frozen at build time and goes stale on New Year. Render the build-time value
// (so the first paint matches the server HTML) and correct it after hydration.
export function CurrentYear({ buildYear }: { buildYear: number }) {
  const [year, setYear] = useState(buildYear);

  useEffect(() => setYear(new Date().getFullYear()), []);

  return <>{year}</>;
}
