import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Skull, Users, Map, Swords, Compass, LogOut, LogIn, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/recruit', label: 'RECRUITS', icon: Users },
    { path: '/dashboard', label: 'GRAND LINE', icon: Map },
    { path: '/formation', label: 'CREWS', icon: Swords },
    { path: '/challenge', label: 'CHALLENGES', icon: Compass },
  ];

  return (
    <header className="bg-deepBrown/90 backdrop-blur-md text-parchment p-4 border-b-2 border-gold/40 shadow-xl relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-4 group">
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="text-pirateRed"
          >
            <Skull className="w-8 h-8" />
          </motion.div>
          <span className="font-pirate text-3xl tracking-widest text-gold drop-shadow-md">
            GRAND LINE FORGE
          </span>
        </Link>
        
        <nav className="flex flex-wrap justify-center items-center gap-6 font-display text-xs md:text-sm tracking-[0.15em] uppercase">
          {user && user.emailVerification && navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className="relative group flex items-center gap-2"
              >
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-gold' : 'text-parchment/60 group-hover:text-gold/80'}`} />
                <span className={`transition-colors ${isActive ? 'text-gold font-bold' : 'text-parchment/80 group-hover:text-gold/80'}`}>
                  {item.label}
                </span>
                
                {/* Active Indicator */}
                {isActive && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute -bottom-6 left-0 right-0 h-1 bg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 font-display text-sm tracking-widest uppercase">
          {user ? (
            <>
              <span className="text-gold/80 hidden sm:inline-block">Captain {user.name}</span>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-pirateRed hover:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline-block">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center gap-2 text-parchment/80 hover:text-gold transition-colors">
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
              <Link to="/signup" className="flex items-center gap-2 text-pirateRed hover:text-red-400 transition-colors">
                <UserPlus className="w-4 h-4" />
                <span>Forge Crew</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
