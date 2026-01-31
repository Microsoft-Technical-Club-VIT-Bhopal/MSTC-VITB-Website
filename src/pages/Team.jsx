import React from 'react';
import teamData from '../data/team.json';
import TeamCard from '../components/TeamCard';

export default function Team() {
  return (
    <div data-anim="reveal" className="min-h-screen pt-24 pb-20 container mx-auto px-6">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl md:text-6xl font-bold font-display text-slate-900 dark:text-white mb-6">
          Meet the <span className="text-ms-blue">Innovators</span>.
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
           Our team is a diverse group of problem solvers, creative thinkers, and tech enthusiasts dealing with everything from Cloud Computing to UI/UX Design.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {teamData.map(member => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
      
      {/* Join Call to Action */}

    </div>
  );
}
