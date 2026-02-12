import React, { useState } from 'react';
import teamData from '../data/team.json';
import TeamCard from '../components/TeamCard';

export default function Team() {
  const [selectedTeam, setSelectedTeam] = useState('The Panel');
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    
    // Scroll to top of page smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Wait for fade out, then change team and fade in
    setTimeout(() => {
      setSelectedTeam(teamName);
      setIsTransitioning(false);
    }, 700); // Increased duration for more visible animation
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-6xl font-bold font-display text-black dark:text-white mb-6">
            Meet the Team
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            Meet the diverse team powering MSTC - from organizing events to building solutions, each member brings unique skills and passion.
          </p>
        </div>

        {/* Main Content with Sidebar and Cards */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 font-display">
                Teams
              </h2>
              <nav className="space-y-2">
                {teams.map((teamName) => (
                  <button
                    key={teamName}
                    onClick={() => handleTeamChange(teamName)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 font-medium transform ${
                      selectedTeam === teamName
                        ? 'bg-ms-blue text-white shadow-lg scale-105'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:scale-105 hover:shadow-md hover:translate-x-2'
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
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                {selectedTeam}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                {currentMembers.length} {currentMembers.length === 1 ? 'member' : 'members'}
              </p>
            </div>

            {/* Team Description with Fade Animation */}
            <div
              className={`mb-8 transition-all duration-700 ease-out ${
                isTransitioning 
                  ? 'opacity-0' 
                  : 'opacity-100'
              }`}
            >
              <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
                {teamDescriptions[selectedTeam]}
              </p>
            </div>

            {/* Cards Grid with Enhanced Fade and Scale Animation */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 transition-all duration-700 ease-out ${
                isTransitioning 
                  ? 'opacity-0 scale-95 -translate-y-4' 
                  : 'opacity-100 scale-100 translate-y-0'
              }`}
            >
              {currentMembers.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>

            {/* Empty State */}
            {currentMembers.length === 0 && !isTransitioning && (
              <div className="text-center py-20">
                <p className="text-slate-500 dark:text-slate-400 text-lg">
                  No members found in this team.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}