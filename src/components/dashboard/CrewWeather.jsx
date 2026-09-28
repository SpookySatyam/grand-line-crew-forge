import React from 'react';
import { motion } from 'framer-motion';

export default function CrewWeather({ stats }) {
  const { totalRecruits = 0, totalCrews = 0, totalChallenges = 0 } = stats || {};

  let weatherStatus = { title: "CALM SEAS", desc: "No recruits gathered yet.", icon: "🌤️", color: "text-blue-300" };

  if (totalRecruits > 0 && totalCrews === 0) {
    weatherStatus = { title: "RISING TIDE", desc: "Recruits await crew assembly.", icon: "🌊", color: "text-blue-400" };
  } else if (totalCrews > 0 && totalChallenges === 0) {
    weatherStatus = { title: "STORM BREWING", desc: "Crews ready. Challenges needed.", icon: "🌩️", color: "text-yellow-400" };
  } else if (totalCrews > 0 && totalChallenges > 0) {
    weatherStatus = { title: "FULL SAIL", desc: "Active missions underway.", icon: "⛵", color: "text-green-400" };
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-black/40 backdrop-blur-md p-6 rounded-xl border border-gold/20 flex items-center gap-4 relative overflow-hidden group hover:border-gold/50 transition-colors"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className={`text-4xl ${weatherStatus.color} drop-shadow-md`}>
        {weatherStatus.icon}
      </div>
      <div>
        <h4 className="text-[10px] uppercase tracking-[0.2em] text-parchment/60 font-sans mb-1">Grand Line Conditions</h4>
        <div className={`text-xl font-display tracking-widest ${weatherStatus.color} drop-shadow-sm`}>
          {weatherStatus.title}
        </div>
        <p className="text-sm text-parchment/70 font-sans mt-1">{weatherStatus.desc}</p>
      </div>
    </motion.div>
  );
}
