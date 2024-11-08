'use client';

import { ThemeContext } from '@/app/context/ThemeContext';
import React, { useContext, useEffect, useState, ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // If not mounted, return null or a loading indicator if necessary
    return null; // Prevents SSR issues until the component is mounted
  }

  return <div className={theme}>{children}</div>;
};

export default ThemeProvider;
