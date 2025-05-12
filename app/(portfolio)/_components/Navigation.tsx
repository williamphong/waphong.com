'use client';

import { navigation } from '@/lib/data';
import Link from 'next/link';

interface NavigationLinkProps {
  item: { name: string };
  isActive: boolean;
}

const NavigationLink = ({ item, isActive }: NavigationLinkProps) => (
  <li>
    <Link
      href={`#${item.name}`}
      className={`group flex items-center py-3 ${isActive ? 'active dark:activedark' : ''}`}
    >
      {/* hover color in globals.css */}
      <span className="nav-indicator bg-rpd-muted group-hover:bg-rpd-love group-focus-visible:bg-rpd-iris dark:bg-rp-muted dark:group-hover:bg-rp-rose dark:group-focus-visible:bg-rp-love mr-4 h-px w-8 transition-all group-hover:w-16 group-focus-visible:w-16 motion-reduce:transition-none"></span>
      <span className="nav-text text-rpd-muted group-hover:text-rpd-love group-focus-visible:text-rpd-iris dark:text-rp-muted dark:group-hover:text-rp-rose dark:group-focus-visible:text-rp-love text-xs font-bold tracking-widest uppercase">
        {item.name}
      </span>
    </Link>
  </li>
);

export const Navigation = ({ activeSection }: { activeSection: string }) => (
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
