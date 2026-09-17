'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/lib/data';

interface NavigationLinkProps {
  item: { name: string };
  href: string;
  isActive: boolean;
}

const NavigationLink = ({ item, href, isActive }: NavigationLinkProps) => (
  <li>
    <Link
      href={href}
      // `activedark` is not a utility and no such class exists; dark mode
      // already works because .active reads --link-color, which .dark redefines.
      className={`group flex items-center py-3 ${isActive ? 'active' : ''}`}
    >
      <span className="nav-indicator bg-rpd-muted group-hover:bg-rpd-love group-focus-visible:bg-rpd-iris dark:bg-rp-muted dark:group-hover:bg-rp-rose dark:group-focus-visible:bg-rp-love mr-4 h-px w-8 transition-all group-hover:w-16 group-focus-visible:w-16 motion-reduce:transition-none"></span>
      <span className="nav-text text-rpd-subtle-deep group-hover:text-rpd-love-deep group-focus-visible:text-rpd-rose-deep dark:text-rp-subtle dark:group-hover:text-rp-rose dark:group-focus-visible:text-rp-love text-xs font-bold tracking-widest uppercase">
        {item.name}
      </span>
    </Link>
  </li>
);

const Navigation = ({
  activeSection,
  pathname,
}: {
  activeSection: string;
  pathname: string;
}) => (
  <nav className="nav hidden lg:block" aria-label="In-page jump links">
    <ul className="mt-16 w-max">
      {navigation.map((item) => (
        <NavigationLink
          key={item.name}
          item={item}
          // Only the home page has all four sections. On /experience and
          // /projects a bare "#about" is a dead fragment; "/#about" navigates
          // home and scrolls there.
          href={pathname === '/' ? `#${item.name}` : `/#${item.name}`}
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
    const sections = navigation
      .map((item) => document.getElementById(item.name))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const inBand = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }
        // Take the first section in document order, not whichever entry
        // happened to land last in this batch.
        const next = navigation.find((item) => inBand.has(item.name));
        if (next) setActiveSection(next.name);
      },
      {
        // A band across the upper part of the viewport, not a ratio.
        // intersectionRatio is measured against the section's own height, so
        // any section taller than ~1.5x the viewport can never reach a 0.65
        // threshold and could never become active. "About" is five paragraphs.
        rootMargin: '-25% 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]); // re-run whenever route changes

  return <Navigation activeSection={activeSection} pathname={pathname} />;
};
