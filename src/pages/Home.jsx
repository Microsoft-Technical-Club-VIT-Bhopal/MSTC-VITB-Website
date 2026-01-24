import React, { useEffect, useRef } from 'react';
import { ArrowRight, Terminal, Cpu, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import eventsData from '../data/events.json';
import EventCard from '../components/EventCard';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroTextRef = useRef(null);
  const tickerRef = useRef(null);

  useEffect(() => {
    // Hero Text Reveal
    const tl = gsap.timeline();
    
    tl.fromTo(heroTextRef.current.children, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power4.out' }
    );

    // Abstract Shapes Animation
    gsap.to(".abstract-shape", {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Filter upcoming events
  const upcomingEvents = eventsData.filter(e => e.status === 'upcoming').slice(0, 3);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-ms-blue/20 rounded-full blur-[100px] abstract-shape"></div>
          <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-ms-purple/20 rounded-full blur-[120px] abstract-shape delay-75"></div>
          <div className="absolute top-[40%] right-[30%] w-48 h-48 bg-ms-neon/20 rounded-full blur-[80px] abstract-shape delay-150"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div ref={heroTextRef} className="space-y-6">
            <div className="inline-block px-4 py-2 rounded-full border border-ms-blue/30 bg-ms-blue/5 backdrop-blur-sm mb-4">
              <span className="text-ms-blue dark:text-ms-neon font-medium text-sm tracking-wide uppercase">Welcome to Microsoft Club</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-bold font-display tracking-tighter leading-tight text-slate-900 dark:text-white">
              Innovate. <span className="text-transparent bg-clip-text bg-gradient-to-r from-ms-blue to-ms-neon">Code.</span><br />
              Inspire the Future.
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-body">
              Join a community of passionate developers, designers, and innovators building the next generation of technology with Microsoft tools.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/join" className="group relative px-8 py-4 bg-ms-blue text-white rounded-full font-bold overflow-hidden transition-transform hover:scale-105">
                <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12"></div>
                <span className="relative flex items-center gap-2">
                  Join the Club <ArrowRight size={20} />
                </span>
              </Link>
              <Link to="/events" className="px-8 py-4 border border-slate-200 dark:border-white/20 rounded-full font-bold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                Explore Events
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Ticker Section - Infinite Scroll */}
      <section className="py-10 bg-slate-50 dark:bg-white/5 border-y border-slate-200 dark:border-white/10 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-ticker">
          {[...Array(2)].map((_, i) => (
             <React.Fragment key={i}>
                <div className="flex items-center gap-12">
                   <span className="text-4xl md:text-6xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-400 dark:from-white/20 dark:to-white/40 opacity-50">MICROSOFT CLUB</span>
                   <Terminal className="text-ms-blue w-12 h-12 opacity-50" />
                   <span className="text-4xl md:text-6xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-400 dark:from-white/20 dark:to-white/40 opacity-50">CLOUD COMPUTING</span>
                   <Cpu className="text-ms-purple w-12 h-12 opacity-50" />
                   <span className="text-4xl md:text-6xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-400 dark:from-white/20 dark:to-white/40 opacity-50">AI & ML</span>
                   <Globe className="text-ms-green w-12 h-12 opacity-50" />
                </div>
             </React.Fragment>
          ))}
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-2 text-slate-900 dark:text-white">Upcoming Events</h2>
            <p className="text-slate-600 dark:text-slate-400">Mark your calendars for what's next.</p>
          </div>
          <Link to="/events" className="hidden md:flex items-center gap-2 text-ms-blue font-bold hover:underline">
            View All <ArrowRight size={20} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link to="/events" className="inline-flex items-center gap-2 text-ms-blue font-bold hover:underline">
            View All <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
