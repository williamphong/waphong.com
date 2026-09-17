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
        aria-label="Theme toggle"
      >
        <SunMoonIcon />
      </Button>
    );
  }

  const isDark = resolvedTheme === 'dark';
  const next = isDark ? 'light' : 'dark';

  return (
    <Button
      className="link--color bg-rpd-surface hover:text-rpd-love-deep dark:bg-rp-surface dark:hover:text-rp-rose cursor-pointer"
      variant="outline"
      size="icon"
      onClick={() => setTheme(next)}
      // One name that states the action. A static "Theme toggle" (plus a
      // title and an sr-only span saying the same) never told a screen-reader
      // user which theme they were about to get.
      aria-label={`Switch to ${next} theme`}
    >
      {isDark ? <MoonIcon /> : <SunMediumIcon />}
    </Button>
  );
}
