'use client';
import React, { useEffect, useState, useRef, RefObject } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  navigation,
  aboutMe,
  //experiencesData,
  //education,
  projectsData,
  svg,
} from '../../lib/data';
import { ModeToggle } from '@/components/themeToggle/theme-toggle';

// Project Image Component
const ProjectImage = ({ url }: { url: string }) => {
  const isWebm = url.endsWith('.webm');
  if (isWebm) {
    return (
      <video
        autoPlay
        loop
        muted
        playsInline
        width="200"
        height="48"
        preload="auto"
        className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
      >
        <source src={url} type="video/webm" />
      </video>
    );
  }
  return (
    <Image
      src={url}
      alt="image"
      decoding="async"
      width={200}
      height={48}
      className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
    />
  );
};

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

const ProjectList = () => {
  return (
    <div>
      <ol>
        {projectsData.map((project, index) => (
          <li key={index} className="mb-12">
            <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
              <div className="z-10 sm:order-2 sm:col-span-6">
                <h3>
                  <a
                    className="group/link inline-flex items-baseline text-base font-medium leading-tight text-slate-700 hover:text-teal-300 focus-visible:text-teal-300 dark:text-slate-200"
                    href={project.link}
                    aria-label={project.title}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                    <span>{project.title}</span>
                  </a>
                </h3>

                <p className="mt-2 text-sm leading-normal">
                  {project.description}
                </p>
              </div>

              <ProjectImage url={project.imageUrl} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

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
            {' '}
            Hi! I am currently looking for backend software dev and/or data
            analysis roles, but I am open to all opportunities!{' '}
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

        {/* Left side footer */}
        <ul
          className="ml-1 mt-8 flex items-center gap-5"
          aria-label="Social media"
        >
          <ModeToggle />
          {svg.map((img, index) => (
            <li key={index} className="shrink-0 text-xs">
              <a
                className="block hover:text-slate-200"
                href={img.link}
                target="blank"
                title={img.name}
              >
                <span className="sr-only">{img.name}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox={img.viewbox}
                  fill="currentColor"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d={img.path}></path>
                </svg>
              </a>
            </li>
          ))}
        </ul>
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
              href="/files/Resume.pdf"
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

          <div>
            <p className="mt-2 text-sm leading-normal">gallery coming soon</p>
          </div>
        </section>

        {/* More section */}
        <section
          id="more"
          className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
          aria-label="more"
          ref={sectionRefs.current[3]}
        >
          <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
              more
            </h2>
          </div>

          <div>
            <p className="mt-2 text-sm leading-normal">More coming soon</p>
          </div>
        </section>

        {/* Right side footer */}
        <footer className="max-w-md pb-16 pt-96 text-sm sm:pb-0">
          {
            <p>
              The design and code for this website is largely inspired or from{' '}
              <a
                className="font-medium text-slate-700 hover:text-teal-300 dark:text-slate-200 dark:focus-visible:text-teal-300"
                href="https://brittanychiang.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="letterboxd"
              >
                {' '}
                brittanychiang.com
              </a>{' '}
              and{' '}
              <a
                className="font-medium text-slate-700 hover:text-teal-300 dark:text-slate-200 dark:focus-visible:text-teal-300"
                href="https://carlbeaverson.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="letterboxd"
              >
                {' '}
                carlbeaverson.com
              </a>
              . It is developed with Next.js, Typescript, Tailwind CSS, and
              deployed with Vercel.
            </p>
          }
        </footer>
      </main>
    </div>
  );
}
