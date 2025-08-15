import React from 'react';
import { Metadata } from 'next';

import { ExperienceList } from '../_components/ExperienceList';
import { BackButton } from '../_components/BackButton';

export const metadata: Metadata = {
  title: 'Employment History',
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

      <ExperienceList />
    </section>
  );
}
