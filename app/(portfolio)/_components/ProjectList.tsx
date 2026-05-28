import { ProjectImage } from './ProjectImage';
import { ArrowIcon } from './ArrowIcon';
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
        {projects.map((project) => (
          <li key={project.title} className="mb-12">
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
                    <ArrowIcon
                      variant="up-right"
                      className="translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1"
                    />
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
