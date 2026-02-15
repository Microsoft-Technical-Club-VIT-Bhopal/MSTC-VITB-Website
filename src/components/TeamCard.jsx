import React from 'react';
import { Linkedin, Instagram } from 'lucide-react';

export default function TeamCard({ member, rotate = "rotate-0" }) {
  const isSpecial = member.isSpecial;
  
  return (
    <div className={`group relative w-full ${isSpecial ? 'aspect-video sm:col-span-2' : 'aspect-[3/4]'} rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-300 border-4 ${isSpecial ? 'border-ms-blue dark:border-ms-blue' : 'border-slate-900 dark:border-white'} shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-none dark:hover:shadow-none hover:translate-x-[8px] hover:translate-y-[8px] hover:rotate-0 bg-white dark:bg-slate-900 ${rotate}`}>
      {/* Background Image */}
      {member.image ? (
        <img 
          src={member.image} 
          alt={member.name} 
          className={`w-full h-full object-cover ${isSpecial ? 'object-top' : ''} transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0078D4&color=fff&size=400`;
          }}
        />
      ) : (
        <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-b-4 border-slate-900 dark:border-white">
          <span className="text-6xl text-slate-900 dark:text-white font-black font-display rotate-12">
            {member.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
      )}

      {/* Overlay Gradient - Funky */}
      <div className={`absolute inset-0 bg-gradient-to-t ${isSpecial ? 'from-ms-blue/90' : 'from-ms-blue/90'} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

      {/* Content */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[90%] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-10">
        <div className={`bg-white dark:bg-black border-2 ${isSpecial ? 'border-ms-blue shadow-[4px_4px_0px_0px_#00A4EF]' : 'border-slate-900 dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]'} p-3 rounded-lg -rotate-1 group-hover:rotate-0 group-hover:shadow-none dark:hover:shadow-none group-hover:translate-x-[4px] group-hover:translate-y-[4px] transition-all duration-300 text-center`}>
            <h3 className={`font-black text-slate-900 dark:text-white font-display uppercase tracking-tight leading-none mb-1 ${isSpecial ? 'text-xl' : 'text-lg'}`}>
            {member.name}
            </h3>
            <p className={`${isSpecial ? 'text-black dark:text-ms-blue font-black' : 'text-slate-600 dark:text-slate-300 font-bold'} text-[10px] uppercase tracking-wider`}>
            {member.role}
            </p>
        </div>
        
        {/* Social Icons - Visible only on hover */}
        <div className="flex gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 justify-center">
          {member.linkedin_url && (
            <a 
              href={member.linkedin_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white border-2 border-black rounded-full text-black hover:bg-ms-blue hover:text-white hover:border-black transition-all duration-200 hover:scale-110 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]"
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin size={20} />
            </a>
          )}
          {member.instagram_url && (
            <a 
              href={member.instagram_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white border-2 border-black rounded-full text-black hover:bg-ms-neon hover:text-black hover:border-black transition-all duration-200 hover:scale-110 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]"
              onClick={(e) => e.stopPropagation()}
            >
              <Instagram size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
