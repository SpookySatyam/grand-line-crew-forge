import { motion, AnimatePresence } from 'framer-motion';
import CharacterSpotlight from './CharacterSpotlight';
import CharacterImage from './CharacterImage';
import CharacterRoleBadge from './CharacterRoleBadge';
import CharacterDialogue from './CharacterDialogue';

export default function CharacterReaction({ characterKey, roleName, message, image, characterName }) {
  return (
    <div className="relative w-full flex flex-col items-center justify-center p-8 bg-darkBrown/90 backdrop-blur-md text-parchment rounded-xl overflow-hidden border-2 border-gold/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
      <CharacterSpotlight />
      
      <AnimatePresence mode="wait">
        {characterKey ? (
          <motion.div
            key={characterKey}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
            className="flex flex-col items-center w-full text-center relative z-10"
          >
            <CharacterRoleBadge roleName={roleName} />
            <CharacterImage image={image} roleName={roleName} />
            
            {characterName && (
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl text-gold font-display mb-1 drop-shadow-lg tracking-wide"
              >
                {characterName}
              </motion.h2>
            )}
            
            <CharacterDialogue message={message} />
          </motion.div>
        ) : (
          <motion.div 
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center opacity-60 flex flex-col items-center justify-center relative z-10"
          >
            <div className="w-24 h-24 border-4 border-gold/20 rounded-full flex items-center justify-center mb-6 animate-pulse bg-black/20">
              <span className="text-gold/40 font-display text-4xl">?</span>
            </div>
            <h2 className="text-3xl font-display mb-3 text-gold/80">Awaiting Role</h2>
            <p className="text-lg font-sans text-parchment/70">Select a pirate role to reveal your destiny...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
