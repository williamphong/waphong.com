'use client';
import type { Transition, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

// Shared Types
export interface IconHandle {
  startAnimation: () => Promise<void> | void;
  stopAnimation: () => Promise<void> | void;
}

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Shared Animation Variants
const baseVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: { duration: 0.4, opacity: { duration: 0.1 } },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: { duration: 0.6, ease: 'linear', opacity: { duration: 0.1 } },
  },
};

const delayedVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    transition: {
      delay: 0.3,
      duration: 0.3,
      opacity: { duration: 0.1, delay: 0.3 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: {
      delay: 0.3,
      duration: 0.3,
      opacity: { duration: 0.1, delay: 0.3 },
    },
  },
};

// AtSignIcon Component
const AtSignIcon = forwardRef<IconHandle, IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start('animate');
        onMouseEnter?.(e);
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start('normal');
        onMouseLeave?.(e);
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.circle
            variants={baseVariants}
            animate={controls}
            cx="12"
            cy="12"
            r="4"
          />
          <motion.path
            variants={delayedVariants}
            animate={controls}
            d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"
          />
        </svg>
      </div>
    );
  }
);
AtSignIcon.displayName = 'AtSignIcon';

// GithubIcon Component
const GithubIcon = forwardRef<IconHandle, IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const bodyControls = useAnimation();
    const tailControls = useAnimation();
    const isControlledRef = useRef(false);

    const tailVariants: Variants = {
      normal: { pathLength: 1, rotate: 0, transition: { duration: 0.3 } },
      draw: { pathLength: [0, 1], rotate: 0, transition: { duration: 0.5 } },
      wag: {
        pathLength: 1,
        rotate: [0, -15, 15, -10, 10, -5, 5],
        transition: { duration: 2.5, ease: 'easeInOut', repeat: Infinity },
      },
    };

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: async () => {
          bodyControls.start('animate');
          await tailControls.start('draw');
          tailControls.start('wag');
        },
        stopAnimation: () => {
          bodyControls.start('normal');
          tailControls.start('normal');
        },
      };
    });

    const handleMouseEnter = useCallback(
      async (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          bodyControls.start('animate');
          await tailControls.start('draw');
          tailControls.start('wag');
        }
        onMouseEnter?.(e);
      },
      [bodyControls, tailControls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          bodyControls.start('normal');
          tailControls.start('normal');
        }
        onMouseLeave?.(e);
      },
      [bodyControls, tailControls, onMouseLeave]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            variants={baseVariants}
            initial="normal"
            animate={bodyControls}
            d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
          />
          <motion.path
            variants={tailVariants}
            initial="normal"
            animate={tailControls}
            d="M9 18c-4.51 2-5-2-7-2"
          />
        </svg>
      </div>
    );
  }
);
GithubIcon.displayName = 'GithubIcon';

// LinkedinIcon Component
const LinkedinIcon = forwardRef<IconHandle, IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const pathControls = useAnimation();
    const rectControls = useAnimation();
    const circleControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => {
          pathControls.start('animate');
          rectControls.start('animate');
          circleControls.start('animate');
        },
        stopAnimation: () => {
          pathControls.start('normal');
          rectControls.start('normal');
          circleControls.start('normal');
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          pathControls.start('animate');
          rectControls.start('animate');
          circleControls.start('animate');
        }
        onMouseEnter?.(e);
      },
      [pathControls, rectControls, circleControls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          pathControls.start('normal');
          rectControls.start('normal');
          circleControls.start('normal');
        }
        onMouseLeave?.(e);
      },
      [pathControls, rectControls, circleControls, onMouseLeave]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <motion.path
            variants={baseVariants}
            initial="normal"
            animate={pathControls}
            d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
          />
          <motion.rect
            variants={baseVariants}
            initial="normal"
            animate={rectControls}
            x="2"
            y="9"
            width="4"
            height="12"
          />
          <motion.circle
            variants={baseVariants}
            initial="normal"
            animate={circleControls}
            cx="4"
            cy="4"
            r="2"
          />
        </svg>
      </div>
    );
  }
);
LinkedinIcon.displayName = 'LinkedinIcon';

// InstagramIcon Component
const InstagramIcon = forwardRef<IconHandle, IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const rectControls = useAnimation();
    const pathControls = useAnimation();
    const lineControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => {
          rectControls.start('animate');
          pathControls.start('animate');
          lineControls.start('animate');
        },
        stopAnimation: () => {
          rectControls.start('normal');
          pathControls.start('normal');
          lineControls.start('normal');
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          rectControls.start('animate');
          pathControls.start('animate');
          lineControls.start('animate');
        }
        onMouseEnter?.(e);
      },
      [rectControls, pathControls, lineControls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          rectControls.start('normal');
          pathControls.start('normal');
          lineControls.start('normal');
        }
        onMouseLeave?.(e);
      },
      [rectControls, pathControls, lineControls, onMouseLeave]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.rect
            variants={baseVariants}
            initial="normal"
            animate={rectControls}
            x="2"
            y="2"
            width="20"
            height="20"
            rx="5"
            ry="5"
          />
          <motion.path
            variants={baseVariants}
            initial="normal"
            animate={pathControls}
            d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
          />
          <motion.line
            variants={baseVariants}
            initial="normal"
            animate={lineControls}
            x1="17.5"
            y1="6.5"
            x2="17.51"
            y2="6.5"
          />
        </svg>
      </div>
    );
  }
);
InstagramIcon.displayName = 'InstagramIcon';

export interface SpotifyIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SpotifyIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const spotifyVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.6,
      ease: 'linear',
      opacity: { duration: 0.1 },
    },
  },
};

const SpotifyIcon = forwardRef<SpotifyIconHandle, SpotifyIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const pathControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => {
          pathControls.start('animate');
        },
        stopAnimation: () => {
          pathControls.start('normal');
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          pathControls.start('animate');
        } else {
          onMouseEnter?.(e);
        }
      },
      [pathControls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          pathControls.start('normal');
        } else {
          onMouseLeave?.(e);
        }
      },
      [pathControls, onMouseLeave]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 167.5 167.5"
          fill="currentColor"
        >
          <motion.path
            variants={spotifyVariants}
            initial="normal"
            animate={pathControls}
            d="M83.7 0C37.5 0 0 37.5 0 83.7c0 46.3 37.5 83.7 83.7 83.7 46.3 0 83.7-37.5 83.7-83.7S130 0 83.7 0zM122 120.8c-1.4 2.5-4.6 3.2-7 1.7-19.8-12-44.5-14.7-73.7-8-2.8.5-5.6-1.2-6.2-4-.2-2.8 1.5-5.6 4-6.2 32-7.3 59.6-4.2 81.6 9.3 2.6 1.5 3.4 4.7 1.8 7.2zM132.5 98c-2 3-6 4-9 2.2-22.5-14-56.8-18-83.4-9.8-3.2 1-7-1-8-4.3s1-7 4.6-8c30.4-9 68.2-4.5 94 11 3 2 4 6 2 9zm1-23.8c-27-16-71.6-17.5-97.4-9.7-4 1.3-8.2-1-9.5-5.2-1.3-4 1-8.5 5.2-9.8 29.6-9 78.8-7.2 109.8 11.2 3.7 2.2 5 7 2.7 10.7-2 3.8-7 5-10.6 2.8z"
          />
        </svg>
      </div>
    );
  }
);

export interface SunMediumIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SunMediumIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const pathVariants: Variants = {
  normal: { opacity: 1 },
  animate: (i: number) => ({
    opacity: [0, 1],
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

const SunMediumIcon = forwardRef<SunMediumIconHandle, SunMediumIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start('animate');
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start('normal');
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          {[
            'M12 3v1',
            'M12 20v1',
            'M3 12h1',
            'M20 12h1',
            'm18.364 5.636-.707.707',
            'm6.343 17.657-.707.707',
            'm5.636 5.636.707.707',
            'm17.657 17.657.707.707',
          ].map((d, index) => (
            <motion.path
              key={d}
              d={d}
              animate={controls}
              variants={pathVariants}
              custom={index + 1}
            />
          ))}
        </svg>
      </div>
    );
  }
);

SunMediumIcon.displayName = 'SunMediumIcon';

export interface MoonIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MoonIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const svgVariants: Variants = {
  normal: {
    rotate: 0,
  },
  animate: {
    rotate: [0, -10, 10, -5, 5, 0],
  },
};

const svgTransition: Transition = {
  duration: 1.2,
  ease: 'easeInOut',
};

const MoonIcon = forwardRef<MoonIconHandle, MoonIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start('animate');
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start('normal');
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave]
    );
    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={svgVariants}
          animate={controls}
          transition={svgTransition}
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </motion.svg>
      </div>
    );
  }
);

MoonIcon.displayName = 'MoonIcon';

export interface SunMoonIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SunMoonIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const sunVariants: Variants = {
  normal: {
    rotate: 0,
  },
  animate: {
    rotate: [0, -5, 5, -2, 2, 0],
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
};

const moonVariants: Variants = {
  normal: { opacity: 1 },
  animate: (i: number) => ({
    opacity: [0, 1],
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

const SunMoonIcon = forwardRef<SunMoonIconHandle, SunMoonIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const sunControls = useAnimation();
    const moonControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => {
          sunControls.start('animate');
          moonControls.start('animate');
        },
        stopAnimation: () => {
          sunControls.start('normal');
          moonControls.start('normal');
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          sunControls.start('animate');
          moonControls.start('animate');
        } else {
          onMouseEnter?.(e);
        }
      },
      [sunControls, moonControls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          sunControls.start('normal');
          moonControls.start('normal');
        } else {
          onMouseLeave?.(e);
        }
      },
      [sunControls, moonControls, onMouseLeave]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.g
            variants={sunVariants}
            animate={sunControls}
            initial="normal"
          >
            <path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" />
          </motion.g>
          {[
            'M12 2v2',
            'M12 20v2',
            'm4.9 4.9 1.4 1.4',
            'm17.7 17.7 1.4 1.4',
            'M2 12h2',
            'M20 12h2',
            'm6.3 17.7-1.4 1.4',
            'm19.1 4.9-1.4 1.4',
          ].map((d, index) => (
            <motion.path
              key={d}
              d={d}
              animate={moonControls}
              variants={moonVariants}
              custom={index + 1}
              initial="normal"
            />
          ))}
        </svg>
      </div>
    );
  }
);

SunMoonIcon.displayName = 'SunMoonIcon';

export {
  AtSignIcon,
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  SpotifyIcon,
  SunMediumIcon,
  MoonIcon,
  SunMoonIcon,
};
