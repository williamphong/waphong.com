'use client';
import { ModeToggle } from '@/components/themeToggle/theme-toggle';
import {
  AtSignIcon,
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  SpotifyIcon,
  AudioLinesIcon,
} from '@/components/pqoqubbw/icons';

const socials = [
  {
    href: 'mailto:williamphong10@gmail.com',
    title: 'email',
    label: 'Email',
    icon: <AtSignIcon size={24} />,
  },
  {
    href: 'https://github.com/williamphong',
    title: 'github',
    label: 'Github',
    icon: <GithubIcon size={24} />,
  },
  {
    href: 'https://www.linkedin.com/in/williamphong/',
    title: 'linkedin',
    label: 'LinkedIn',
    icon: <LinkedinIcon size={24} />,
  },
  {
    href: 'https://www.instagram.com/william.phong/',
    title: 'instagram',
    label: 'Instagram',
    icon: <InstagramIcon size={24} />,
  },
  {
    href: 'https://open.spotify.com/user/william.phong',
    title: 'spotify',
    label: 'Spotify',
    icon: <AudioLinesIcon size={24} />,
  },
];

export const LeftFooter = () => {
  return (
    <ul
      className="my-4 flex items-center gap-5 md:my-4 lg:my-0"
      aria-label="Social media"
    >
      <li>
        <ModeToggle />
      </li>
      {socials.map(({ href, title, label, icon }) => (
        <li key={title}>
          <a
            href={href}
            title={title}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rpd-gold dark:hover:text-rp-gold link--color transition-colors"
          >
            {icon}
          </a>
        </li>
      ))}
    </ul>
  );
};

export const RightFooter = () => {
  return (
    <footer className="max-w-md py-16 text-sm sm:pb-0">
      {
        <p>
          Developed with Next.js, Typescript, Tailwind CSS, and deployed on
          Cloudflare Pages. Follows{' '}
          <a
            className="text-rpd-love focus-visible:text-rpd-love dark:text-rp-rose dark:focus-visible:text-rp-love hover:underline-4 font-medium"
            href="https://rosepinetheme.com/palette/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="rose pine theme"
          >
            Rosé Pine
          </a>{' '}
          color palette conventions. Inspired by{' '}
          <a
            className="text-rpd-love focus-visible:text-rpd-love dark:text-rp-rose dark:focus-visible:text-rp-love hover:underline-4 font-medium"
            href="https://brittanychiang.com"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="brittanychiang.com"
          >
            brittanychiang.com
          </a>
          ,{' '}
          <a
            className="text-rpd-love focus-visible:text-rpd-love dark:text-rp-rose dark:focus-visible:text-rp-love hover:underline-4 font-medium"
            href="https://carlbeaverson.com"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="carlbeaverson.com"
          >
            carlbeaverson.com
          </a>
          , and my friends{' '}
          <a
            className="text-rpd-love focus-visible:text-rpd-love dark:text-rp-rose dark:focus-visible:text-rp-love hover:underline-4 font-medium"
            href="https://derekwen.dev"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="derek wen portfolio"
          >
            Derek Wen
          </a>{' '}
          and {''}
          <a
            className="text-rpd-love focus-visible:text-rpd-love dark:text-rp-rose dark:focus-visible:text-rp-love hover:underline-4 font-medium"
            href="https://aqcheng.github.io"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="april cheng portfolio"
          >
            April Cheng
          </a>
          .
        </p>
      }
    </footer>
  );
};
