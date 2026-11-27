import React, { ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  theme = 'light',
  className = '',
  titleClassName = '',
  subtitleClassName = ''
}: SectionHeadingProps) {
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "space-y-3",
        align === 'center' && "text-center max-w-3xl mx-auto",
        align === 'right' && "text-right ml-auto max-w-3xl",
        align === 'left' && "text-left max-w-3xl",
        className
      )}
    >
      {eyebrow && (
        <div className={cn("flex items-center gap-2.5", align === 'center' ? "justify-center" : align === 'right' ? "justify-end" : "justify-start")}>
          {align === 'center' && (
            <span className={cn("h-[1px] w-6", isDark ? "bg-[#B89B5E]/60" : "bg-[#B89B5E]")} />
          )}
          <span
            className={cn(
              "text-[11px] uppercase tracking-[0.22em] font-semibold",
              isDark ? "text-[#B89B5E]" : "text-[#285943]"
            )}
          >
            {eyebrow}
          </span>
          <span
            className={cn(
              "h-[1px] w-8",
              isDark ? "bg-[#B89B5E]/60" : "bg-[#B89B5E]/70"
            )}
          />
        </div>
      )}

      <h2
        className={cn(
          "font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] font-normal tracking-tight",
          isDark ? "text-[#FAF7F0]" : "text-[#102A43]",
          titleClassName
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "text-base md:text-lg leading-relaxed font-normal pt-1",
            isDark ? "text-[#FAF7F0]/80" : "text-[#667085]",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
