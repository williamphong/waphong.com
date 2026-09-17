import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { ProjectList } from './_components/ProjectList';
import { RightFooter } from './_components/RightFooter';
import { EducationList } from './_components/EducationList';
import { ExperienceList } from './_components/ExperienceList';
import { AboutMe } from './_components/AboutMe';
import { ArrowIcon } from './_components/ArrowIcon';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  // No `title` here on purpose. title.template only applies to *child* route
  // segments, never the segment that declares it — and page.tsx sits in the
  // same segment as the layout that owns the template. Setting `title: 'Home'`
  // produced a bare <title>Home</title>. Falling through to the layout's
  // `default` gives "William Phong".
  description:
    'William Phong is a graduate student in Computer Science at SDSU focusing on machine learning, AI, and software engineering.',
};

export default function Home() {
  return (
    <div className="">
      {/* About me section */}
      <section
        id="about"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-40 lg:scroll-mt-24"
        aria-label="about me"
      >
        <div className="dark:bg-rp-base/75 bg-rpd-base/75 sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
          <h2 className="dark:text-rp-text text-rpd-text text-sm font-bold tracking-widest uppercase lg:sr-only">
            About Me
          </h2>
        </div>

        <AboutMe />
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
        aria-label="experience"
      >
        <div className="dark:bg-rp-base/75 bg-rpd-base/75 sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
          <h2 className="dark:text-rp-text text-rpd-text text-sm font-bold tracking-widest uppercase lg:sr-only">
            Experience
          </h2>
        </div>

        <ExperienceList limit={3} />

        {/* No aria-label: the visible text is already the accessible name.
            An aria-label that omits the visible words breaks voice control. */}
        <Link className="group/link" href="/experience">
          <span className="group link--color hover:underline-4 inline-block font-medium">
            Full employment history
            <ArrowIcon className="-translate-y-px transition-transform group-hover:translate-x-2" />
          </span>
        </Link>
      </section>

      {/* Project Section */}
      <section
        id="projects"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
        aria-label="my projects"
      >
        <div className="dark:bg-rp-base/75 bg-rpd-base/75 sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
          <h2 className="dark:text-rp-text text-rpd-text text-sm font-bold tracking-widest uppercase lg:sr-only">
            Projects
          </h2>
        </div>

        <ProjectList limit={3} />

        <Link className="group/link" href="/projects">
          <span className="group link--color hover:underline-4 inline-block font-medium">
            More projects
            <ArrowIcon className="-translate-y-px transition-transform group-hover:translate-x-2" />
          </span>
        </Link>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
        aria-label="education"
      >
        <div className="dark:bg-rp-base/75 bg-rpd-base/75 sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
          <h2 className="dark:text-rp-text text-rpd-text text-sm font-bold tracking-widest uppercase lg:sr-only">
            Education
          </h2>
        </div>

        <EducationList />
      </section>

      <RightFooter />
    </div>
  );
}
