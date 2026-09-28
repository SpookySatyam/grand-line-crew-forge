import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Skull, Users, Map, Swords, Compass, LogOut, LogIn, UserPlus, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

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
    <header className="bg-deepBrown/95 backdrop-blur-md text-parchment border-b-2 border-gold/40 shadow-xl relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand / Title */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
          <motion.div 
            whileHover={{ rotate: 12, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="text-pirateRed flex-shrink-0"
          >
            <Skull className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
          </motion.div>
          <span className="font-pirate text-2xl sm:text-3xl tracking-[0.14em] text-gold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-nowrap select-none leading-none pt-0.5">
            GRAND LINE FORGE
          </span>
        </Link>
        
        {/* Desktop / Tablet Navigation Links */}
        {user && (
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-4 font-display uppercase tracking-[0.12em]">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`relative flex items-center gap-1.5 lg:gap-2 px-2.5 py-1.5 rounded transition-all duration-200 whitespace-nowrap text-xs lg:text-sm group ${
                    isActive 
                      ? 'text-gold font-bold bg-gold/10 shadow-[inset_0_0_10px_rgba(200,155,60,0.15)]' 
                      : 'text-parchment/75 hover:text-gold hover:bg-gold/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? 'text-gold' : 'text-parchment/60 group-hover:text-gold'}`} />
                  <span>{item.label}</span>
                  
                  {/* Subtle, non-overflowing active indicator */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gold shadow-[0_0_8px_rgba(200,155,60,0.8)] rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Desktop / Tablet User Actions */}
        <div className="hidden md:flex items-center gap-3 lg:gap-5 font-display text-xs lg:text-sm tracking-[0.12em] uppercase flex-shrink-0">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-gold/90 truncate max-w-[130px] lg:max-w-[180px] hidden md:inline-block" title={user.name}>
                Captain {user.name}
              </span>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-pirateRed/40 bg-pirateRed/15 text-pirateRed hover:bg-pirateRed hover:text-white transition-all duration-200 whitespace-nowrap"
                title="Log out of your voyage"
              >
                <LogOut className="w-4 h-4 flex-shrink-0" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 lg:gap-3">
              <Link 
                to="/login" 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-parchment/80 hover:text-gold hover:bg-gold/10 transition-colors whitespace-nowrap"
              >
                <LogIn className="w-4 h-4 flex-shrink-0" />
                <span>Login</span>
              </Link>
              <Link 
                to="/signup" 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-pirateRed/90 hover:bg-pirateRed text-white font-semibold transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
              >
                <UserPlus className="w-4 h-4 flex-shrink-0" />
                <span>Forge Crew</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {user && (
            <span className="text-gold/90 text-xs font-display tracking-wider truncate max-w-[110px]">
              {user.name}
            </span>
          )}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 rounded border border-gold/30 text-gold hover:bg-gold/10 transition-colors flex items-center justify-center"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-6 h-6 flex-shrink-0" /> : <Menu className="w-6 h-6 flex-shrink-0" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gold/20 bg-deepBrown/98 px-4 py-4 space-y-3 shadow-2xl overflow-hidden"
          >
            {user && (
              <nav className="flex flex-col space-y-1 font-display text-sm tracking-[0.15em] uppercase">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded transition-colors ${
                        isActive
                          ? 'bg-gold/15 text-gold font-bold border-l-4 border-gold'
                          : 'text-parchment/80 hover:text-gold hover:bg-gold/5'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            )}

            <div className="pt-2 border-t border-gold/20 flex flex-col gap-2 font-display text-sm tracking-widest uppercase">
              {user ? (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded border border-pirateRed/40 bg-pirateRed/20 text-pirateRed hover:bg-pirateRed hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4 flex-shrink-0" />
                  <span>Logout</span>
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded border border-gold/30 text-parchment hover:text-gold hover:bg-gold/10 transition-colors"
                  >
                    <LogIn className="w-4 h-4 flex-shrink-0" />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded bg-pirateRed text-white hover:bg-red-700 transition-colors shadow-md"
                  >
                    <UserPlus className="w-4 h-4 flex-shrink-0" />
                    <span>Forge Crew</span>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
