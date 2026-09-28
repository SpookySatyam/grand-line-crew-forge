import { useState } from 'react';
import { motion } from 'framer-motion';
import { groupAssets } from '../lib/characters';
import TeamBountyPoster from './team/TeamBountyPoster';
import TeamMemberCard from './team/TeamMemberCard';
import TeamSynergyMeter from './team/TeamSynergyMeter';

export default function TeamReveal({ crew }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden rounded-xl border-4 border-gold shadow-2xl group cursor-pointer h-full min-h-[400px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TeamBountyPoster 
        teamName={crew.name}
        bgImage={isHovered ? groupAssets.secondary.image : groupAssets.primary.image}
        isHovered={isHovered}
      />

      <div className="relative z-10 p-6 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-4 border-b-2 border-gold/50 pb-4">
          <h3 className="text-4xl lg:text-5xl font-display text-gold drop-shadow-lg">{crew.name}</h3>
          <TeamSynergyMeter score={crew.balanceScore} />
        </div>

        <div className="space-y-3 mt-auto">
          {crew.members.map((m, idx) => (
            <TeamMemberCard key={m.id} member={m} index={idx} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
