'use client';
import { useState } from 'react';
import Image from 'next/image';

export type GalleryCardProps = {
  title: string;
  subtitle?: string;
  image: string;
};

function GalleryCard({
  title,
  subtitle,
  image,
  onClick,
}: GalleryCardProps & { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group block cursor-pointer overflow-hidden rounded-xl bg-neutral-100 shadow-sm transition hover:shadow-md"
    >
      {/* Square image container */}
      <div className="relative flex aspect-square items-center justify-center p-4">
        <div className="relative h-[90%] w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Info */}
      <div className="px-4 py-3">
        <h3 className="text-sm font-medium">{title}</h3>
        {subtitle && (
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export default function GalleryGrid() {
  const [selected, setSelected] = useState<GalleryCardProps | null>(null);

  const projects: GalleryCardProps[] = [
    {
      title: 'Hollywood Palladium',
      subtitle: 'Los Angeles - 9/27/2024',
      image: '/images/gallery/palladium.webp',
    },
    {
      title: 'Del Mar Beach',
      subtitle: 'San Diego - 9/20/2023',
      image: '/images/gallery/delmarbeach.webp',
    },
    {
      title: 'SF',
      subtitle: 'San Francisco - 12/7/2025',
      image: '/images/gallery/sf.webp',
    },
    {
      title: 'La Jolla Beach',
      subtitle: 'San Diego - 12/11/2023',
      image: '/images/gallery/lajolla.webp',
    },
    {
      title: 'Balboa Japanese Garden',
      subtitle: 'San Diego - 3/25/2025',
      image: '/images/gallery/jpgarden.webp',
    },
    {
      title: 'Big Sur',
      subtitle: 'Big Sur - 12/19/2024',
      image: '/images/gallery/bigsur.webp',
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((proj) => (
          <GalleryCard
            key={proj.title}
            {...proj}
            onClick={() => setSelected(proj)}
          />
        ))}
      </div>

      {/* Modal / Lightbox */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        >
          <div className="relative flex h-[90vh] w-[90vw] items-center justify-center">
            <Image
              src={selected.image}
              alt={selected.title}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />

            {/* Overlay info 
            <div className="absolute bottom-0 w-full p-4 text-center text-white">
              <h3 className="text-lg font-semibold">{selected.title}</h3>
              {selected.subtitle && (
                <p className="text-sm text-neutral-300">{selected.subtitle}</p>
              )}
            </div>
            */}

            {/* Close button (still optional, but redundant now) */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 rounded-full bg-black/60 px-3 py-1 text-white hover:bg-black/80"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
