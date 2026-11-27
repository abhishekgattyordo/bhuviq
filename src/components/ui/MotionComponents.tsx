import React, { ReactNode, useEffect, useState, useRef } from 'react';
import { motion, useInView, useScroll, useSpring } from 'motion/react';
import { cn } from '../../lib/utils';

interface FadeInProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 24,
  className = '',
  once = true
}: FadeInProps) {
  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: distance };
      case 'right':
        return { opacity: 0, x: -distance };
      case 'none':
      default:
        return { opacity: 0 };
    }
  };

  const getTarget = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      case 'none':
      default:
        return { opacity: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getTarget()}
      viewport={{ once, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
  once?: boolean;
}

export function StaggerContainer({
  children,
  className = '',
  delayChildren = 0.1,
  staggerChildren = 0.12,
  once = true
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-40px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren,
            staggerChildren
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  distance?: number;
  scale?: boolean;
}

export function StaggerItem({
  children,
  className = '',
  distance = 20,
  scale = false
}: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: distance,
          scale: scale ? 0.96 : 1
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.55,
            ease: [0.21, 0.47, 0.32, 0.98]
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface CountUpProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CountUp({
  value,
  duration = 1.6,
  prefix = '',
  suffix = '',
  className = ''
}: CountUpProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOutProgress * value);
      setDisplayValue(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#B89B5E] via-[#E5C985] to-[#285943] origin-left z-[100] shadow-[0_0_8px_rgba(184,155,94,0.6)]"
      style={{ scaleX }}
    />
  );
}

export function HoverLiftCard({
  children,
  className = '',
  lift = -4
}: {
  children: ReactNode;
  className?: string;
  lift?: number;
}) {
  return (
    <motion.div
      whileHover={{ y: lift, transition: { duration: 0.25, ease: 'easeOut' } }}
      whileTap={{ scale: 0.99 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
