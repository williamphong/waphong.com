'use client';
import React from 'react';
import Link from 'next/link';

import { ProjectList } from './_components/ProjectList';
import { RightFooter } from './_components/Footers';
import { EducationList } from './_components/EducationList';
import { ExperienceList } from './_components/ExperienceList';
import { AboutMe } from './_components/AboutMe';

export default function Home() {
  return (
    <div className="">
      {/* Right side  */}
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

        <Link
          className="group/link link--color hover:underline-4 font-medium"
          href="/experience"
          rel="noreferrer noopener"
          aria-label="resume"
          scroll={true}
        >
          <span className="group inline-block">
            Full employment history
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 motion-reduce:transition-none"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              ></path>
            </svg>
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

        <Link
          className="group/link link--color hover:underline-4 font-medium"
          href="/projects"
          rel="noreferrer noopener"
          aria-label="resume"
          scroll={true}
        >
          <span className="group inline-block">
            More projects
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 motion-reduce:transition-none"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              ></path>
            </svg>
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
