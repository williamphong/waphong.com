'use client';
import React, { useEffect, useState, useRef, RefObject } from 'react';
import Link from 'next/link';

import { navigation, aboutMe } from '@/lib/data';
import { ProjectList } from './_components/ProjectList';
import { LeftFooter, RightFooter } from './_components/Footers';

// Navigation
const NavigationLink = ({
  item,
  isActive,
}: {
  item: { name: string };
  isActive: boolean;
}) => (
  <li>
    <Link
      href={`#${item.name}`}
      className={`group flex items-center py-3 ${isActive ? 'active dark:activedark' : ''}`}
    >
      <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-800 group-focus-visible:w-16 group-focus-visible:bg-slate-800 motion-reduce:transition-none dark:group-hover:bg-slate-200 dark:group-focus-visible:bg-slate-200"></span>
      <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-800 group-focus-visible:text-slate-800 dark:group-hover:text-slate-200 dark:group-focus-visible:text-slate-700">
        {item.name}
      </span>
    </Link>
  </li>
);

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
        <div>
          <h1 className="text-edge-outline cursor-default whitespace-nowrap bg-clip-text pb-4 text-4xl font-bold dark:text-slate-200 sm:text-3xl md:text-6xl">
            <Link href="/">William Phong</Link>
          </h1>

          <h2 className="text-lg font-medium tracking-tight dark:text-slate-200 sm:text-xl">
            Bachelors in Computer Science
          </h2>

          <p className="mt-4 max-w-xs leading-normal">
            Hi! I am currently looking for backend software dev and/or data
            analysis roles, but I am open to all opportunities!
          </p>

          <nav className="nav hidden lg:block" aria-label="In-page jump links">
            <ul className="mt-16 w-max">
              {navigation.map((item, index) => (
                <NavigationLink
                  key={index}
                  item={item}
                  isActive={activeSection === item.name}
                />
              ))}
            </ul>
          </nav>
        </div>

        <LeftFooter />
      </header>

      {/* Right side  */}
      <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
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
              className="font-medium text-slate-700 hover:text-teal-300 dark:text-slate-200 dark:focus-visible:text-teal-300"
              href="https://open.spotify.com/user/william.phong"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="letterboxd"
            >
              {' '}
              music
            </a>
            , taking
            <a
              className="font-medium text-slate-700 hover:text-teal-300 dark:text-slate-200 dark:focus-visible:text-teal-300"
              href="/gallery"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="gallery"
            >
              {' '}
              pictures{' '}
            </a>
            with my film camera, playing video games, and watching
            <a
              className="font-medium text-slate-700 hover:text-teal-300 dark:text-slate-200 dark:focus-visible:text-teal-300"
              href="https://letterboxd.com/andjuly/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="letterboxd"
            >
              {' '}
              movies
            </a>
            .
          </p>

          <p className="mb-4 text-slate-400">
            <a
              className="font-medium text-slate-700 hover:text-teal-300 dark:text-slate-200 dark:focus-visible:text-teal-300"
              href="/files/resume.pdf"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="resume"
            >
              View my full resume here ↗
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
            <h2 className="text-sm font-bold uppercase tracking-widest dark:text-slate-200 lg:sr-only">
              Projects
            </h2>
          </div>

          <ProjectList />
        </section>

        {/* gallery section */}
        <section
          id="gallery"
          className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
          aria-label="gallery"
          ref={sectionRefs.current[2]}
        >
          <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
              gallery
            </h2>
          </div>

          <div className="h-96">
            <p className="mt-2 text-sm leading-normal">
              gallery and more coming soon
            </p>
          </div>
        </section>

        <RightFooter />
      </main>
    </div>
  );
}
