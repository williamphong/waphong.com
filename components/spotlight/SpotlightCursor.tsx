'use client';
import { HTMLAttributes } from 'react';
import { useTheme } from 'next-themes';
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

const DEFAULT_CONFIG: SpotlightConfig = {};

const SpotlightCursor = ({
  config = DEFAULT_CONFIG,
  className,
  ...rest
}: SpotlightCursorProps) => {
  // A white glow over the light theme lifts the text more than the page and
  // pushes body copy below 4.5:1 wherever the cursor is. Glow in the text
  // colour instead, which only darkens the background slightly.
  const { resolvedTheme } = useTheme();
  const themeGlow = resolvedTheme === 'light' ? '87, 82, 121' : '255, 255, 255';

  const {
    radius = 200,
    brightness = 0.15,
    color = themeGlow,
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
      className={`pointer-events-none fixed top-0 left-0 z-[9999] h-full w-full ${className}`}
      {...rest}
    />
  );
};

export default SpotlightCursor;
