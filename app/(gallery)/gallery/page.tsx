import React from 'react';
import type { Metadata } from 'next';
import Footer from './_components/Footer';
import GalleryCards from './_components/GalleryCards';

export const metadata: Metadata = {
  title: 'Gallery',
  description: '35mm film photography by William Phong.',
};

export default function Home() {
  return (
    <div className="text-6xl">
      <div className="text-center">
        <h1>Gallery</h1>
      </div>

      <div className="my-32 text-center">
        <GalleryCards />

        <p className="mt-24 text-base">camera: pentax espio 928 35mm film</p>
      </div>
      <Footer />
    </div>
  );
}
