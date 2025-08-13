'use client';
import React, { useEffect, useState, useRef, RefObject } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { navigation } from '@/lib/data';
import { ProjectList } from './_components/ProjectList';
import { LeftFooter, RightFooter } from './_components/Footers';
import { Navigation } from './_components/Navigation';
import { EducationList } from './_components/EducationList';
import { ExperienceList } from './_components/ExperienceList';
import { AboutMe } from './_components/AboutMe';

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

  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault(); // stop navigation if already on "/"
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  return (
    <div className="lg:flex lg:justify-between lg:gap-4">
      {/* Left side  */}
      <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
        <div className="">
          <h1 className="text-edge-outline text-rpd-text dark:text-rp-text cursor-default bg-clip-text pb-4 text-4xl font-bold tracking-wide whitespace-nowrap sm:text-3xl md:text-6xl">
            <Link
              href="/"
              className="focus-visible:text-rpd-rose dark:focus-visible:text-rp-love"
              onClick={handleClick}
            >
              William Phong
            </Link>
          </h1>

          <h2 className="text-rpd-text dark:text-rp-text text-lg font-medium tracking-tight sm:text-xl">
            M.S. in Computer Science @ SDSU
          </h2>

          <p className="mt-4 max-w-xs">
            Hi! I'm currently a student at SDSU and looking for backend software
            or data analysis roles, but I am open to all opportunities!
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
          aria-label="about me"
          ref={sectionRefs.current[0]}
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
          ref={sectionRefs.current[1]}
        >
          <div className="dark:bg-rp-base/75 bg-rpd-base/75 sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
            <h2 className="dark:text-rp-text text-rpd-text text-sm font-bold tracking-widest uppercase lg:sr-only">
              Experience
            </h2>
          </div>

          <ExperienceList />
        </section>

        {/* Project Section */}
        <section
          id="projects"
          className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
          aria-label="my projects"
          ref={sectionRefs.current[2]}
        >
          <div className="dark:bg-rp-base/75 bg-rpd-base/75 sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
            <h2 className="dark:text-rp-text text-rpd-text text-sm font-bold tracking-widest uppercase lg:sr-only">
              Projects
            </h2>
          </div>

          <ProjectList />
        </section>

        {/* Education Section */}
        <section
          id="education"
          className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
          aria-label="education"
          ref={sectionRefs.current[3]}
        >
          <div className="dark:bg-rp-base/75 bg-rpd-base/75 sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
            <h2 className="dark:text-rp-text text-rpd-text text-sm font-bold tracking-widest uppercase lg:sr-only">
              Education
            </h2>
          </div>

          <EducationList />
        </section>

        <div className="lg:pt-48">
          <RightFooter />
        </div>
      </main>
    </div>
  );
}
