import React, { useEffect, useRef } from 'react';
import { Github, Instagram, Linkedin, Heart, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function Footer() {
  const footerRef = useRef(null);
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState('idle'); // idle, loading, success, error

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Massive Text Scroll - Smoother & Slower
        gsap.to(".big-text", {
            xPercent: -15,
            ease: "none",
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5 
            }
        });

    }, footerRef);
    
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    try {
        const response = await fetch('/api/newsletter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, timestamp: new Date().toISOString() }),
        });

        if (response.ok) {
            setStatus('success');
            setEmail('');
            setTimeout(() => setStatus('idle'), 3000);
        } else {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    } catch (err) {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <footer ref={footerRef} className="relative bg-white dark:bg-[#0B1221] text-slate-900 dark:text-white pt-32 pb-12 overflow-hidden mt-20 transition-colors duration-500 rounded-t-[5rem] md:rounded-t-[10rem]">
      {/* Massive Scrolling Text Background */}
      <div className="absolute top-20 left-0 w-full opacity-5 pointer-events-none select-none">
          <h1 className="text-[25vw] leading-[0.8] font-black font-display whitespace-nowrap big-text text-slate-900 dark:text-white">
            MICROSOFT TECHNICAL CLUB
          </h1>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-12 mb-24">
            {/* Brand - Tilted Card */}
            <div className="bg-ms-blue text-white p-8 rounded-[2rem] border-4 border-slate-900 dark:border-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] -rotate-3 hover:rotate-0 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none dark:hover:shadow-none transition-all duration-300 max-w-md cursor-pointer text-center md:text-left">
                <Link to="/" className="text-4xl font-black font-display tracking-tighter block mb-4">
                  MSTC <span className="font-light opacity-80">VITB</span>
                </Link>
                <p className="text-lg font-medium opacity-90 leading-relaxed">
                  We build cool stuff. We break cool stuff. Then we fix it. Join the chaos.
                </p>
            </div>

            {/* Links - Scattered Pills - consistent dark shadow & pressed hover */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-end max-w-lg">
                <Link to="/about" className="px-6 py-3 rounded-full border-2 border-slate-900 dark:border-white font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.35)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none dark:hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] hover:scale-[1.02] transition-all duration-200">About</Link>
                <Link to="/events" className="px-6 py-3 rounded-full bg-ms-neon text-black font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.35)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none dark:hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] hover:scale-[1.02] transition-all duration-200 rotate-2">Events</Link>
                <Link to="/team" className="px-6 py-3 rounded-full border-2 border-slate-900 dark:border-white font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.35)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none dark:hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] hover:scale-[1.05] transition-all duration-200 hover:-rotate-3">Team</Link>
                <Link to="/join" className="px-8 py-3 rounded-full bg-ms-neon text-black font-bold text-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.35)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none dark:hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] hover:scale-[1.02] transition-all duration-200 -rotate-2">Join Club</Link>
            </div>
        </div>

        {/* Bottom Section - Newsletter & Socials */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 border-t-2 border-slate-900/10 dark:border-white/10 pt-12">
            
            {/* Tilted Input */}
            <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute inset-0 bg-ms-violet rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative flex items-center bg-white dark:bg-black border-2 border-slate-900 dark:border-white rounded-full p-2 pl-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] rotate-1 focus-within:-rotate-1 transition-transform">
                    <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={status === 'success' ? "Subscribed! 🎉" : status === 'error' ? "Try again! ❌" : "Updates? Yes please."}
                        disabled={status === 'loading' || status === 'success'}
                        className="bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none w-64 font-bold disabled:opacity-70"
                    />
                    <button 
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        className="bg-slate-900 dark:bg-white text-white dark:text-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-ms-blue hover:text-white transition-all border-2 border-slate-900 disabled:bg-slate-400"
                    >
                        {status === 'loading' ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <ArrowUpRight size={20} />
                        )}
                    </button>
                </div>
            </form>

            {/* Social Icons */}
            <div className="flex gap-4">
               {[
                 { icon: Linkedin, href: "https://www.linkedin.com/groups/17283015/?feedType=highlightedFeedForGroups&highlightedUpdateUrn=urn%3Ali%3AgroupPost%3A17283015-7428341469201002496&q=highlightedFeedForGroups", color: "hover:bg-ms-blue dark:hover:bg-ms-blue hover:text-white" },
                 { icon: Instagram, href: "https://www.instagram.com/mstc_vitb/", color: "hover:bg-ms-neon dark:hover:bg-ms-neon hover:text-black dark:hover:text-black" },
                 { icon: Github, href: "https://github.com/Microsoft-Technical-Club-VIT-Bhopal", color: "hover:bg-ms-yellow dark:hover:bg-ms-yellow hover:text-black dark:hover:text-black" }
               ].map((Social, index) => (
                 <a 
                   key={index}
                   href={Social.href} 
                   target="_blank"
                   rel="noopener noreferrer"
                   className={`w-12 h-12 rounded-full border-2 border-slate-900 dark:border-white bg-white dark:bg-slate-900 flex items-center justify-center text-slate-900 dark:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none dark:hover:shadow-none ${Social.color} transition-all duration-200`}
                 >
                   <Social.icon size={20} />
                 </a>
               ))}
            </div>

            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                Made with <Heart size={14} className="text-ms-neon fill-ms-neon animate-pulse" /> by Tech Team
            </p>
        </div>
      </div>
    </footer>
  );
}
