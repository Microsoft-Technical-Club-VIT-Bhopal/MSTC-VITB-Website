import React from 'react';
import { Instagram, Linkedin, MessageSquare, Mail } from 'lucide-react';

export default function Join() {
  return (
    <div className="min-h-screen pt-24 pb-20 container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left: Content & Socials */}
        <div>
          <h1 className="text-5xl md:text-7xl font-bold font-display text-slate-900 dark:text-white mb-8">
            Join the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-ms-blue to-ms-neon">Movement.</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 max-w-lg">
            Ready to level up your skills? Fill out the form to become an official member of the Microsoft Club. Get access to exclusive workshops, hackathons, and mentorship.
          </p>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Connect with us</h3>
            <div className="flex flex-wrap gap-4">
               <a href="#" className="flex items-center gap-3 px-6 py-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-ms-blue hover:bg-white dark:hover:bg-white/10 transition-all duration-300 group">
                 <Linkedin className="text-slate-600 dark:text-slate-400 group-hover:text-ms-blue transition-colors" />
                 <span className="font-bold text-slate-700 dark:text-slate-300">LinkedIn</span>
               </a>
               <a href="#" className="flex items-center gap-3 px-6 py-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-pink-600 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 group">
                 <Instagram className="text-slate-600 dark:text-slate-400 group-hover:text-pink-600 transition-colors" />
                 <span className="font-bold text-slate-700 dark:text-slate-300">Instagram</span>
               </a>
               <a href="#" className="flex items-center gap-3 px-6 py-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-indigo-500 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 group">
                 <MessageSquare className="text-slate-600 dark:text-slate-400 group-hover:text-indigo-500 transition-colors" />
                 <span className="font-bold text-slate-700 dark:text-slate-300">Discord</span>
               </a>
            </div>
            
             <a href="mailto:contact@msclub.com" className="flex items-center gap-2 text-ms-blue font-bold hover:underline mt-8">
               <Mail size={18} /> contact@msclub.com
             </a>
          </div>
        </div>

        {/* Right: Form Embed */}
        <div className="relative">
           {/* Decorative Elements */}
           <div className="absolute -top-10 -right-10 w-32 h-32 bg-ms-blue/20 rounded-full blur-2xl"></div>
           <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-ms-green/20 rounded-full blur-2xl"></div>
           
           <div className="relative w-full h-[600px] bg-slate-100 dark:bg-white/5 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl glass">
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-500">
                <div className="text-center p-8">
                  <p className="mb-4">Google Form Embed Container</p>
                  <p className="text-xs opacity-70">Replace this styled container with actual iframe:</p>
                  <code className="text-xs bg-black/10 dark:bg-black/30 p-2 rounded mt-2 block backdrop-blur-md">
                    &lt;iframe src="..." width="100%" height="100%" ... &gt;
                  </code>
                </div>
              </div>
              {/* Actual Iframe Integration Example (Commented out) */}
              {/* <iframe src="https://docs.google.com/forms/d/e/..." className="w-full h-full border-0" title="Join Form"></iframe> */}
           </div>
        </div>

      </div>
    </div>
  );
}
