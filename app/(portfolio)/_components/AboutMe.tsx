import { ArrowIcon } from './ArrowIcon';

export const AboutMe = () => {
  return (
    <div className="text-base tracking-normal">
      <p className="mb-4">
        My first interaction with a computer was my dad’s ThinkPad when I was
        five years old. Playing games on the Lego and Disney websites didn’t
        just entertain me, it sparked my interest in the possibilities of
        software and technology.
      </p>
      <p className="mb-4">
        That curiosity grew into a passion for developing technology that has a
        material impact on people’s lives. In middle school, I developed a
        mobile app to assist dyslexic students, working with a local learning
        center. During my undergrad, I contributed to a VR Earth Orbit project
        that transformed published research into an interactive teaching tool
        for astronomical concepts to students. I’m currently a machine learning
        intern at Sesh, working on immuno-oncology models, after a summer at a
        biotech startup applying machine learning to accelerate drug discovery.
      </p>
      <p className="mb-4">
        Seventeen years later, I’ve turned that early spark into a career path.
        I am now pursuing my M.S. at SDSU, focusing on machine learning and
        artificial intelligence. I am currently a Graduate Research Assistant
        with the SDSU Climate Informatics Lab, working on the iCHARM interface.
        I also research agentic digital twin systems, where I am first author on
        PromptCARLA, a prompt-to-config agent for traffic simulation accepted to
        IMNS’26.
      </p>
      <p className="mb-4">
        In my free time, I enjoy listening to{' '}
        <a
          className="link--color hover:underline-4 font-medium"
          href="https://open.spotify.com/user/william.phong"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="music on Spotify"
        >
          music
        </a>
        , taking{' '}
        <a
          className="link--color hover:underline-4 font-medium"
          href="/gallery"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="pictures in my gallery"
        >
          pictures
        </a>{' '}
        with my film camera, and watching{' '}
        <a
          className="link--color hover:underline-4 font-medium"
          href="https://letterboxd.com/andjuly/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="movies on Letterboxd"
        >
          movies
        </a>
        .
      </p>
      <br></br>
      <p className="mb-4">
        {/* A plain anchor, not next/link: the router prefetched the PDF as if
            it were a route on every desktop visit and then discarded it. */}
        <a
          className="group/link"
          href="/files/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="link--color hover:underline-4 inline-block font-medium">
            View my full resume here
            <span className="sr-only"> (PDF, opens in a new tab)</span>
            <ArrowIcon
              variant="up-right"
              className="translate-y-px transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 group-focus-visible/link:translate-x-1 group-focus-visible/link:-translate-y-1"
            />{' '}
          </span>
        </a>
      </p>
    </div>
  );
};
