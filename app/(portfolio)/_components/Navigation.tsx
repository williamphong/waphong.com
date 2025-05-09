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
      <span className="nav-indicator dark:group-hover:bg-rp-rose dark:group-focus-visible:bg-rp-love group-hover:bg-rpd-rose dark:bg-rp-muted group-focus-visible:bg-rpd-love bg-rpd-muted mr-4 h-px w-8 transition-all group-hover:w-16 group-focus-visible:w-16 motion-reduce:transition-none"></span>
      <span className="nav-text dark:group-hover:text-rp-rose dark:group-focus-visible:text-rp-love dark:text-rp-muted text-rpd-muted group-hover:text-rpd-rose group-focus-visible:text-rpd-love text-xs font-bold uppercase tracking-widest">
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
