import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { useRouter } from '../../context/RouterContext';

export function HeroSection() {
  const { navigate } = useRouter();
  const [bgLoaded, setBgLoaded] = useState(true);

  const handleScrollToNext = () => {
    const nextSection = document.getElementById('who-we-are');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestSample = () => {
    const partnerSection = document.getElementById('partner-section');
    if (partnerSection) {
      partnerSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/partner-with-us');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#102A43] text-white overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24">
      {/* Background Cinematic Visual Imagery */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0B1D2E] via-[#102A43] to-[#17362A]">
        {bgLoaded && (
          <motion.img
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1.02, opacity: 0.3 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            src="/images/hero_sacred_soil_banana_1795779859978.jpg"
            alt="Natural agricultural landscape and banana groves"
            referrerPolicy="no-referrer"
            onError={() => setBgLoaded(false)}
            className="w-full h-full object-cover object-center mix-blend-luminosity"
          />
        )}
        {/* Editorial Gradients & Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#102A43] via-[#102A43]/78 to-[#102A43]/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#102A43]/45 to-[#102A43]" />
      </div>

      {/* Hero Content Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7 sm:space-y-8"
      >
        {/* Official Company Logo Only */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-2xl bg-[#FAF7F0] p-3 shadow-2xl ring-1 ring-[#B89B5E]/45 flex items-center justify-center">
            <img
              src="/favicon.svg"
              alt="Official company logo"
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* Main Display Heading & Subtitle */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h1 className="font-serif text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[64px] font-normal tracking-tight leading-[1.1] text-[#FAF7F0] text-balance">
            From Sacred Soil to the World.
          </h1>
          <p className="font-serif text-lg sm:text-2xl md:text-3xl font-light text-[#B89B5E] tracking-wide italic">
            (From Nature to Possibility)
          </p>
        </motion.div>

        {/* Sanskrit Quote & Translation Banner */}
        <motion.div
          variants={itemVariants}
          className="max-w-2xl mx-auto py-4 px-5 sm:px-7 rounded-2xl bg-white/[0.04] border border-[#B89B5E]/30 backdrop-blur-md space-y-1.5 shadow-xl"
        >
          <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#FAF7F0] tracking-wide">
            “Janani Janmabhoomischa Swargadapi Gariyasi”
          </p>
          <p className="text-xs sm:text-sm md:text-base text-[#FAF7F0]/80 font-light tracking-wide">
            Mother and Motherland are greater than heaven.
          </p>
        </motion.div>

        {/* Story Paragraphs */}
        <motion.div variants={itemVariants} className="space-y-3.5 max-w-3xl mx-auto text-center">
          <p className="text-base sm:text-lg md:text-xl font-normal text-[#FAF7F0] leading-relaxed">
            We believe food is sacred—a gift of nature and the foundation of life.
          </p>

          <p className="text-sm sm:text-base md:text-lg font-light text-[#FAF7F0]/85 leading-relaxed">
            At BhuviQ Nyra, we bring together the wisdom of traditional farming and the precision of modern technology to transform traditionally grown bananas into high-quality powders while preserving their natural goodness.
          </p>

          <p className="text-sm sm:text-base md:text-lg font-light text-[#FAF7F0]/85 leading-relaxed">
            Our ingredients are developed for food, cosmetic, and pharmaceutical applications, meeting the evolving needs of industries worldwide.
          </p>
        </motion.div>

        {/* Three Core Statements */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-3.5 max-w-3xl mx-auto pt-1">
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-4 rounded-xl bg-white/[0.05] border border-white/10 hover:border-[#B89B5E]/40 transition-colors backdrop-blur-sm flex items-center justify-center text-center"
          >
            <p className="text-sm sm:text-base font-medium text-[#FAF7F0]">
              Tradition gives us authenticity.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-4 rounded-xl bg-white/[0.05] border border-white/10 hover:border-[#B89B5E]/40 transition-colors backdrop-blur-sm flex items-center justify-center text-center"
          >
            <p className="text-sm sm:text-base font-medium text-[#FAF7F0]">
              Technology gives us precision.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-4 rounded-xl bg-[#B89B5E]/10 border border-[#B89B5E]/40 hover:border-[#B89B5E]/60 transition-colors backdrop-blur-sm flex items-center justify-center text-center"
          >
            <p className="text-sm sm:text-base font-medium text-[#FAF7F0]">
              Together, we bring the goodness of our land to the world.
            </p>
          </motion.div>
        </motion.div>

        {/* Action CTAs */}
        <motion.div variants={itemVariants} className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
          <Button
            href="/ingredients"
            variant="gold"
            size="lg"
            showArrow
            className="w-full sm:w-auto px-5 sm:px-7 py-3.5 text-sm sm:text-base shadow-lg"
          >
            Explore Banana-Based Ingredients
          </Button>

          <Button
            onClick={handleRequestSample}
            variant="outline-light"
            size="lg"
            className="w-full sm:w-auto px-5 sm:px-7 py-3.5 text-sm sm:text-base"
          >
            Request a Sample
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        onClick={handleScrollToNext}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-xs uppercase tracking-[0.2em] text-[#FAF7F0]/60 hover:text-[#B89B5E] transition-colors focus:outline-none cursor-pointer group"
        aria-label="Scroll down to explore who we are"
      >
        <span className="text-[10px] font-medium tracking-widest">Scroll to explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce group-hover:text-[#B89B5E]" />
      </motion.button>
    </section>
  );
}
