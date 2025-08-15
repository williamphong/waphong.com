import React from 'react';
import { Metadata } from 'next';

import { BackButton } from '../_components/BackButton';
import { ProjectList } from '../_components/ProjectList';

export const metadata: Metadata = {
  title: 'Projects',
};

export default function Projects() {
  return (
    <div className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
      <div className="mb-16 text-sm sm:pb-0">
        <BackButton />
      </div>
      <section
        id="projects"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
        aria-label="projects"
      >
        <ProjectList />
      </section>
    </div>
  );
}
