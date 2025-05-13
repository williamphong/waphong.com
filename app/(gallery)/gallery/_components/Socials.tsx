'use client';
import { svg } from '@/lib/data';
import { ModeToggle } from '@/components/themeToggle/theme-toggle';
import {
  AtSignIcon,
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  SpotifyIcon,
  AudioLinesIcon,
} from '@/components/pqoqubbw/icons';

const socialList = [
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

export const Socials = () => {
  return (
    <ul
      className="text-rpd-love dark:text-rp-rose my-4 flex items-center gap-5 md:my-4 lg:my-0"
      aria-label="Social media"
    >
      <li>
        <ModeToggle />
      </li>
      {socialList.map(({ href, title, label, icon }) => (
        <li key={title}>
          <a
            href={href}
            title={title}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-rpd-gold dark:hover:text-rp-gold transition-colors"
          >
            {icon}
          </a>
        </li>
      ))}
    </ul>
  );
};
