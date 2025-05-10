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
    <ul className="ml-1 mt-8 flex items-center gap-5" aria-label="Social media">
      <ModeToggle />
      {socials.map(({ href, title, label, icon }) => (
        <a
          key={title}
          href={href}
          title={title}
          target="_blank"
          rel="noopener noreferrer"
          className="text-rp-rose hover:text-rp-gold block"
        >
          <span className="sr-only">{label}</span>
          {icon}
        </a>
      ))}

      {/*
      {svg.map((img, index) => (
        <li key={index} className="shrink-0 text-xs">
          <a
            className="block hover:text-slate-200"
            href={img.link}
            target="_blank"
            title={img.name}
          >
            <span className="sr-only">{img.name}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox={img.viewbox}
              fill="currentColor"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d={img.path}></path>
            </svg>
          </a>
        </li>
      ))}
        */}
    </ul>
  );
};

export const RightFooter = () => {
  return (
    <footer className="max-w-md py-16 text-sm sm:pb-0">
      {
        <p>
          This website is inspired by{' '}
          <a
            className="dark:text-rp-rose text-rpd-rose dark:focus-visible:text-rp-love focus-visible:text-rpd-love font-medium hover:underline hover:underline-offset-4"
            href="https://brittanychiang.com"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="brittanychiang.com"
          >
            brittanychiang.com
          </a>{' '}
          and{' '}
          <a
            className="dark:text-rp-rose text-rpd-rose dark:focus-visible:text-rp-love focus-visible:text-rpd-love font-medium hover:underline hover:underline-offset-4"
            href="https://carlbeaverson.com"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="carlbeaverson.com"
          >
            carlbeaverson.com
          </a>
          . Developed with Next.js, Typescript, Tailwind CSS, and deployed using
          Vercel. Follows{' '}
          <a
            className="dark:text-rp-rose text-rpd-rose dark:focus-visible:text-rp-love focus-visible:text-rpd-love font-medium hover:underline hover:underline-offset-4"
            href="https://rosepinetheme.com/palette/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="rose pine theme"
          >
            Rosé Pine
          </a>{' '}
          color palette conventions.
        </p>
      }
    </footer>
  );
};
