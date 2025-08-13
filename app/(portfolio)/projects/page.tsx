'use client';
import React from 'react';

import { useRouter } from 'next/navigation';
import { ProjectImage } from '../_components/ProjectImage';
import { Button } from '@/components/ui/button';

export const projectsData = [
  {
    title: 'VR Earth Orbit Simulation',
    description:
      "Solves an educational issue explaining astrological concepts by providing a visual, hands-on VR experience. Users can listen to lectures or walk around and interact with the Earth, Moon, and Sun's orbit.",
    tags: ['C#', 'MATLAB', 'Unity', 'SteamVR'],
    link: 'https://github.com/williamphong/CS490-VR-Orbit',
    imageUrl: '/images/projects/vrorbit.webm',
    date: 'Jan 2024 - Present',
  },
  {
    title: 'Formula 1 Race Prediction Application',
    description:
      'Developed predictive analytics model using linear/multinomial regression and XGBoost algorithms. Data operations are managed with PostgreSQL and results are visualized using Matplotlib',
    tags: [
      'Python',
      'Tensorflow',
      'Pytorch',
      'Sci-kit',
      'Matplotlib',
      'Pandas',
      'Postgresql',
    ],
    link: 'https://github.com/williamphong/F1DataVisualization',
    imageUrl: '/images/projects/f1.jpg',
    date: 'Jun 2024 - Present',
  },
  {
    title: 'Portfolio Website // waphong.com',
    description:
      'My personal portfolio website. Integrates BetterAuth, Prisma and PostgreSQL for backend usage.',
    tags: ['Next.JS', 'TypeScript', 'Tailwind', 'Vercel', 'Playwright'],
    link: 'https://github.com/williamphong/personalwebsite',
    imageUrl: '/images/projects/waphong.png',
    date: 'May 2024 - Present',
  },
  {
    title: 'craniumknight.com',
    description: 'Portfolio website built for artist craniumknight.',
    tags: ['Next.JS', 'TypeScript', 'Tailwind', 'Netlify'],
    link: 'https://craniumknight.com',
    imageUrl: '/images/projects/craniumknight.png',
    date: 'Feb 2025 - Present',
  },
  {
    title: 'kwauche.com',
    description: 'Portfolio website built for artist Ryan Quach.',
    tags: ['Next.JS', 'TypeScript', 'Tailwind', 'Netlify'],
    link: 'https://kwauche.com',
    imageUrl: '/images/projects/kwauche.png',
    date: 'Jan 2025 - Present',
  },
  {
    title: 'Spotify Daylist Word Cloud',
    description:
      "Dynamic word cloud generator visualizing musical preferences from Spotify daylist data. Phrases are parsed using Spotify's API and saved into a database.",
    tags: ['Python', 'Matplotlib', 'Spotipy', 'Postgresql'],
    link: 'https://github.com/williamphong/Spotify-Daylist-Word-Cloud',
    imageUrl: '/images/projects/wordcloud.png',
    date: 'Jun 2024 - Present',
  },
  {
    title: 'Discord Bot',
    description:
      'Deployed a responsive Java Discord bot supporting 200+ users. Containerized on AWS for 24/7 up-time.',
    tags: ['Java', 'Python', 'Docker', 'AWS'],
    link: '',
    imageUrl: '/images/projects/discord-bot.webp',
    date: 'Jan 2019 - Present',
  },
  {
    title: 'Student Portal Application',
    description:
      'Provides personalized and focused information to students. Developed front-end app with Java and Android Studio',
    tags: ['Java', 'Android Studio', 'MySQL'],
    link: 'https://github.com/williamphong/CSUSMStudentApp',
    imageUrl: '/images/projects/csusm.jpg',
    date: 'Jan 2023 - May 2023',
  },
] as const;

export default function Home() {
  const router = useRouter();
  return (
    <div className="">
      <div className="my-12">
        <button
          onClick={() => router.back()}
          className="group/link link--color hover:underline-4 font-medium"
        >
          Back
        </button>
      </div>

      <ol>
        {projectsData.map((project, index) => (
          <li key={index} className="mb-12">
            <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:group-hover/list:opacity-50 lg:hover:!opacity-100">
              <div className="dark:lg:group-hover:bg-rp-surface/75 lg:group-hover:bg-rpd-surface/75 absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>

              <div className="z-10 sm:order-2 sm:col-span-6">
                <h3>
                  <a
                    className="group/link text-rpd-text dark:text-rp-text dark:hover:text-rp-rose hover:text-rpd-love focus-visible:text-rpd-iris dark:focus-visible:text-rp-love inline-flex items-baseline text-base font-medium"
                    href={project.link}
                    aria-label={project.title}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                    <span>{project.title}</span>
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
                    </svg>
                  </a>
                </h3>

                <p className="mt-2 text-sm">{project.description}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Button
                      key={tag}
                      variant="outline"
                      size="sm"
                      className="dark:bg-rp-surface bg-rpd-surface dark:text-rp-foam text-rpd-foam pointer-events-none"
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>

              <ProjectImage url={project.imageUrl} alt={project.title} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
