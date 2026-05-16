type ArrowIconProps = {
  className?: string;
  variant?: 'right' | 'up-right';
};

const PATHS = {
  right:
    'M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z',
  'up-right':
    'M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z',
};

export const ArrowIcon = ({
  className = '',
  variant = 'right',
}: ArrowIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={`ml-1 inline-block h-4 w-4 shrink-0 motion-reduce:transition-none ${className}`}
    aria-hidden="true"
  >
    <path fillRule="evenodd" d={PATHS[variant]} clipRule="evenodd" />
  </svg>
);
