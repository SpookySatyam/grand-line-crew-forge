import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function QuickActions() {
  const actions = [
    { label: '+ ADD RECRUIT', path: '/recruit', color: 'border-blue-500/30 hover:border-blue-500', text: 'text-blue-400' },
    { label: '⚓ ASSEMBLE CREW', path: '/formation', color: 'border-gold/30 hover:border-gold', text: 'text-gold' },
    { label: '⚔ EXPLORE CHALLENGES', path: '/challenges', color: 'border-pirateRed/30 hover:border-pirateRed', text: 'text-pirateRed' }
  ];

  return (
    <div className="flex flex-wrap gap-4 mt-6">
      {actions.map((action, idx) => (
        <motion.div key={action.path} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * idx }}>
          <Link 
            to={action.path}
            className={`px-6 py-3 bg-black/60 backdrop-blur-sm border rounded-lg shadow-lg font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:bg-black/80 ${action.color} ${action.text}`}
          >
            {action.label}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
