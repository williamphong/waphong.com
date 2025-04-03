"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

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
      <Button variant="outline" size="icon" disabled>
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  // Determine which icon to show based on current theme
  const getCurrentIcon = () => {
    if (theme === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return systemDark ? <Moon /> : <Sun />;
    }
    return theme === 'dark' ? <Moon /> : <Sun />;
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {getCurrentIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}