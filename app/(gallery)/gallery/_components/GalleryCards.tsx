'use client';
import { useEffect, useRef, useState } from 'react';
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
    <button
      type="button"
      onClick={onClick}
      // bg-neutral-100 was hardcoded for both themes, so in dark mode the
      // title inherited light body text onto a light card: 2.96:1. Using the
      // existing rose-pine surface token takes it to 5.12:1.
      className="group dark:bg-rp-surface block w-full cursor-pointer overflow-hidden rounded-xl bg-neutral-100 text-left shadow-sm transition hover:shadow-md"
    >
      {/* Square image container */}
      <div className="relative flex aspect-square items-center justify-center p-4">
        <div className="relative h-[90%] w-full">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Info */}
      <div className="px-4 py-3">
        <h2 className="text-sm font-medium">{title}</h2>
        {/* Palette tokens, not raw neutrals: neutral-500 on the neutral-100
            card is 4.35:1, just under AA. */}
        {subtitle && (
          <p className="text-rpd-subtle-deep dark:text-rp-subtle mt-1 text-xs">
            {subtitle}
          </p>
        )}
      </div>
    </button>
  );
}

export default function GalleryGrid() {
  const [selected, setSelected] = useState<GalleryCardProps | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // `<dialog open>` renders inline: no top layer, no focus trap, no Escape,
  // and the page behind it keeps scrolling. showModal() gives all of that.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selected && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else if (!selected && dialog.open) {
      dialog.close();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selected]);

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
      <dialog
        ref={dialogRef}
        aria-label={selected?.title}
        // onClose fires for Escape and for close(), so state stays in sync.
        onClose={() => setSelected(null)}
        className="fixed inset-0 z-50 h-full max-h-none w-full max-w-none bg-transparent p-4 backdrop:bg-black/80"
      >
        {selected && (
          // The dialog fills the viewport, so a click on the "backdrop" lands
          // on this wrapper — never on the dialog element or its ::backdrop.
          <div
            className="flex h-full w-full items-center justify-center"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelected(null);
            }}
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

              <button
                type="button"
                aria-label="Close"
                autoFocus
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 rounded-full bg-black/60 px-3 py-1 text-white hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
