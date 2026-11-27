import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: ReactNode;
  variant?: 'navy' | 'green' | 'gold' | 'ivory' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

export function Badge({
  children,
  variant = 'navy',
  size = 'sm',
  className = '',
  dot = false,
}: BadgeProps) {
  const sizeStyles = {
    sm: "text-[11px] font-medium tracking-wider uppercase px-2.5 py-0.5",
    md: "text-xs font-medium tracking-wide px-3 py-1"
  };

  const variantStyles = {
    navy: "bg-[#102A43]/10 text-[#102A43] border border-[#102A43]/20",
    green: "bg-[#285943]/10 text-[#285943] border border-[#285943]/20",
    gold: "bg-[#B89B5E]/15 text-[#8F7236] border border-[#B89B5E]/30 font-semibold",
    ivory: "bg-[#FAF7F0] text-[#102A43] border border-[#102A43]/10 shadow-xs",
    neutral: "bg-gray-100 text-gray-700 border border-gray-200",
    outline: "border border-current bg-transparent"
  };

  const dotColors = {
    navy: "bg-[#102A43]",
    green: "bg-[#285943]",
    gold: "bg-[#B89B5E]",
    ivory: "bg-[#102A43]",
    neutral: "bg-gray-500",
    outline: "bg-current"
  };

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full whitespace-nowrap select-none", sizeStyles[size], variantStyles[variant], className)}>
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])} />}
      <span>{children}</span>
    </span>
  );
}
