import { Button } from '@/components/ui/button';

export const experienceData = [
  {
    title: 'Data Science Intern',
    company: 'Tensor Therapeutics',
    location: 'San Diego, CA',
    description: 'in progress',
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

export const ExperienceList = () => {
  return (
    <div>
      <ol>
        {experienceData.map((exp, index) => (
          <li key={index} className="mb-12">
            <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
              <div className="dark:lg:group-hover:bg-rp-surface/75 lg:group-hover:bg-rpd-surface/75 absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
              <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide sm:col-span-2">
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
                <h3 className="group/link text-rpd-text dark:text-rp-text hover:text-rpd-foam focus-visible:text-rpd-foam inline-flex items-baseline text-base font-medium leading-tight">
                  {exp.title} · {exp.company}
                </h3>

                <p className="mt-2 text-sm leading-tight">{exp.description}</p>
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
    </div>
  );
};
