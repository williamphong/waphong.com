import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronsUpDown } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export const education = [
  {
    title: 'San Diego State University',
    date: 'Present',
    degree: 'M.S. in Computer Science',
    awards: [''],
    classes: '',
  },
  {
    title: 'California State University, San Marcos',
    date: 'Aug 2024',
    degree: 'B.Sc. in Computer Science',
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
            <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
              <div className="dark:lg:group-hover:bg-rp-surface/75 lg:group-hover:bg-rpd-surface/75 absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
              <header className="dark:text-rp-gold text-rpd-gold z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide sm:col-span-2">
                {edu.date}
              </header>

              <div className="z-10 sm:order-2 sm:col-span-6">
                <h3 className="group/link text-rpd-text dark:text-rp-text hover:text-rpd-foam focus-visible:text-rpd-foam inline-flex items-baseline text-base font-medium leading-tight">
                  {edu.title}
                </h3>

                <p className="dark:text-rp-foam text-rpd-foam mt-2 text-sm leading-tight">
                  {edu.degree}
                </p>

                <p className="dark:text-rp-iris text-rpd-iris mt-2 text-xs leading-tight">
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
