'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/lib/data';

interface NavigationLinkProps {
  item: { name: string };
  isActive: boolean;
}

const NavigationLink = ({ item, isActive }: NavigationLinkProps) => (
  <li>
    <Link
      href={`#${item.name}`}
      className={`group flex items-center py-3 ${
        isActive ? 'active dark:activedark' : ''
      }`}
    >
      <span className="nav-indicator bg-rpd-muted group-hover:bg-rpd-love group-focus-visible:bg-rpd-iris dark:bg-rp-muted dark:group-hover:bg-rp-rose dark:group-focus-visible:bg-rp-love mr-4 h-px w-8 transition-all group-hover:w-16 group-focus-visible:w-16 motion-reduce:transition-none"></span>
      <span className="nav-text text-rpd-muted group-hover:text-rpd-love group-focus-visible:text-rpd-rose dark:text-rp-muted dark:group-hover:text-rp-rose dark:group-focus-visible:text-rp-love text-xs font-bold tracking-widest uppercase">
        {item.name}
      </span>
    </Link>
  </li>
);

const Navigation = ({ activeSection }: { activeSection: string }) => (
  <nav className="nav hidden lg:block" aria-label="In-page jump links">
    <ul className="mt-16 w-max">
      {navigation.map((item, index) => (
        <NavigationLink
          key={index}
          item={item}
          isActive={activeSection === item.name}
        />
      ))}
    </ul>
  </nav>
);

export const NavigationWrapper: React.FC = () => {
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname(); // track route changes

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    // Observe each section by ID
    navigation.forEach((item) => {
      const section = document.getElementById(item.name);
      if (section) observer.observe(section);
    });

    return () => {
      navigation.forEach((item) => {
        const section = document.getElementById(item.name);
        if (section) observer.unobserve(section);
      });
    };
  }, [pathname]); // re-run whenever route changes

  return <Navigation activeSection={activeSection} />;
};
