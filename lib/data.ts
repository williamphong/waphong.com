export const navigation = [
  {
    name: 'about',
  },
  {
    name: 'experience',
  },
  {
    name: 'projects',
  },
  {
    name: 'education',
  },
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
    tags: ['Next.JS', 'TypeScript', 'Tailwind', 'Cloudflare', 'Playwright'],
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
    title: 'Graduate Research Assistant',
    company: 'SDSU Climate Informatics Laboratory',
    location: 'San Diego, CA',
    description:
      'Developing the iCharm climate analysis interface, incorporating over 200 GB of NOAA datasets for 3D-visualization and statistical analysis.',
    date: 'Present',
    skills: [
      'Python',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'PostgreSQL',
      'Docker',
    ],
  },
  {
    title: 'Graduate Research Intern',
    company: 'Pisces Lab @ SDSU',
    location: 'San Diego, CA',
    description:
      'Building an agentic digital-twin system for smart city traffic using CARLA and Ruth simulators. Integrated Google Gemini for natural language conversion, autonomous entity control, and inferencing. ',
    date: 'Present',
    skills: [
      'Python',
      'Gemini',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'PostgreSQL',
      'Docker',
    ],
  },
  {
    title: 'Data Science Intern',
    company: 'Tensor Therapeutics',
    location: 'San Diego, CA',
    description:
      'Accelerated drug discovery processes by generating predictive models for RNA structures and molecular interactions. Deployed a scalable variant calling pipeline using Sarek (nf-core) for genomic data analysis. ',
    date: '2025',
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
    date: 'May 2027',
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

export const blogPosts = [
  {
    id: 'welcome-to-my-blog',
    title: 'Welcome to My Blog',
    date: 'Nov 17, 2025',
    excerpt: 'An introduction to my blog and what you can expect to find here.',
    content: `This is my first blog post! I'm excited to share my thoughts, experiences, and learnings with you.

## What to Expect

I'll be writing about:
- Software development and engineering
- Machine learning and data science
- My research projects
- Tech tutorials and tips

Stay tuned for more content!`,
  },
  {
    id: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js',
    date: 'Nov 16, 2025',
    excerpt:
      'A comprehensive guide to building modern web applications with Next.js.',
    content: `Next.js is a powerful React framework that makes building web applications a breeze.

## Why Next.js?

- Server-side rendering
- Static site generation
- API routes
- File-based routing
- And much more!

Let's dive in and explore what makes Next.js so great.`,
  },
  {
    id: 'machine-learning-basics',
    title: 'Machine Learning Basics',
    date: 'Nov 15, 2025',
    excerpt:
      'Understanding the fundamentals of machine learning and its applications.',
    content: `Machine learning is transforming how we solve complex problems.

## Key Concepts

1. Supervised Learning
2. Unsupervised Learning
3. Reinforcement Learning

Each approach has its own use cases and advantages.`,
  },
] as const;
