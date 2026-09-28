import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardMetrics from '../components/dashboard/DashboardMetrics';
import RecruitCard from '../components/dashboard/RecruitCard';
import GrandLineMap from '../components/dashboard/GrandLineMap';
import QuickActions from '../components/dashboard/QuickActions';
import RoleCoverage from '../components/dashboard/RoleCoverage';
import CrewStatusCard from '../components/dashboard/CrewStatusCard';
import CrewWeather from '../components/dashboard/CrewWeather';
import CrewSynergy from '../components/dashboard/CrewSynergy';

export default function Dashboard() {
  const { participants, fetchRecruits, fetchDashboardStats, dashboardStats, loading } = useStore();

  useEffect(() => {
    fetchRecruits();
    fetchDashboardStats();
  }, [fetchRecruits, fetchDashboardStats]);

  if (loading && !dashboardStats) {
    return <div className="text-gold text-center py-20 font-display text-2xl animate-pulse">Loading Fleet Intel...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 my-8 relative z-10 space-y-8">
      {/* Top Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
        <DashboardHeader />
        <QuickActions />
      </div>

      {/* Command Metrics */}
      <DashboardMetrics totalRecruits={dashboardStats?.totalRecruits || 0} />

      {/* Grand Line Journey Map */}
      <GrandLineMap stats={dashboardStats} />

      {/* Fleet Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 h-64">
          <CrewStatusCard stats={dashboardStats} />
        </div>
        <div className="md:col-span-1 h-64">
          <CrewWeather stats={dashboardStats} />
        </div>
        <div className="md:col-span-1 h-64">
          <CrewSynergy topSkills={dashboardStats?.topSkills} topInterests={dashboardStats?.topInterests} />
        </div>
      </div>

      {/* Role Coverage & Recruits */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
        <div className="lg:col-span-1">
          <RoleCoverage roleCounts={dashboardStats?.roleCounts} />
        </div>
        
        <div className="lg:col-span-3">
          <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-gold/20 h-full">
            <h3 className="text-sm tracking-[0.2em] uppercase text-gold/80 mb-6 font-sans font-bold border-b border-gold/10 pb-2">
              Recruitment Deck
            </h3>
            
            {participants.length === 0 ? (
              <div className="bg-darkBrown/80 backdrop-blur-md p-12 text-center rounded-2xl border border-gold/30 shadow-2xl relative overflow-hidden h-full flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-[url('/assets/one-piece/11-straw-hat-crew-secondary.jpg')] bg-cover bg-center opacity-10" />
                <h2 className="text-3xl text-pirateRed mb-2 font-display relative z-10 drop-shadow-md">The Roster is Empty</h2>
                <p className="text-lg text-parchment/80 mb-6 font-sans relative z-10">Every pirate king started alone. Go find your crew.</p>
                <Link to="/recruit" className="relative z-10 inline-block px-8 py-3 bg-gold/20 border border-gold text-gold rounded hover:bg-gold hover:text-black font-display tracking-widest transition-all">
                  Recruit Now
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {participants.map((p, i) => (
                  <RecruitCard key={p.id} recruit={p} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
