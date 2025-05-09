import React from 'react';

type Props = {
  href: string;
  label?: string;
  children: React.ReactNode;
};

export const ExternalLink = ({ href, label, children }: Props) => (
  <a
    className="text-rpd-rose dark:text-rp-rose dark:focus-visible:text-rp-gold dark:hover:text-rp-text font-medium"
    href={href}
    target="_blank"
    rel="noreferrer noopener"
    aria-label={label}
  >
    {children}
  </a>
);
