import React, { useState, useRef } from 'react';
import teamData from '../data/team.json';
import TeamCard from '../components/TeamCard';
import FunkyBackground from '../components/FunkyBackground';
import SplitText from '../components/SplitText';

export default function Team() {
  const [selectedTeam, setSelectedTeam] = useState('The Panel');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const bannerRef = useRef(null);

  const teamDescriptions = {
    'The Panel': 'The leadership driving our vision forward, coordinating initiatives and ensuring seamless club operations.',
    'Event Management Team': 'Creating memorable experiences through flawlessly executed workshops, hackathons, and tech events.',
    'Design Team': 'Crafting visual stories and user experiences that make technology beautiful and accessible.',
    'Technical Team': 'Building innovative solutions and maintaining the technical backbone of all club projects.',
    'Photography & Marketing Team': 'Capturing moments and amplifying our reach through creative content and strategic outreach.',
    'Content Team': 'Telling our story through compelling content across blogs, social media, and publications.'
  };

  const teams = Object.keys(teamData.teams);
  const currentMembers = teamData.teams[selectedTeam] || [];

  const handleTeamChange = (teamName) => {
    if (teamName === selectedTeam) return;
    
    // Start fade out
    setIsTransitioning(true);
    
    // Scroll to banner with offset
    if (bannerRef.current) {
        const y = bannerRef.current.getBoundingClientRect().top + window.scrollY - 150;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
    
    // Wait for fade out, then change team and fade in
    setTimeout(() => {
      setSelectedTeam(teamName);
      setIsTransitioning(false);
    }, 700); 
  };

  const rotations = ['rotate-1', '-rotate-2', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-3'];

  return (
    <div className="min-h-screen pt-40 pb-20 relative overflow-hidden bg-ms-paper dark:bg-black">
      <FunkyBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="max-w-4xl mb-16 mx-auto text-center">
          <div className="inline-block relative">
            <h1 className="text-6xl md:text-8xl font-black font-display text-slate-900 dark:text-white mb-2 tracking-tighter transform -rotate-2">
              <SplitText 
                text="MEET THE SQUAD" 
                className="inline-block"
                delay={50}
              />
            </h1>
            <div className="absolute -bottom-4 right-0 bg-ms-neon text-slate-900 font-bold px-4 py-1 rotate-3 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                EST. 2021
            </div>
          </div>
          
          <p className="text-2xl text-slate-700 dark:text-slate-300 mt-12 font-medium max-w-2xl mx-auto bg-white/80 dark:bg-black/50 backdrop-blur-sm p-6 rounded-2xl border-2 border-slate-900 dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
            The diverse team powering MSTC - from organizing events to building solutions, each member brings unique skills and passion.
          </p>
        </div>

        {/* Main Content with Sidebar and Cards */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation - Funky Style */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-28 bg-white dark:bg-slate-900 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] p-8 border-4 border-slate-900 dark:border-white transform rotate-1">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 font-display uppercase tracking-widest border-b-4 border-slate-900 dark:border-white pb-2">
                DEPARTMENTS
              </h2>
              <nav className="space-y-3">
                {teams.map((teamName) => (
                  <button
                    key={teamName}
                    onClick={() => handleTeamChange(teamName)}
                    className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-300 font-bold text-lg transform border-2 ${
                      selectedTeam === teamName
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-[4px_4px_0px_0px_#00A4EF] border-slate-900 dark:border-white scale-105 -rotate-1'
                        : 'bg-transparent text-slate-600 dark:text-slate-300 border-transparent hover:border-slate-900 dark:hover:border-white hover:bg-ms-blue/10 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1'
                    }`}
                  >
                    {teamName}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Team Members Grid */}
          <div className="flex-1">
            <div ref={bannerRef} className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6 bg-ms-yellow/10 dark:bg-ms-yellow p-8 rounded-[2rem] border-4 border-slate-900 dark:border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#fff] -rotate-1">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-slate-900 font-display uppercase tracking-tighter">
                        {selectedTeam}
                    </h2>
                    <p className="text-slate-900 dark:text-slate-800 mt-2 font-bold text-lg leading-snug max-w-xl">
                        {teamDescriptions[selectedTeam]}
                    </p>
                </div>
                <div className="bg-white dark:bg-slate-800 px-6 py-3 rounded-full border-2 border-slate-900 dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] rotate-2">
                    <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                        {currentMembers.length}
                    </span>
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-300 ml-2 uppercase">
                        MEMBERS
                    </span>
                </div>
            </div>

            {/* Special Member Display (Faculty Coordinator) */}
            {currentMembers.find(m => m.isSpecial) && (
                <div className="mb-16 flex justify-center px-4">
                    <div className="w-full max-w-3xl transform hover:scale-[1.02] transition-transform duration-300">
                        <TeamCard 
                            member={currentMembers.find(m => m.isSpecial)} 
                            rotate="rotate-0" 
                        />
                    </div>
                </div>
            )}

            {/* Cards Grid with Enhanced Fade and Scale Animation */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 transition-all duration-700 ease-out p-4 ${
                isTransitioning 
                  ? 'opacity-0 scale-95 translate-y-10 blur-sm' 
                  : 'opacity-100 scale-100 translate-y-0 blur-0'
              }`}
            >
              {currentMembers.filter(m => !m.isSpecial).map((member, index) => (
                <TeamCard 
                    key={member.id} 
                    member={member} 
                    rotate={rotations[index % rotations.length]}
                />
              ))}
            </div>

            {/* Empty State */}
            {currentMembers.length === 0 && !isTransitioning && (
              <div className="text-center py-20 bg-white/50 rounded-3xl border-4 border-dashed border-slate-300">
                <p className="text-slate-500 dark:text-slate-400 text-2xl font-bold font-display">
                  No funky members found here yet! 🕵️‍♂️
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
