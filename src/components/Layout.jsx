import React from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import CinematicCrewBackground from './CinematicCrewBackground';
import Navbar from './Navbar';
import PageTransition from './animation/PageTransition';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative font-sans text-parchment overflow-x-hidden selection:bg-pirateRed/30 selection:text-gold">
      {/* Global Background Layer */}
      <CinematicCrewBackground />

      {/* Global Navigation */}
      <Navbar />

      {/* Main Content Area with Page Transitions */}
      <main className="flex-1 relative z-10 flex flex-col">
        <AnimatePresence mode="wait">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <footer className="bg-deepBrown/95 text-parchment/40 py-4 text-center font-display tracking-[0.2em] text-xs border-t border-gold/20 relative z-50">
        <p>THE NEW ERA OF HACKATHONS &copy; 2026</p>
      </footer>
    </div>
  );
}
