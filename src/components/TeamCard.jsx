import React from 'react';
import { Linkedin, LayoutTemplate } from 'lucide-react';

export default function TeamCard({ member }) {
  return (
    <div data-anim="reveal" className="group relative w-full aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer hover-raise soft-glow">
      {/* Background Image */}
      {member.image_path ? (
        <img 
          src={member.image_path} 
          alt={member.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0078D4&color=fff`;
          }}
        />
      ) : (
        <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
          <span className="text-4xl">👤</span>
        </div>
      )}

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-xl font-bold text-white font-display">{member.name}</h3>
        <p className="text-ms-blue font-medium text-sm mb-4">{member.role}</p>
        
        {/* Socials Reveal */}
        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          <a 
            href={member.linkedin_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-ms-blue hover:text-white transition-colors"
          >
            <Linkedin size={18} />
          </a>
          <button className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-ms-purple hover:text-white transition-colors">
            <LayoutTemplate size={18} />
          </button>
        </div>
      </div>
      
      {/* Decorative Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-ms-blue/50 rounded-2xl transition-colors duration-300 pointer-events-none"></div>
    </div>
  );
}
