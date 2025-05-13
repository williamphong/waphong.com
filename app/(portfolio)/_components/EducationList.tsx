import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

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

export const EducationList = () => {
  return (
    <div>
      <ol>
        {education.map((edu, index) => (
          <li key={index} className="mb-12">
            <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:group-hover/list:opacity-50 lg:hover:!opacity-100">
              <div className="lg:group-hover:bg-rpd-surface/75 dark:lg:group-hover:bg-rp-surface/75 absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
              <header className="text-rpd-gold dark:text-rp-gold z-10 mt-1 mb-2 text-xs font-semibold tracking-wide uppercase sm:col-span-2">
                {edu.date}
              </header>

              <div className="z-10 sm:order-2 sm:col-span-6">
                <h3 className="group/link text-rpd-text dark:text-rp-text inline-flex items-baseline text-base font-medium">
                  {edu.title}
                </h3>

                <p className="text-rpd-foam dark:text-rp-foam mt-2 text-sm leading-tight">
                  {edu.degree}
                </p>

                <p className="text-rpd-iris dark:text-rp-iris mt-2 text-xs">
                  {edu.awards}
                </p>

                {/*
                <ScrollArea className="mt-2 w-96 whitespace-nowrap rounded-md border">
                  <p className="py-2 text-xs leading-tight">{edu.classes}</p>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
                */}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
