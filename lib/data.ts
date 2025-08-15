export const navigation = [
  //dont need hash i think
  {
    name: 'about',
    hash: '#about',
  },
  {
    name: 'experience',
    hash: '#experience',
  },
  {
    name: 'projects',
    hash: '#projects',
  },
  {
    name: 'education',
    hash: '#education',
  },
  
] as const;

export const svg = [
  /*
  {
    name: 'Email',
    viewbox: '0 0 8 6',
    path: 'm0 0h8v6h-8zm.75 .75v4.5h6.5v-4.5zM0 0l4 3 4-3v1l-4 3-4-3z',
    link: 'mailto:williamphong10@gmail.com',
  },
  {
    name: 'GitHub',
    viewbox: '0 0 16 16',
    path: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z',
    link: 'https://github.com/williamphong',
  },
  {
    name: 'LinkedIn',
    viewbox: '0 0 24 24',
    path: 'M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66zM20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z',
    link: 'https://www.linkedin.com/in/williamphong/',
  },
  
  {
    name:'Twitter',
    viewbox: '0 0 1200 1227',
    path: 'M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z',
    link:'/'
  },
  {
    name:'Instagram',
    viewbox: '0 0 1000 1000',
    path: 'M295.42,6c-53.2,2.51-89.53,11-121.29,23.48-32.87,12.81-60.73,30-88.45,57.82S40.89,143,28.17,175.92c-12.31,31.83-20.65,68.19-23,121.42S2.3,367.68,2.56,503.46,3.42,656.26,6,709.6c2.54,53.19,11,89.51,23.48,121.28,12.83,32.87,30,60.72,57.83,88.45S143,964.09,176,976.83c31.8,12.29,68.17,20.67,121.39,23s70.35,2.87,206.09,2.61,152.83-.86,206.16-3.39S799.1,988,830.88,975.58c32.87-12.86,60.74-30,88.45-57.84S964.1,862,976.81,829.06c12.32-31.8,20.69-68.17,23-121.35,2.33-53.37,2.88-70.41,2.62-206.17s-.87-152.78-3.4-206.1-11-89.53-23.47-121.32c-12.85-32.87-30-60.7-57.82-88.45S862,40.87,829.07,28.19c-31.82-12.31-68.17-20.7-121.39-23S637.33,2.3,501.54,2.56,348.75,3.4,295.42,6m5.84,903.88c-48.75-2.12-75.22-10.22-92.86-17-23.36-9-40-19.88-57.58-37.29s-28.38-34.11-37.5-57.42c-6.85-17.64-15.1-44.08-17.38-92.83-2.48-52.69-3-68.51-3.29-202s.22-149.29,2.53-202c2.08-48.71,10.23-75.21,17-92.84,9-23.39,19.84-40,37.29-57.57s34.1-28.39,57.43-37.51c17.62-6.88,44.06-15.06,92.79-17.38,52.73-2.5,68.53-3,202-3.29s149.31.21,202.06,2.53c48.71,2.12,75.22,10.19,92.83,17,23.37,9,40,19.81,57.57,37.29s28.4,34.07,37.52,57.45c6.89,17.57,15.07,44,17.37,92.76,2.51,52.73,3.08,68.54,3.32,202s-.23,149.31-2.54,202c-2.13,48.75-10.21,75.23-17,92.89-9,23.35-19.85,40-37.31,57.56s-34.09,28.38-57.43,37.5c-17.6,6.87-44.07,15.07-92.76,17.39-52.73,2.48-68.53,3-202.05,3.29s-149.27-.25-202-2.53m407.6-674.61a60,60,0,1,0,59.88-60.1,60,60,0,0,0-59.88,60.1M245.77,503c.28,141.8,115.44,256.49,257.21,256.22S759.52,643.8,759.25,502,643.79,245.48,502,245.76,245.5,361.22,245.77,503m90.06-.18a166.67,166.67,0,1,1,167,166.34,166.65,166.65,0,0,1-167-166.34',
    link:'/'
  },
  */
  {
    name: 'Spotify',
    viewbox: '0 0 167.5 167.5',
    path: 'M83.7 0C37.5 0 0 37.5 0 83.7c0 46.3 37.5 83.7 83.7 83.7 46.3 0 83.7-37.5 83.7-83.7S130 0 83.7 0zM122 120.8c-1.4 2.5-4.6 3.2-7 1.7-19.8-12-44.5-14.7-73.7-8-2.8.5-5.6-1.2-6.2-4-.2-2.8 1.5-5.6 4-6.2 32-7.3 59.6-4.2 81.6 9.3 2.6 1.5 3.4 4.7 1.8 7.2zM132.5 98c-2 3-6 4-9 2.2-22.5-14-56.8-18-83.4-9.8-3.2 1-7-1-8-4.3s1-7 4.6-8c30.4-9 68.2-4.5 94 11 3 2 4 6 2 9zm1-23.8c-27-16-71.6-17.5-97.4-9.7-4 1.3-8.2-1-9.5-5.2-1.3-4 1-8.5 5.2-9.8 29.6-9 78.8-7.2 109.8 11.2 3.7 2.2 5 7 2.7 10.7-2 3.8-7 5-10.6 2.8z',
    link: 'https://open.spotify.com/user/william.phong',
  },
  /*
  {
    name:'Discord',
    viewbox: '0 0 16 16',
    path: 'M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612',
    link:'https://discord.com/users/146099021151338497'
  },
  */
] as const;

export const projectsData = [
  {
    title: 'VR Earth Orbit Simulation', 
    description:
      "Solves an educational issue explaining astronomical concepts by providing a visual, hands-on VR experience. Users can listen to lectures or walk around and interact with the Earth, Moon, and Sun's orbit.",
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
    link: 'https://github.com/williamphong/waphong.com',
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

export const experienceData = [
  {
    title: 'Data Science Intern',
    company: 'Tensor Therapeutics',
    location: 'San Diego, CA',
    description:
      'Applied machine learning techniques to accelerate drug discovery processes. Utilized Boltz-2 to generate predictive models for RNA structures and molecular interactions. Developed and deployed a scalable variant calling pipeline using Sarek (nf-core), Nextflow, and Docker for genomic data analysis. Configured, managed, and scaled virtual machines on Azure and Lambda.ai, implementing secure networking and SSH access to support efficient remote workflows',
    date: '2025 - Present',
    skills: ['Python', 'PyTorch', 'Tensorflow', 'Azure'],
  },
  {
    title: 'HS Debate Coach / Judge',
    company: 'TPHS, Advanced Technologies Academy, Potomac Academy',
    location: 'CA, NV, MD',
    description:
      'Developed curriculum modules and specialized preparation documents for individual students and groups of 3-8. Coordinated with high schools, colleges, and staff for tournament logistics',
    date: '2019 - Present',
    skills: [],
  },
  {
    title: 'Math and Reading Tutor',
    company: 'Kumon',
    location: 'San Diego, CA',
    description:
      'Assisted dozens of students daily by assessing their individual needs and learning styles.',
    date: '2022 - 2023',
    skills: [],
  },
  {
    title: 'Team Member',
    company: "Einstein Bro's",
    location: 'San Diego, CA',
    description:
      'Efficiently processed transactions and exceeded customer experience expectations based on feedback/reviews. Trained new employees with use of point of sales system and day-to-day protocols',
    date: '2021 - 2022',
    skills: [],
  },
] as const;

export const education = [
  {
    title: 'San Diego State University',
    date: 'Present',
    degree: 'M.S. in Computer Science',
    awards: '',
    classes: '',
  },
  {
    title: 'California State University, San Marcos',
    date: 'Aug 2024',
    degree: 'B.S. in Computer Science',
    awards: 'Cum Laude, Deans List Spring 2023 & 2024',
    classes:
      "Data Structures and Algorithm's, Operating Systems, Databases, Cloud Computing, Networking, Security, Architecture, Embedded Systems, Software Engineering, Probability and Statistics, Discrete Mathematics, Linear Algebra",
  },
] as const;