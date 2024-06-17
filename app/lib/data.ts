import React from 'react';
import { CgWorkAlt } from 'react-icons/cg';
import { FaReact } from 'react-icons/fa';
import { LuGraduationCap } from 'react-icons/lu';
import { StaticImageData } from 'next/image';

import vrOrbitImg from '@/public/images/vrdemo.gif';
import websiteImg from '@/public/images/please_do_not_the_cat.png';
import daylistCloud from '@/public/images/wordcloud.png';
import csusmAppImg from '@/public/images/please_do_not_the_cat.png';
import discordBotImg from '@/public/images/please_do_not_the_cat.png';

export const links = [
  {
    name: 'About',
    hash: '#about',
  },
  {
    name: 'Experience',
    hash: '#experience',
  },
  {
    name: 'Projects',
    hash: '#projects',
  },
] as const;

export const aboutMe = [
  {
    p1: 'Hi! My name is William Phong and I graduated from CSU San Marcos with a B.S. in Computer Science. My focuses and interests are in fullstack/backend programming as well as data analysis, but I am open to all opportunities!',
    p2: "My first interaction with a computer was with my dad's old ThinkPad when I was five years old. At the time, playing games on the Lego and Disney websites brought me joy and exposed me to a realm of interactive spaces. Fast forward 17 years to today, and I've graduated with a degree in Computer Science and several projects under my belt.",
    p3: "I've always been interested in developing software that has a material impact on people's lives. The first project I worked on was an educational mobile for dyslexic students as a middle school student. I've recently contributed to a VR Earth Orbit project that incorporates published research into a VR demo aimed towards helping astronomy students at a HS/College level.",
  },
];

export const education = [
  {
    title: 'CSU San Marcos',
    date: '2023 - 2024',
    degree: 'Bachelors of Science, Computer Science',
    awards: 'Deans List Spring 2023 & Spring 2024 (4.0, 3.75), Magna Cum Laude',
    classes:
      'Data Structures and Algorithms, Operating Systems, Databases, Cloud Computing, Networking, Security, Architecture, Embedded Systems, Software Engineering, Probability and Statistics, Discrete Mathematics, Linear Algebra',
  },
  {
    title: 'Miracosta College',
    date: '2019 - 2022',
    degree: 'Asc',
  },
];

export const experiencesData = [
  {
    title: 'Debate Coach and Judge',
    location: 'CA, NV, MD',
    description:
      'Worked with students individually and in groups of 3-8, Created curriculum modules and preparation documents for novice/jv/varsity debaters, Coordinated with high schools, colleges, and staff for tournament logistics, Judged tournament rounds from preliminaries to finals rounds',
    icon: React.createElement(LuGraduationCap),
    date: '2019 - Present',
  },
  {
    title: 'Math and Reading Tutor',
    location: 'San Diego, CA',
    description:
      'Assisted students in math and reading topics ranging from kindergartener to high school, Focus on math (precalculus – multivaraible calculus), Worked with the student information database',
    icon: React.createElement(CgWorkAlt),
    date: '2022 - 2023',
  },
  {
    title: 'Team Member',
    location: 'San Diego, CA',
    description:
      'Assisted customers with purchasing items, making various drinks and sandwiches, and handling the register, Helped train new members with customer service and behind the bar preparation',
    icon: React.createElement(FaReact),
    date: '2021 - 2022',
  },
] as const;

interface Project {
  title: string;
  description: string;
  tags: string[];
  imageUrl: StaticImageData;
}

export const projectsData: Project[] = [
  {
    title: 'VR Earth Orbit Simulation',
    description:
      "Unity Virtual Reality demo that teaching users astrology concepts through a simulation of the Earth's Orbit around the sun. Users can select lectures to listen to or walk around and interact with the Earth, Moon, and Sun objects along the orbit. ",
    tags: ['Unity', 'MATLAB', 'C#'],
    imageUrl: vrOrbitImg,
  },
  {
    title: 'Personal website',
    description: 'Personal website developed using Next.JS.',
    tags: ['Next.JS', 'TypeScript', 'CSS'],
    imageUrl: websiteImg,
  },
  {
    title: 'Spotify Daylist Word Cloud',
    description:
      "Creates a word cloud from a user's spotify daylist. The title is exported into a spreadsheet which is used to generate a word cloud.",
    tags: ['Python', 'Spotipy'],
    imageUrl: daylistCloud,
  },
  {
    title: 'CSUSM Student Application',
    description:
      'Interviewed faculty administrators and students of CSUSM to determine a customer story and requirements. Utilized Java and Android Studio to develop front-end, employed a MySQL database and connector to communicate data between server and application, Used SHA256 hashing to encrypt user data',
    tags: ['Java', 'Android Studio', 'SQL'],
    imageUrl: csusmAppImg,
  },
  {
    title: 'Discord Bot',
    description:
      'Implemented a Discord bot into servers with 200+ users. Utilized youtube-dl and ffmpeg to play video audio in voice channels, custom chat responses and bot behavior triggered through user inputs, hosted on a UNIX local machine with 24/7 up-time.',
    tags: ['Java', 'Android Studio', 'SQL', 'Tailwind', 'Framer'],
    imageUrl: discordBotImg,
  },
] as const;

export const skillsData = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Git',
  'Tailwind',
  'MySQL',
  'Java/Kotlin/Scala',
  'C/C++/C#',
  'Fortran',
  'Cobol',
  'ANTLR',
  'MIPS',
  'Python',
  'AWS',
] as const;
