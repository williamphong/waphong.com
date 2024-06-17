import Image from 'next/image';
import React from 'react';
import { links, aboutMe, experiencesData, projectsData } from './lib/data';
//import Spotlight, { SpotlightCard } from '../app/components/spotlight';

export default function Home() {
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
      <div className="lg:flex lg:justify-between lg:gap-4">
        <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
          <div>
            <h1 className="text-edge-outline cursor-default whitespace-nowrap bg-clip-text pb-4 text-4xl font-bold text-slate-200 sm:text-3xl md:text-6xl">
              <a href="/">William Phong</a>
            </h1>
            <h2 className="text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
              B.S. Computer Science @ CSU San Marcos
            </h2>

            <nav
              className="nav hidden lg:block"
              aria-label="In-page jump links"
            >
              <ul className="mt-16 w-max">
                {links.map((item, index) => (
                  <li key={index}>
                    <a
                      className="group flex items-center py-3"
                      href={`${item.hash}`}
                    >
                      <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                      <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">
                        {item.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
          <section
            id="about"
            className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
          >
            {aboutMe.map((item, index) => (
              <div key={index}>
                <p className="mb-4 text-slate-400">{item.p1}</p>
                <p className="mb-4 text-slate-400">{item.p2}</p>
                <p className="mb-4 text-slate-400">{item.p3}</p>
              </div>
            ))}
            <p className="mb-4 text-slate-400">
              In my free time, I enjoy listening to music, going on walks and
              taking
              <a
                className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                href="/gallery"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="gallery"
              >
                {' '}
                pictures{' '}
              </a>
              with my film camera, learning the guitar, playing video games, and
              watching
              <a
                className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
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
                className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                href="/files/resume.pdf"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="resume"
              >
                View my full resume here
              </a>
            </p>
          </section>

          <section id="experience" className="mt-16 items-center">
            <h2>Experience</h2>
            {experiencesData.map((exp, index) => (
              <div key={index}>
                <h3>{exp.title}</h3>
                <p>{exp.description}</p>
              </div>
            ))}
          </section>

          <section id="projects" className="mt-16">
            <h2>Projects</h2>
            {projectsData.map((project, index) => (
              <div key={index} className="project-card mb-8">
                <div className="relative h-64 w-full">
                  <Image
                    src={project.imageUrl}
                    alt={project.title || 'Project Image'}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h3>{project.title || 'Untitled Project'}</h3>
                <p>{project.description}</p>
                <ul className="flex space-x-2">
                  {project.tags.map((tag, tagIndex) => (
                    <li
                      key={tagIndex}
                      className="rounded bg-gray-200 px-2 py-1"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
