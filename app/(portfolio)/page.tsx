'use client';
import React, { useEffect, useState, useRef, RefObject } from 'react';
import Link from 'next/link';

import { navigation, aboutMe } from '@/lib/data';
import { ProjectList } from './_components/ProjectList';
import { LeftFooter, RightFooter } from './_components/Footers';
import { ExternalLink } from './_components/ExternalLink';
import { Navigation } from './_components/Navigation';
import { EducationList } from './_components/EducationList';
import { ExperienceList } from './_components/ExperienceList';

export default function Home() {
  const sectionRefs = useRef<RefObject<HTMLElement>[]>(
    navigation.map(() => React.createRef<HTMLElement>())
  );
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className="lg:flex lg:justify-between lg:gap-4">
      {/* Left side  */}
      <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
        <div className="">
          <h1 className="text-edge-outline text-rpd-text dark:text-rp-text cursor-default bg-clip-text pb-4 text-4xl font-bold tracking-wide whitespace-nowrap sm:text-3xl md:text-6xl">
            <Link
              href="/"
              className="focus-visible:text-rpd-iris dark:focus-visible:text-rp-love"
            >
              William Phong
            </Link>
          </h1>

          <h2 className="text-rpd-text dark:text-rp-text text-lg font-medium tracking-tight sm:text-xl">
            M.S. in Computer Science @ SDSU
          </h2>

          <p className="mt-4 max-w-xs">
            Hi! I'm currently looking for backend software or data analysis
            roles, but I am open to all opportunities!
          </p>

          <Navigation activeSection={activeSection} />
        </div>

        <LeftFooter />
      </header>

      {/* Right side  */}
      <main id="content" className="lg:w-1/2 lg:py-24">
        {/* About me section */}
        <section
          id="about"
          className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
          ref={sectionRefs.current[0]}
        >
          <div>
            <p className="mb-4">{aboutMe.p1}</p>
            <p className="mb-4">{aboutMe.p2}</p>
          </div>

          <p className="mb-4">
            In my free time, I enjoy listening to{' '}
            <a
              className="text-rpd-love focus-visible:text-rpd-love dark:text-rp-rose dark:focus-visible:text-rp-love font-medium hover:underline hover:underline-offset-4"
              href="https://open.spotify.com/user/william.phong"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="spotify"
            >
              music
            </a>
            , taking{' '}
            <a
              className="text-rpd-love focus-visible:text-rpd-love dark:text-rp-rose dark:focus-visible:text-rp-love font-medium hover:underline hover:underline-offset-4"
              href="/gallery"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="gallery"
            >
              {' '}
              pictures
            </a>{' '}
            with my film camera, and watching{' '}
            <a
              className="text-rpd-love focus-visible:text-rpd-love dark:text-rp-rose dark:focus-visible:text-rp-love font-medium hover:underline hover:underline-offset-4"
              href="https://letterboxd.com/andjuly/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="letterboxd"
            >
              movies
            </a>
            .
          </p>
          <br></br>
          <p className="mb-4">
            <a
              className="group/link text-rpd-love focus-visible:text-rpd-love dark:text-rp-rose dark:focus-visible:text-rp-love font-medium hover:underline hover:underline-offset-4"
              href="/files/resume.pdf"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="resume"
            >
              <span className="inline-block">
                View my full resume here
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 group-focus-visible/link:translate-x-1 group-focus-visible/link:-translate-y-1 motion-reduce:transition-none"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                    clipRule="evenodd"
                  ></path>
                </svg>{' '}
              </span>
            </a>
          </p>
        </section>

        {/* Project Section */}
        <section
          id="projects"
          className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
          aria-label="my projects"
          ref={sectionRefs.current[1]}
        >
          <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
            <h2 className="text-sm font-bold tracking-widest uppercase lg:sr-only dark:text-slate-200">
              Projects
            </h2>
          </div>

          <ProjectList />
        </section>

        {/* Experience Section */}
        <section
          id="education"
          className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
          aria-label="education"
          ref={sectionRefs.current[2]}
        >
          <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
            <h2 className="text-sm font-bold tracking-widest uppercase lg:sr-only dark:text-slate-200">
              Education
            </h2>
          </div>

          <EducationList />
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
          aria-label="experience"
          ref={sectionRefs.current[3]}
        >
          <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
            <h2 className="text-sm font-bold tracking-widest uppercase lg:sr-only dark:text-slate-200">
              Experience
            </h2>
          </div>

          <ExperienceList />
        </section>

        <RightFooter />
      </main>
    </div>
  );
}
