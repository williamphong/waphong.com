import Image from 'next/image';

export const ProjectImage = ({ url, alt }: { url: string; alt: string }) => {
  const isWebm = url.endsWith('.webm');
  if (isWebm) {
    return (
      <video
        autoPlay
        loop
        muted
        playsInline
        width="200"
        height="48"
        preload="auto"
        className="dark:group-hover:border-rp-iris/30 group-hover:border-rpd-iris/30 dark:border-rp-highlightHigh/20 border-rpd-pine/20 rounded border-2 transition sm:order-1 sm:col-span-2 sm:translate-y-1"
      >
        <source src={url} type="video/webm" />
      </video>
    );
  }
  return (
    <Image
      src={url}
      alt={alt}
      width={200}
      height={48}
      className="dark:group-hover:border-rp-iris/30 group-hover:border-rpd-iris/30 dark:border-rp-highlightHigh/20 border-rpd-pine/20 rounded border-2 transition sm:order-1 sm:col-span-2 sm:translate-y-1"
    />
  );
};
