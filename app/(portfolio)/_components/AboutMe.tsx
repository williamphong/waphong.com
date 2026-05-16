import { ArrowIcon } from './ArrowIcon';

export const AboutMe = () => {
  return (
    <div className="text-base tracking-normal">
      <p className="mb-4">
        My first interaction with a computer was my dad's ThinkPad when I was
        five years old. Playing games on the Lego and Disney websites didn’t
        just entertain me — it sparked my interest in the possibilities of
        software and technology.
      </p>
      <p className="mb-4">
        That curiosity grew into a passion for developing technology that has a
        material impact on people's lives. In middle school, I developed a
        mobile app to assist dyslexic students, working with a local learning
        center. During my undergrad, I contributed to a VR Earth Orbit project
        that transformed published research into an interactive teaching tool
        for astronomical concepts to students. I've recently completed an
        internship at a biotech startup, applying machine learning to accelerate
        drug discovery.
      </p>
      <p className="mb-4">
        Seventeen years later, I’ve turned that early spark into a career path.
        I am now pursuing my M.S. at SDSU, focusing on machine learning and
        artificial intelligence. I am currently a Graduate Research Assistant
        with the SDSU Climate Informatics Lab, working on the iCharm interface.
        I am also responsible for a research project with Dr. Jianshu Liu on
        agentic digital twin systems, which has just obtained funding from the
        SDSU Division of Research and Innovation.
      </p>
      <p className="mb-4">
        In my free time, I enjoy listening to{' '}
        <a
          className="link--color hover:underline-4 font-medium"
          href="https://open.spotify.com/user/william.phong"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="spotify"
        >
          music
        </a>
        , taking{' '}
        <a
          className="link--color hover:underline-4 font-medium"
          href="/gallery"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="gallery"
        >
          {' '}
          pictures
        </a>{' '}
        with my film camera, and watching{' '}
        <a
          className="link--color hover:underline-4 font-medium"
          href="https://letterboxd.com/andjuly/"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="letterboxd"
        >
          movies
        </a>
        .
      </p>
      <br></br>
      <p className="mb-4">
        <a
          className="group/link"
          href="/files/resume.pdf"
          rel="noreferrer noopener"
          aria-label="resume"
        >
          <span className="link--color hover:underline-4 inline-block font-medium">
            View my full resume here
            <ArrowIcon
              variant="up-right"
              className="translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1"
            />{' '}
          </span>
        </a>
      </p>
    </div>
  );
};
