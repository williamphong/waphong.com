import React from 'react';
import { Metadata } from 'next';

import { ExperienceList } from '../_components/ExperienceList';
import { BackButton } from '../_components/BackButton';

export const metadata: Metadata = {
  title: 'Employment History',
  description: 'Full employment history of William Phong.',
  alternates: { canonical: '/experience' },
};

export default function WorkHistory() {
  return (
    <section
      id="experience"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
    >
      <div className="mb-16 text-sm sm:pb-0">
        <BackButton />
      </div>

      {/* The only h1 is the site name in the layout and the entries below are
          h3, so without this the heading level skips h2. */}
      <h2 className="sr-only">Experience</h2>

      <ExperienceList />
    </section>
  );
}
