// Static markup, no hooks. It lived in Footers.tsx, which is 'use client' for
// LeftFooter's animated icons — sharing the module dragged this into the
// client bundle for no reason.
export const RightFooter = () => {
  return (
    <footer className="py-16 text-sm/tight sm:pb-0">
      <p>
        Developed with Next.js, Typescript, Tailwind CSS, and deployed on
        Cloudflare Workers. Follows{' '}
        <a
          className="text-rpd-love focus-visible:text-rpd-love dark:text-rp-rose dark:focus-visible:text-rp-love hover:underline-4 font-medium"
          href="https://rosepinetheme.com/palette/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Rosé Pine
        </a>{' '}
        color palette conventions. Inspired by{' '}
        <a
          className="text-rpd-love focus-visible:text-rpd-love dark:text-rp-rose dark:focus-visible:text-rp-love hover:underline-4 font-medium"
          href="https://brittanychiang.com"
          target="_blank"
          rel="noreferrer noopener"
        >
          brittanychiang.com
        </a>
        ,{' '}
        <a
          className="text-rpd-love focus-visible:text-rpd-love dark:text-rp-rose dark:focus-visible:text-rp-love hover:underline-4 font-medium"
          href="https://carlbeaverson.com"
          target="_blank"
          rel="noreferrer noopener"
        >
          carlbeaverson.com
        </a>
        , and my friends{' '}
        <a
          className="text-rpd-love focus-visible:text-rpd-love dark:text-rp-rose dark:focus-visible:text-rp-love hover:underline-4 font-medium"
          href="https://derekwen.dev"
          target="_blank"
          rel="noreferrer noopener"
        >
          Derek Wen
        </a>{' '}
        and{' '}
        <a
          className="text-rpd-love focus-visible:text-rpd-love dark:text-rp-rose dark:focus-visible:text-rp-love hover:underline-4 font-medium"
          href="https://aqcheng.github.io"
          target="_blank"
          rel="noreferrer noopener"
        >
          April Cheng
        </a>
        .
      </p>
    </footer>
  );
};
