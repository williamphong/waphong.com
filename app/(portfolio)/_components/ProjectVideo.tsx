'use client';

import { useEffect, useRef, useState } from 'react';

// A looping autoplay video is moving content with no way to stop it
// (WCAG 2.2.2). Under prefers-reduced-motion we do not autoplay and we expose
// native controls instead, so the animation is opt-in rather than imposed.
//
// Playback is also gated on visibility. The home page renders this card well
// below the fold, and an unconditional play() on mount made every visitor
// download the whole clip (two thirds of the page's bytes) before they had
// scrolled anywhere near it.
export const ProjectVideo = ({
  url,
  poster,
  alt,
  className = '',
}: {
  url: string;
  poster?: string;
  alt: string;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  // Browsers refuse muted autoplay under Low Power Mode, Data Saver and
  // per-site media blocks. Without controls that leaves a dead poster frame.
  const [autoplayFailed, setAutoplayFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;

    const sync = () => {
      setReduced(query.matches);
      if (query.matches || !visible) {
        video.pause();
        return;
      }
      void video.play().catch(() => setAutoplayFailed(true));
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(video);
    query.addEventListener('change', sync);
    return () => {
      observer.disconnect();
      query.removeEventListener('change', sync);
    };
  }, []);

  const controls = reduced || autoplayFailed;

  return (
    <video
      ref={videoRef}
      // The server render must not autoplay, or reduced-motion users see the
      // clip start before the effect runs.
      loop
      muted
      playsInline
      controls={controls}
      // Nothing is fetched until play() runs or the user presses play.
      preload="none"
      poster={poster}
      aria-label={alt}
      // The project link's whole-card click overlay (ProjectList.tsx) paints
      // above this cell at lg. When native controls are shown they must win.
      className={`${className} ${controls ? 'relative z-20' : ''}`}
    >
      <source src={url} type="video/webm" />
    </video>
  );
};
