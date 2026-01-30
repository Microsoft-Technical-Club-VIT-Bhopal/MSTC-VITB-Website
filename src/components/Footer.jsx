import React, { useEffect, useRef } from 'react';
import { Github, Instagram, Linkedin, Heart, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function Footer() {
  const footerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-item", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom-=100",
        }
      });
      
      gsap.from(".big-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        }
      });
    }, footerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-slate-900 text-white pt-20 pb-6 overflow-hidden mt-20">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-ms-blue/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-ms-purple/10 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="md:col-span-5 footer-item">
            <Link to="/" className="text-3xl font-bold font-display tracking-tighter flex items-center gap-2 mb-6">
              <span className="text-white">Microsoft Technical Club</span>
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed max-w-sm mb-8">
              Empowering the next generation of tech leaders. Join our community to learn, build, and innovate with Microsoft technologies.
            </p>
            
            <div className="flex gap-4">
               {[
                 { icon: Linkedin, href: "#" },
                 { icon: Instagram, href: "#" },
                 { icon: Github, href: "#" }
               ].map((Social, index) => (
                 <a 
                   key={index}
                   href={Social.href} 
                   className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 group"
                 >
                   <Social.icon size={20} className="transform group-hover:scale-110 transition-transform" />
                 </a>
               ))}
            </div>
          </div>
          
          {/* Links Columns */}
          <div className="md:col-span-2 footer-item">
            <h4 className="font-bold text-white mb-6">Explore</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/about" className="hover:text-ms-blue transition-colors">About Us</Link></li>
              <li><Link to="/events" className="hover:text-ms-blue transition-colors">Events</Link></li>
              <li><Link to="/team" className="hover:text-ms-blue transition-colors">Team</Link></li>
              <li><Link to="/join" className="hover:text-ms-blue transition-colors">Join Club</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-2 footer-item">
            <h4 className="font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-ms-blue transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-ms-blue transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-ms-blue transition-colors">Code of Conduct</a></li>
            </ul>
          </div>
          
          {/* CTA Column */}
          <div className="md:col-span-3 footer-item">
            <h4 className="font-bold text-white mb-6">Stay Updated</h4>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-sm text-slate-300 mb-4">Get the latest updates on hackathons and workshops.</p>
                <div className="flex gap-2">
                   <input type="email" placeholder="Email address" className="bg-transparent border-b border-white/20 w-full py-2 text-sm focus:outline-none focus:border-ms-blue transition-colors" />
                   <button className="text-ms-blue hover:text-white transition-colors"><ArrowUpRight /></button>
                </div>
             </div>
          </div>
        </div>

        {/* Big Text */}
        <div className="border-t border-white/10 pt-8 pb-4">
           <h1 className="text-[12vw] leading-none font-bold font-display text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-white/0 text-center select-none pointer-events-none big-text">
             MICROSOFT
           </h1>
           <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 mt-4 footer-item">
              <p>&copy; {new Date().getFullYear()} Microsoft Technical Club. All rights reserved.</p>
              <p className="flex items-center gap-1">Designed with <Heart size={12} className="text-ms-blue fill-current" /> by Tech Team</p>
           </div>
        </div>
      </div>
    </footer>
  );
}
