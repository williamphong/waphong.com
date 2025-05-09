"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunMediumIcon, SunMoonIcon } from "../pqoqubbw/icons";


export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Set system theme by default on first load
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined' && !localStorage.getItem('theme')) {
      setTheme('system');
    }
  }, [setTheme]);

  const toggleTheme = () => {
    // Only toggle between light and dark
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return (
      <Button className="dark:bg-rp-surface bg-rpd-surface" variant="outline" size="icon" disabled>
        <SunMoonIcon />
      </Button>
    );
  }

  // Determine which icon to show based on current theme
  const getCurrentIcon = () => {
    if (theme === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return systemDark ? <MoonIcon/> : <SunMediumIcon/>;
    }
    return theme === 'dark' ? <MoonIcon /> : <SunMediumIcon/>;
  };

  return (
    <Button
      className="dark:bg-rp-surface bg-rpd-surface text-rpd-rose dark:text-rp-rose"
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      title="theme toggle"
      aria-label="Theme toggle"
    >
      {getCurrentIcon()}
      <span className="sr-only">Theme toggle</span>
    </Button>
  );
}