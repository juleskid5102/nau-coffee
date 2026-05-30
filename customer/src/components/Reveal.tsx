import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  duration?: number;
  distance?: number;
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.8,
  distance = 40,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Set initial state
    const initialState: gsap.TweenVars = { opacity: 0 };
    switch (direction) {
      case 'up': initialState.y = distance; break;
      case 'left': initialState.x = distance; break;
      case 'right': initialState.x = -distance; break;
    }
    gsap.set(el, initialState);

    // Animate to visible on scroll
    gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        once: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [delay, direction, duration, distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
