import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface EnquiryPreset {
  enquiryType?: string;
  productInterest?: string;
  intendedApplication?: string;
  requiredQuantity?: string;
}

interface RouterContextType {
  currentPath: string;
  navigate: (path: string, options?: { replace?: boolean; scrollToTop?: boolean }) => void;
  navigateToEnquiry: (preset?: EnquiryPreset) => void;
  enquiryPreset: EnquiryPreset | null;
  clearEnquiryPreset: () => void;
  openSpecSheetModal: () => void;
  closeSpecSheetModal: () => void;
  isSpecSheetModalOpen: boolean;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [isSpecSheetModalOpen, setIsSpecSheetModalOpen] = useState(false);
  const [enquiryPreset, setEnquiryPreset] = useState<EnquiryPreset | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string, options: { replace?: boolean; scrollToTop?: boolean } = { scrollToTop: true }) => {
    if (path.startsWith('#')) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const hashIndex = path.indexOf('#');
    const targetHash = hashIndex !== -1 ? path.slice(hashIndex + 1) : '';

    if (options.replace) {
      window.history.replaceState({}, '', path);
    } else {
      window.history.pushState({}, '', path);
    }

    setCurrentPath(path);

    if (targetHash) {
      setTimeout(() => {
        const element = document.getElementById(targetHash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
    } else if (options.scrollToTop !== false) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToEnquiry = (preset?: EnquiryPreset) => {
    if (preset) {
      setEnquiryPreset(preset);
    }
    const existingSection = document.getElementById('commercial-enquiry');
    if (existingSection) {
      existingSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/partner-with-us#commercial-enquiry');
    }
  };

  const clearEnquiryPreset = () => {
    setEnquiryPreset(null);
  };

  const openSpecSheetModal = () => {
    setIsSpecSheetModalOpen(true);
  };

  const closeSpecSheetModal = () => {
    setIsSpecSheetModalOpen(false);
  };

  return (
    <RouterContext.Provider
      value={{
        currentPath,
        navigate,
        navigateToEnquiry,
        enquiryPreset,
        clearEnquiryPreset,
        openSpecSheetModal,
        closeSpecSheetModal,
        isSpecSheetModalOpen
      }}
    >
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  key?: React.Key;
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  title?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  target?: string;
  rel?: string;
}

export function Link({ href, children, className = '', activeClassName = '', title, onClick, target, rel, ...props }: LinkProps) {
  const { currentPath, navigate } = useRouter();

  const isActive = currentPath === href || (href !== '/' && currentPath.startsWith(href));

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && !target) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <a
      href={href}
      title={title}
      onClick={handleClick}
      target={target}
      rel={rel}
      className={`${className} ${isActive ? activeClassName : ''}`}
      {...props}
    >
      {children}
    </a>
  );
}
