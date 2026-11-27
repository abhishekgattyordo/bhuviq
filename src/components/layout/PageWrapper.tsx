import React, { ReactNode, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { SpecSheetModal } from '../ui/SpecSheetModal';
import { ScrollProgressBar } from '../ui/MotionComponents';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from '../../context/RouterContext';

interface PageWrapperProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function PageWrapper({
  children,
  title = "BhuviQ Nyra International | Natural Ingredients",
  description = "Transforming agricultural resources into high-quality ingredients for food, nutrition, wellness and beyond."
}: PageWrapperProps) {
  const { currentPath } = useRouter();

  useEffect(() => {
    document.title = title.includes('BhuviQ Nyra') ? title : `${title} | BhuviQ Nyra International`;
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [title, description, currentPath]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EA] text-[#17202A] selection:bg-[#B89B5E]/30 selection:text-[#102A43]">
      <ScrollProgressBar />
      <Header />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <SpecSheetModal />
    </div>
  );
}
