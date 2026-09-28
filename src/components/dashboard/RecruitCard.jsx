import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { characters } from '../../lib/characters';
import { Edit2, Trash2, AlertTriangle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import EditRecruitModal from './EditRecruitModal';

export default function RecruitCard({ recruit, index }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const { deleteParticipant } = useStore();
  const charData = recruit.roleKey ? characters[recruit.roleKey] : null;

  const handleDelete = async () => {
    try {
      await deleteParticipant(recruit._id);
    } catch (error) {
      alert(error.message || 'Failed to delete recruit');
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, type: 'spring', stiffness: 120 }}
        className="bg-darkBrown/80 backdrop-blur-md p-6 rounded-xl relative group overflow-hidden border border-gold/20 hover:border-gold/60 transition-all hover:shadow-[0_10px_25px_rgba(212,175,55,0.2)]"
      >
        {charData && (
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none">
            <img src={charData.image} alt={recruit.role} className="w-full h-full object-cover mask-image-gradient" style={{ WebkitMaskImage: 'linear-gradient(to left, black, transparent)' }} />
          </div>
        )}

        <div className="absolute top-0 right-0 bg-gradient-to-l from-pirateRed to-red-900 text-parchment font-display px-4 py-1.5 rounded-bl-xl text-sm tracking-wider shadow-md">
          {recruit.role?.toUpperCase() || (charData?.role?.toUpperCase())}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 left-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <button 
            onClick={() => setIsEditOpen(true)}
            className="p-1.5 bg-black/60 rounded text-gold hover:text-white hover:bg-gold/80 transition-colors"
          >
            <Edit2 size={14} />
          </button>
          <button 
            onClick={() => setIsConfirmDeleteOpen(true)}
            className="p-1.5 bg-black/60 rounded text-pirateRed hover:text-white hover:bg-pirateRed/80 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
        
        <div className="relative z-10 mt-6">
          <h3 className="text-3xl text-gold font-display mb-4 pr-16 drop-shadow-md">{recruit.name}</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-parchment/50 font-sans mb-2 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-gold inline-block"/> Abilities
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {recruit.skills.map(s => (
                  <span key={s} className="px-2 py-1 bg-black/50 text-parchment/90 rounded text-xs border border-white/5 font-sans">{s}</span>
                ))}
              </div>
            </div>

            {recruit.interests && recruit.interests.length > 0 && (
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] text-parchment/50 font-sans mb-2 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-blue-400 inline-block"/> Passions
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {recruit.interests.map(i => (
                    <span key={i} className="px-2 py-1 bg-blue-900/30 text-parchment/90 rounded text-xs border border-blue-500/20 font-sans">{i}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Edit Modal */}
      {isEditOpen && (
        <EditRecruitModal 
          isOpen={isEditOpen} 
          onClose={() => setIsEditOpen(false)} 
          recruit={recruit} 
        />
      )}

      {/* Confirm Delete Modal */}
      <AnimatePresence>
        {isConfirmDeleteOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-darkBrown border-2 border-pirateRed/50 rounded-2xl p-6 max-w-sm w-full relative shadow-[0_0_30px_rgba(186,12,12,0.6)] text-center"
            >
              <AlertTriangle className="w-12 h-12 text-pirateRed mx-auto mb-4" />
              <h3 className="text-xl font-display text-gold mb-2">Abandon Recruit?</h3>
              <p className="text-sm text-parchment/80 mb-6 font-sans">
                Are you sure you want to dismiss {recruit.name}? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsConfirmDeleteOpen(false)}
                  className="flex-1 py-2 rounded bg-black/40 text-parchment hover:text-gold hover:bg-black/60 transition-all font-display tracking-widest text-sm"
                >
                  CANCEL
                </button>
                <button 
                  onClick={handleDelete}
                  className="flex-1 py-2 rounded bg-pirateRed text-white hover:bg-red-700 transition-all shadow-md font-display tracking-widest text-sm"
                >
                  DISMISS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
