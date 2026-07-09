import Image from 'next/image';
import { ProjectVideo } from './ProjectVideo';

const THUMB_CLASS =
  'dark:group-hover:border-rp-iris/30 group-hover:border-rpd-iris/30 dark:border-rp-highlightHigh/20 border-rpd-pine/20 aspect-[5/3] w-full rounded border-2 object-cover transition sm:order-1 sm:col-span-2 sm:translate-y-1';

export const ProjectImage = ({ url, alt }: { url: string; alt: string }) => {
  const isWebm = url.endsWith('.webm');
  if (isWebm) {
    return <ProjectVideo url={url} alt={alt} className={THUMB_CLASS} />;
  }
  return (
    <Image
      src={url}
      alt={alt}
      width={400}
      height={240}
      sizes="(min-width: 1024px) 160px, (min-width: 640px) 25vw, 100vw"
      className={THUMB_CLASS}
    />
  );
};
