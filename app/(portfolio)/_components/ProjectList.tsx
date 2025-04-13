import { ProjectImage } from './ProjectImage';

export const projectsData = [
  {
    title: 'VR Earth Orbit Simulation',
    description:
      'Solved an educational issue explaining astrological concepts by providing a visual, hands-on VR experience. Users can listen to lectures or walk around and interact with the Earth, Moon, and Sun along the orbit.',
    tags: ['C#', 'MATLAB', 'Unity'],
    link: 'https://github.com/williamphong/CS490-VR-Orbit',
    imageUrl: '/images/projects/vrorbit.webm',
    date: 'Jan 2024 - Present',
  },
  {
    title: 'Formula 1 Race Prediction Application',
    description:
      'Predicts race results from qualifying data using linear/multinomial and XGBoost regression',
    tags: ['Python', 'MatPlotLib', 'Pandas'],
    link: 'https://github.com/williamphong/F1DataVisualization',
    imageUrl: '/images/projects/f1.jpg',
    date: 'June 2024 - Present',
  },
  {
    title: 'Portfolio Website',
    description:
      'Built using Next.js with TypeScript, HTML, and Tailwind CSS, deployed on Vercel. Integrated BetterAuth, Prisma and PostgreSQL',
    tags: ['Next.JS', 'TypeScript', 'Vercel'],
    link: 'https://github.com/williamphong/personalwebsite',
    imageUrl: '/images/projects/waphong.png',
    date: 'May 2024 - Present',
  },
  {
    title: 'craniumknight.com',
    description:
      'Artist portfolio, built using Next.js with TypeScript, HTML, and Tailwind CSS, deployed on Netlify.',
    tags: ['Next.JS', 'TypeScript', 'Vercel'],
    link: 'https://craniumknight.com',
    imageUrl: '/images/projects/craniumknight.png',
    date: 'Feb 2025 - Present',
  },
  {
    title: 'kwauche.com',
    description:
      'Artist portfolio, built using Next.js with TypeScript, HTML, and Tailwind CSS, deployed on Netlify.',
    tags: ['Next.JS', 'TypeScript', 'Vercel'],
    link: 'https://kwauche.com',
    imageUrl: '/images/projects/kwauche.png',
    date: 'Jan 2025 - Present',
  },
  {
    title: 'Spotify Daylist Word Cloud',
    description:
      "Generates a word cloud from a user's Spotify daylist titles. Phrases are parsed using Spotify's API and saved into a database.",
    tags: ['Python', 'Spotipy'],
    link: 'https://github.com/williamphong/Spotify-Daylist-Word-Cloud',
    imageUrl: '/images/projects/wordcloud.png',
    date: 'June 2024 - Present',
  },
  {
    title: 'Discord Bot',
    description:
      'Deployed a responsive Java Discord bot supporting 200+ users. Containerized on AWS using Docker for 24/7 up-time.',
    tags: ['Java', 'Python', 'C++'],
    link: '',
    imageUrl: '/images/projects/discord-bot.webp',
    date: 'Jan 2019 - Present',
  },
  {
    title: 'Student Portal Application',
    description:
      'Provides personalized and focused information to students. Developed front-end app with Java and Android Studio',
    tags: ['Java', 'Android Studio', 'SQL'],
    link: 'https://github.com/williamphong/CSUSMStudentApp',
    imageUrl: '/images/projects/csusm.jpg',
    date: 'Jan 2023 - May 2023',
  },
] as const;

export const ProjectList = () => {
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
