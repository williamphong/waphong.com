import Image from 'next/image';

export const ProjectImage = ({ url }: { url: string }) => {
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
        className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
      >
        <source src={url} type="video/webm" />
      </video>
    );
  }
  return (
    <Image
      src={url}
      alt="image"
      decoding="async"
      width={200}
      height={48}
      className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
    />
  );
};
