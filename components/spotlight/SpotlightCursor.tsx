'use client';
import { HTMLAttributes } from 'react';
import useSpotlightEffect from '@/components/spotlight/use-spotlight';

// Define an interface for the spotlight configuration
interface SpotlightConfig {
  radius?: number;
  brightness?: number;
  color?: string;
  smoothing?: number;
  pulse?: number;
}

// Combine props with potential HTML canvas attributes
interface SpotlightCursorProps extends HTMLAttributes<HTMLCanvasElement> {
  config?: SpotlightConfig;
}

const SpotlightCursor = ({
  config = {},
  className,
  ...rest
}: SpotlightCursorProps) => {
  const {
    radius = 200,
    brightness = 0.15,
    color = '255, 255, 255',
    smoothing = 0.3,
  } = config;

  const spotlightConfig = {
    spotlightSize: radius,
    spotlightIntensity: brightness,
    glowColor: color,
    fadeSpeed: smoothing,
  };

  const canvasRef = useSpotlightEffect(spotlightConfig);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed left-0 top-0 z-[9999] h-full w-full ${className}`}
      {...rest}
    />
  );
};

export default SpotlightCursor;
