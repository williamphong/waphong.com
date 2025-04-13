'use client';

import Link from 'next/link';
import { navigation } from '@/lib/data';

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
      <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-800 group-focus-visible:w-16 group-focus-visible:bg-slate-800 motion-reduce:transition-none dark:group-hover:bg-slate-200 dark:group-focus-visible:bg-slate-200"></span>
      <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-800 group-focus-visible:text-slate-800 dark:group-hover:text-slate-200 dark:group-focus-visible:text-slate-700">
        {item.name}
      </span>
    </Link>
  </li>
);

interface NavigationProps {
  activeSection: string;
}

export const Navigation = ({ activeSection }: NavigationProps) => {
  return (
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
};
