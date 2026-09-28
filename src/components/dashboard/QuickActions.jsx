import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function QuickActions() {
  const row1Actions = [
    { 
      icon: '+', 
      label: 'ADD RECRUIT', 
      path: '/recruit', 
      color: 'border-blue-500/40 hover:border-blue-400', 
      text: 'text-blue-400' 
    },
    { 
      icon: '⚓', 
      label: 'ASSEMBLE CREW', 
      path: '/formation', 
      color: 'border-gold/40 hover:border-gold', 
      text: 'text-gold' 
    },
  ];

  const row2Action = { 
    icon: '⚔', 
    label: 'EXPLORE CHALLENGES', 
    path: '/challenge', 
    color: 'border-pirateRed/40 hover:border-pirateRed', 
    text: 'text-pirateRed' 
  };

  return (
    <div className="w-full lg:w-auto flex flex-col gap-4 lg:gap-5 self-start md:self-end">
      {/* Top row on Desktop (lg+), stacked on Tablet & Mobile (<lg) */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 items-stretch lg:items-center">
        {row1Actions.map((action, idx) => (
          <motion.div 
            key={action.path}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="w-full lg:w-auto"
          >
            <Link 
              to={action.path}
              className={`w-full sm:w-64 lg:w-48 xl:w-52 px-6 py-3.5 bg-black/60 backdrop-blur-sm border rounded-lg shadow-lg font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl hover:bg-black/80 flex items-center justify-center gap-2.5 whitespace-nowrap text-center ${action.color} ${action.text}`}
            >
              <span className="text-sm flex-shrink-0 leading-none">{action.icon}</span>
              <span className="font-semibold">{action.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Second row: EXPLORE CHALLENGES cleanly centered below on Desktop, stacked on Tablet & Mobile */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full flex justify-center"
      >
        <Link 
          to={row2Action.path}
          className={`w-full sm:w-64 lg:w-auto lg:min-w-[220px] px-6 py-3.5 bg-black/60 backdrop-blur-sm border rounded-lg shadow-lg font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl hover:bg-black/80 flex items-center justify-center gap-2.5 whitespace-nowrap text-center ${row2Action.color} ${row2Action.text}`}
        >
          <span className="text-sm flex-shrink-0 leading-none">{row2Action.icon}</span>
          <span className="font-semibold">{row2Action.label}</span>
        </Link>
      </motion.div>
    </div>
  );
}
