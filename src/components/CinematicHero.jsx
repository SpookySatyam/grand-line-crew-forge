import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CinematicHero() {
  const [phase, setPhase] = useState('playing'); // playing, transitioning, revealing, active
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);
  
  const bgImage = "/assets/one-piece/12-cinematic-background.jpg";
  const videoSrc = "/assets/one-piece/hero-cinematic.mp4";

  useEffect(() => {
    // 0.0s - 1.0s: Playing
    const transitionTimer = setTimeout(() => {
      setPhase('transitioning'); // 1.0s: Overlay and blur begins
    }, 1000);

    const revealTimer = setTimeout(() => {
      setPhase('revealing'); // 1.5s: Text starts appearing
    }, 1500);

    const activeTimer = setTimeout(() => {
      setPhase('active'); // 2.5s: Fully interactive
    }, 2500);

    return () => {
      clearTimeout(transitionTimer);
      clearTimeout(revealTimer);
      clearTimeout(activeTimer);
    };
  }, []);

  const handleVideoError = () => {
    setVideoError(true);
  };

  // Animation variants
  const backgroundVariants = {
    playing: { filter: 'blur(0px)', scale: 1.05, transition: { duration: 2, ease: 'linear' } },
    transitioning: { filter: 'blur(4px)', scale: 1.02, transition: { duration: 0.5, ease: 'easeInOut' } },
    revealing: { filter: 'blur(8px)', scale: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
    active: { filter: 'blur(8px)', scale: 1 }
  };

  const overlayVariants = {
    playing: { opacity: 0 },
    transitioning: { opacity: 0.3, transition: { duration: 0.5 } },
    revealing: { opacity: 0.6, transition: { duration: 0.5 } },
    active: { opacity: 0.6 }
  };

  const showContent = phase === 'revealing' || phase === 'active';

  return (
    <div className="relative w-full h-[calc(100vh-80px)] overflow-hidden flex flex-col items-center justify-center -mt-8 bg-black">
      {/* Background Layer: Video or Fallback Image */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-0 origin-center"
        variants={backgroundVariants}
        initial="playing"
        animate={phase}
      >
        {!videoError ? (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            playsInline
            onError={handleVideoError}
            poster={bgImage}
            className="object-cover w-full h-full"
          />
        ) : (
          <img 
            src={bgImage} 
            alt="Grand Line Cinematic" 
            className="object-cover w-full h-full"
          />
        )}
      </motion.div>

      {/* Overlay Layer */}
      <motion.div 
        className="absolute inset-0 z-10 bg-black pointer-events-none"
        variants={overlayVariants}
        initial="playing"
        animate={phase}
      />

      {/* Content Layer */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full max-w-5xl mx-auto h-full pointer-events-auto">
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center w-full"
            >
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-gold tracking-[0.3em] uppercase font-bold text-sm md:text-base mb-6 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
              >
                Grand Line Crew Forge
              </motion.p>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl md:text-7xl lg:text-8xl text-white font-pirate mb-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] leading-tight"
              >
                BUILD YOUR CREW.<br/>CONQUER THE GRAND LINE.
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-lg md:text-2xl text-gray-200 mb-12 max-w-2xl drop-shadow-md font-sans"
              >
                Match skills, interests and preferred roles to build a balanced crew.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6"
              >
                <Link to="/recruit" className="btn-primary text-xl px-10 py-4 drop-shadow-lg">
                  JOIN THE CREW
                </Link>
                <Link to="/dashboard" className="px-10 py-4 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-gold border border-gold/50 rounded shadow-lg font-pirate transition-all duration-300 transform hover:scale-105 text-xl">
                  EXPLORE THE GRAND LINE
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
