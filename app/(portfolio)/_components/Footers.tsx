import { svg } from '@/lib/data';
import { ModeToggle } from '@/components/themeToggle/theme-toggle';

export const LeftFooter = () => {
  return (
    <ul className="ml-1 mt-8 flex items-center gap-5" aria-label="Social media">
      <ModeToggle />
      <a
        className="block hover:text-slate-200"
        href="mailto:williamphong10@gmail.com"
        target="_blank"
        title="email"
      >
        <span className="sr-only">Email</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      </a>

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
    </ul>
  );
};

export const RightFooter = () => {
  return (
    <footer className="max-w-md py-16 text-sm sm:pb-0">
      {
        <p>
          The design and code for this website is largely inspired or from{' '}
          <a
            className="font-medium text-slate-700 hover:text-teal-300 dark:text-slate-200 dark:focus-visible:text-teal-300"
            href="https://brittanychiang.com"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="letterboxd"
          >
            {' '}
            brittanychiang.com
          </a>{' '}
          and{' '}
          <a
            className="font-medium text-slate-700 hover:text-teal-300 dark:text-slate-200 dark:focus-visible:text-teal-300"
            href="https://carlbeaverson.com"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="letterboxd"
          >
            {' '}
            carlbeaverson.com
          </a>
          . It is developed with Next.js, Typescript, Tailwind CSS, and deployed
          with Vercel.
        </p>
      }
    </footer>
  );
};
