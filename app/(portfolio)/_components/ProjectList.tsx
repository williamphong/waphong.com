import { ProjectImage } from './ProjectImage';
import { Button } from '@/components/ui/button';
import { projectsData } from '@/lib/data';

type ProjectListProps = {
  limit?: number; // optional, defaults to all if not provided
};

export const ProjectList = ({ limit }: ProjectListProps) => {
  const projects = limit ? projectsData.slice(0, limit) : projectsData;

  return (
    <div>
      <ol>
        {projects.map((project, index) => (
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

                <p className="mt-2 text-sm tracking-wide">
                  {project.description}
                </p>

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
};
