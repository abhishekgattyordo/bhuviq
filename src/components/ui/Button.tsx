import React, { ReactNode, MouseEventHandler } from 'react';
import { ArrowRight, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useRouter } from '../../context/RouterContext';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'gold' | 'outline' | 'outline-light' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  showArrow?: boolean;
  arrowType?: 'right' | 'chevron';
  isLoading?: boolean;
  className?: string;
  icon?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  showArrow = false,
  arrowType = 'right',
  isLoading = false,
  className = '',
  icon,
  onClick,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  const { navigate } = useRouter();

  const baseStyles = "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 rounded-sm cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed group";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-2 space-x-1.5",
    md: "text-sm px-6 py-3 space-x-2",
    lg: "text-base px-8 py-4 space-x-2.5"
  };

  const variantStyles = {
    primary: "bg-[#102A43] text-white hover:bg-[#0B1D2E] active:bg-[#081522] focus:ring-[#102A43] shadow-sm hover:shadow-md",
    secondary: "bg-[#285943] text-white hover:bg-[#1C3F30] active:bg-[#163327] focus:ring-[#285943] shadow-sm hover:shadow-md",
    gold: "bg-[#B89B5E] text-[#102A43] font-semibold hover:bg-[#A88B4E] active:bg-[#977B3E] focus:ring-[#B89B5E] shadow-sm",
    outline: "border border-[#102A43] text-[#102A43] hover:bg-[#102A43] hover:text-white active:bg-[#0B1D2E] focus:ring-[#102A43]",
    'outline-light': "border border-[#F7F3EA]/30 text-[#F7F3EA] hover:bg-[#F7F3EA] hover:text-[#102A43] active:bg-white focus:ring-white",
    ghost: "text-[#102A43] hover:bg-[#102A43]/5 active:bg-[#102A43]/10 focus:ring-[#102A43]",
    link: "text-[#285943] hover:text-[#102A43] underline-offset-4 hover:underline p-0 h-auto font-semibold"
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading) {
      e.preventDefault();
      return;
    }
    if (href) {
      e.preventDefault();
      navigate(href);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      onClick={handleClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {!isLoading && icon && <span className="shrink-0">{icon}</span>}
      <span className="whitespace-nowrap">{children}</span>
      {!isLoading && showArrow && (
        <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-1">
          {arrowType === 'right' ? <ArrowRight className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </span>
      )}
    </button>
  );
}
