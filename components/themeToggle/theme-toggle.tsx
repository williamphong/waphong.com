'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunMediumIcon, SunMoonIcon } from '../pqoqubbw/icons';

const noopSubscribe = () => () => {};

export function ModeToggle() {
  // `resolvedTheme` collapses 'system' to the theme actually in effect. Keying
  // off `theme` makes the first click a no-op for anyone on a dark system: it
  // swaps 'system' for 'dark', and nothing visibly changes.
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <Button
        className="link--color bg-rpd-surface dark:bg-rp-surface"
        variant="outline"
        size="icon"
        disabled
      >
        <SunMoonIcon />
        <span className="sr-only">Theme toggle</span>
      </Button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      className="link--color bg-rpd-surface hover:text-rpd-love dark:bg-rp-surface dark:hover:text-rp-rose cursor-pointer"
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      title="theme toggle"
      aria-label="Theme toggle"
    >
      {isDark ? <MoonIcon /> : <SunMediumIcon />}
      <span className="sr-only">Theme toggle</span>
    </Button>
  );
}
