import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { characters } from '../../lib/characters';

export default function EditRecruitModal({ isOpen, onClose, recruit }) {
  const { updateParticipant } = useStore();
  const [formData, setFormData] = useState({
    name: recruit?.name || '',
    skills: recruit?.skills?.join(', ') || '',
    interests: recruit?.interests?.join(', ') || '',
    roleKey: recruit?.roleKey || 'captain'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.roleKey) return;
    
    try {
      await updateParticipant(recruit._id, {
        name: formData.name,
        roleKey: formData.roleKey,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        interests: formData.interests.split(',').map(s => s.trim()).filter(Boolean)
      });
      onClose();
    } catch (err) {
      alert(err.message || 'Failed to update recruit');
    }
  };

  if (!isOpen || !recruit) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-darkBrown border-2 border-gold/50 rounded-2xl p-8 max-w-lg w-full relative shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-parchment/60 hover:text-gold transition-colors"
          >
            <X size={24} />
          </button>
          
          <h2 className="text-3xl font-display text-gold mb-6 border-b border-gold/20 pb-4">Update Recruit Info</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-parchment/60 mb-2 font-sans font-bold">Recruit Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-black/50 border border-gold/30 rounded-lg p-3 text-parchment focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-parchment/60 mb-2 font-sans font-bold">Role</label>
              <select 
                value={formData.roleKey}
                onChange={e => setFormData({...formData, roleKey: e.target.value})}
                className="w-full bg-black/50 border border-gold/30 rounded-lg p-3 text-parchment focus:border-gold focus:outline-none"
              >
                {Object.keys(characters).map(key => (
                  <option key={key} value={key}>{characters[key].role}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-parchment/60 mb-2 font-sans font-bold">Skills (comma separated)</label>
              <input 
                type="text" 
                value={formData.skills}
                onChange={e => setFormData({...formData, skills: e.target.value})}
                className="w-full bg-black/50 border border-gold/30 rounded-lg p-3 text-parchment focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-parchment/60 mb-2 font-sans font-bold">Interests (comma separated)</label>
              <input 
                type="text" 
                value={formData.interests}
                onChange={e => setFormData({...formData, interests: e.target.value})}
                className="w-full bg-black/50 border border-gold/30 rounded-lg p-3 text-parchment focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-pirateRed to-red-900 border border-gold text-parchment font-display tracking-[0.2em] text-xl rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(186,12,12,0.6)] transition-all transform hover:-translate-y-1 mt-4"
            >
              SAVE CHANGES
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
