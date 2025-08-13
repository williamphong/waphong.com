export const ABoutMe = () => {
  return (
    <div>
      <p className="mb-4">
        My first interaction with a computer was my dad's ThinkPad when I was 5
        years old. At the time, playing games on the Lego and Disney websites
        brought me joy and exposed me to a realm of interactive spaces. Fast
        forward 17 years to today, and I've graduated with a degree in CS and
        several projects under my belt.
      </p>
      <p className="mb-4">
        I've always been interested in developing software that has a material
        impact on people's lives. My first project was in middle school
        developing a mobile app assisting dyslexic students. I've recently
        contributed to a VR Earth Orbit project that incorporates published
        research into a demo that assists in explaining astrological concepts to
        students.
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
          className="group/link link--color hover:underline-4 font-medium"
          href="/files/resume.pdf"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="resume"
        >
          <span className="inline-block">
            View my full resume here
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
            </svg>{' '}
          </span>
        </a>
      </p>
    </div>
  );
};
