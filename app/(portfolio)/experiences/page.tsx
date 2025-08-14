import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

import { Button } from '@/components/ui/button';
import { experienceData } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Experiences',
};

export default function Experience() {
  return (
    <div className="">
      <ol>
        {experienceData.map((exp, index) => (
          <li key={index} className="mb-12">
            <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:group-hover/list:opacity-50 lg:hover:!opacity-100">
              <div className="dark:lg:group-hover:bg-rp-surface/75 lg:group-hover:bg-rpd-surface/75 absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
              <header className="z-10 mt-1 mb-2 text-xs font-semibold tracking-wide uppercase sm:col-span-2">
                <span className="dark:text-rp-gold text-rpd-gold">
                  {exp.date}
                </span>
                <br></br>
                <br></br>
                <span className="dark:text-rp-subtle text-rpd-subtle">
                  {exp.location}
                </span>
              </header>

              <div className="z-10 sm:order-2 sm:col-span-6">
                <h3 className="group/link text-rpd-text dark:text-rp-text inline-flex items-baseline text-base font-medium">
                  {exp.title} · {exp.company}
                </h3>

                <p className="mt-2 text-sm">{exp.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <Button
                      key={skill}
                      variant="outline"
                      size="sm"
                      className="dark:bg-rp-surface bg-rpd-surface dark:text-rp-foam text-rpd-foam pointer-events-none"
                    >
                      {skill}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-12">
        <Link
          href="/"
          className="group/link link--color hover:underline-4 font-medium"
        >
          <button className="group/link link--color hover:underline-4 font-medium">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
}
