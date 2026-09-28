import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skull } from 'lucide-react';

const stages = [
  "RECRUIT DATA RECEIVED...",
  "ANALYZING SKILLS...",
  "MAPPING ROLE DESTINY...",
  "SEARCHING THE GRAND LINE...",
  "RECRUIT ACCEPTED!"
];

export default function SubmissionLoader({ onComplete }) {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    if (stageIndex < stages.length - 1) {
      const timer = setTimeout(() => {
        setStageIndex(prev => prev + 1);
      }, 800); // 800ms per stage
      return () => clearTimeout(timer);
    } else {
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(completeTimer);
    }
  }, [stageIndex, onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="mb-8"
      >
        <Skull className="w-24 h-24 text-pirateRed drop-shadow-[0_0_20px_rgba(186,12,12,0.8)]" />
      </motion.div>
      
      <div className="h-12 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={stageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-2xl md:text-3xl font-display tracking-[0.2em] text-gold"
          >
            {stages[stageIndex]}
          </motion.h2>
        </AnimatePresence>
      </div>
      
      <div className="w-64 h-2 bg-darkBrown mt-8 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-pirateRed"
          initial={{ width: "0%" }}
          animate={{ width: `${((stageIndex + 1) / stages.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
}
