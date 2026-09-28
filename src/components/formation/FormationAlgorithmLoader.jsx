import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass } from 'lucide-react';

const steps = [
  "SCANNING RECRUITS...",
  "ANALYZING SKILL SYNERGIES...",
  "BALANCING PIRATE ROLES...",
  "FORGING DESTINIES..."
];

export default function FormationAlgorithmLoader() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-20 h-64 relative z-10">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        className="mb-8"
      >
        <Compass className="w-24 h-24 text-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
      </motion.div>
      
      <div className="h-12 flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-2xl font-display tracking-widest text-parchment"
          >
            {steps[stepIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-1.5 bg-darkBrown mt-6 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-pirateRed"
          initial={{ width: "0%" }}
          animate={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}
