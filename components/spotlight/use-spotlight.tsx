'use client';
import { useEffect, useRef } from 'react';

interface SpotlightEffectConfig {
  spotlightSize?: number;
  spotlightIntensity?: number;
  fadeSpeed?: number;
  glowColor?: string;
}

const useSpotlightEffect = (config: SpotlightEffectConfig = {}) => {
  const {
    spotlightSize = 200,
    spotlightIntensity = 0.15,
    fadeSpeed = 0.1,
    glowColor = '255, 255, 255',
  } = config;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let frame: number | null = null;
    let tracking = false;

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(
        pos.x,
        pos.y,
        0,
        pos.x,
        pos.y,
        spotlightSize
      );
      gradient.addColorStop(0, `rgba(${glowColor}, ${spotlightIntensity})`);
      gradient.addColorStop(1, `rgba(${glowColor}, 0)`);

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, spotlightSize, 0, Math.PI * 2);
      ctx.fill();
    };

    // Park the loop once the spotlight has caught up with the pointer. Left
    // running, it would repaint a full-viewport gradient at 60fps forever.
    const render = () => {
      pos.x = lerp(pos.x, target.x, fadeSpeed);
      pos.y = lerp(pos.y, target.y, fadeSpeed);
      draw();

      if (Math.hypot(target.x - pos.x, target.y - pos.y) < 0.1) {
        pos.x = target.x;
        pos.y = target.y;
        draw();
        frame = null;
        return;
      }

      frame = requestAnimationFrame(render);
    };

    const start = () => {
      if (!tracking || frame !== null || document.hidden) return;
      frame = requestAnimationFrame(render);
    };

    const stop = () => {
      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
    };

    const handleResize = () => {
      // Resizing the canvas clears it, so repaint at the current position.
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (tracking) draw();
    };

    const handleMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!tracking) {
        tracking = true;
        pos.x = e.clientX;
        pos.y = e.clientY;
      }
      start();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stop();
    };
  }, [spotlightSize, spotlightIntensity, fadeSpeed, glowColor]);

  return canvasRef;
};

export default useSpotlightEffect;
