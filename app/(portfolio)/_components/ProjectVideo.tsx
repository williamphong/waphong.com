'use client';

import { useEffect, useRef, useState } from 'react';

// A looping autoplay video is moving content with no way to stop it
// (WCAG 2.2.2). Under prefers-reduced-motion we do not autoplay and we expose
// native controls instead, so the animation is opt-in rather than imposed.
export const ProjectVideo = ({
  url,
  alt,
  className,
}: {
  url: string;
  alt: string;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      setReduced(query.matches);
      const video = videoRef.current;
      if (!video) return;
      if (query.matches) video.pause();
      else void video.play().catch(() => {});
    };

    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  return (
    <video
      ref={videoRef}
      // The server render must not autoplay, or reduced-motion users see the
      // clip start before the effect runs.
      loop
      muted
      playsInline
      controls={reduced}
      preload="metadata"
      aria-label={alt}
      className={className}
    >
      <source src={url} type="video/webm" />
    </video>
  );
};
