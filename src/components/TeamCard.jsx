import React from 'react';
import { Linkedin, Instagram } from 'lucide-react';

export default function TeamCard({ member }) {
  return (
    <div className="group relative w-full aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      {/* Background Image */}
      {member.image ? (
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0078D4&color=fff&size=400`;
          }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-ms-blue to-ms-purple flex items-center justify-center">
          <span className="text-6xl text-white font-bold">
            {member.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
      )}

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-xl font-bold text-white font-display mb-1">
          {member.name}
        </h3>
        <p className="text-slate-300 font-medium text-sm mb-4">
          {member.role}
        </p>
        
        {/* Social Icons - Visible only on hover */}
        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 transform translate-y-2 group-hover:translate-y-0">
          {member.linkedin_url && (
            <a 
              href={member.linkedin_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-[#0A66C2] hover:text-white transition-all duration-200 hover:scale-110"
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin size={18} />
            </a>
          )}
          {member.instagram_url && (
            <a 
              href={member.instagram_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#E1306C] hover:to-[#F77737] hover:text-white transition-all duration-200 hover:scale-110"
              onClick={(e) => e.stopPropagation()}
            >
              <Instagram size={18} />
            </a>
          )}
        </div>
      </div>
      
      {/* Decorative Border on Hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-colors duration-300 pointer-events-none"></div>
    </div>
  );
}