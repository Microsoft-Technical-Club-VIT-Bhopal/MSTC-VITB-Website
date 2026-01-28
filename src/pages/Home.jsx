import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Terminal, Cpu, Globe, Users, Zap, Calendar, CheckSquare, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import eventsData from '../data/events.json';
import EventCard from '../components/EventCard';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroTextRef = useRef(null);
  const tickerRef = useRef(null);
  const tickerTweenRef = useRef(null);
  const countersRef = useRef([]);
  const containerRef = useRef(null);
  const featuredRef = useRef(null);
  const [isReduced, setIsReduced] = useState(false);
  const [liveIndex, setLiveIndex] = useState(0);

  const spotlightMessages = [
    'AI & ML workshop — next Saturday',
    'Hackathon registration open now',
    'Cloud workshop with labs — seats limited'
  ];

  useEffect(() => {
    // Respect user's motion preference
    const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    const reduced = mq ? mq.matches : false;
    setIsReduced(reduced);

    if (reduced) return;

    // Hero Text Reveal
    const tl = gsap.timeline();
    tl.fromTo(
      heroTextRef.current.children,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.18, ease: 'power4.out' }
    );

    // animate the pill underline once hero is revealed
    tl.call(() => document.querySelector('.hero-pill-wrapper')?.classList.add('hero-pill-loaded'));

    // Abstract Shapes gentle float
    gsap.to('.abstract-shape', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.6
    });

    // Ticker - horizontal infinite scroll (store tween so we can pause on hover)
    const ticker = tickerRef.current;
    if (ticker) {
      const width = ticker.scrollWidth / 2;
      tickerTweenRef.current = gsap.fromTo(
        ticker,
        { x: 0 },
        {
          x: -width,
          duration: 18,
          ease: 'none',
          repeat: -1
        }
      );
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      if (tickerTweenRef.current) tickerTweenRef.current.kill();
    };
  }, []);

  useEffect(() => {
    if (isReduced) return;

    // Animate event cards when they enter viewport
    ScrollTrigger.batch('.event-card', {
      onEnter: batch => gsap.fromTo(batch, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }),
      start: 'top 80%'
    });

    // Counters
    countersRef.current.forEach((el) => {
      if (!el) return;
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      gsap.fromTo(el, { innerText: 0 }, {
        innerText: target,
        duration: 2.2,
        ease: 'power1.out',
        snap: { innerText: 1 },
        onUpdate() { el.innerText = Math.round(el.innerText); }
      });
    });
  }, [isReduced]);

  // Parallax (mouse-reactive) for shapes
  useEffect(() => {
    if (isReduced) return;
    const container = containerRef.current;
    if (!container) return;

    let raf = null;
    const shapes = container.querySelectorAll('.abstract-shape');

    const handleMove = (e) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        shapes.forEach((s) => {
          const depth = parseFloat(s.getAttribute('data-depth') || '0.04');
          s.style.transform = `translate3d(${-(dx * depth * 100)}px, ${-(dy * depth * 100)}px, 0)`;
        });
      });
    };

    container.addEventListener('mousemove', handleMove);
    return () => {
      container.removeEventListener('mousemove', handleMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isReduced]);

  // Rotate live messages for screen readers
  useEffect(() => {
    const id = setInterval(() => setLiveIndex(i => (i + 1) % spotlightMessages.length), 5000);
    return () => clearInterval(id);
  }, []);

  // Event card tilt handlers - throttled via requestAnimationFrame, transitions handled in CSS
  const cardRafRefs = useRef(new Map());
  const handleCardMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateY = x * 8;
    const rotateX = -y * 8;

    // store latest transform and schedule an rAF to apply
    const state = cardRafRefs.current;
    state.set(el, `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`);
    if (!el._cardRaf) {
      el._cardRaf = requestAnimationFrame(() => {
        const val = state.get(el);
        if (val !== undefined) el.style.transform = val;
        state.delete(el);
        el._cardRaf = null;
      });
    }
  };

  const resetCard = (e) => {
    const el = e.currentTarget;
    // clear any pending RAF
    if (el._cardRaf) {
      cancelAnimationFrame(el._cardRaf);
      el._cardRaf = null;
    }
    el.style.transform = '';
  };

  // pause/resume ticker on hover
  const handleTickerEnter = () => tickerTweenRef.current && tickerTweenRef.current.pause();
  const handleTickerLeave = () => tickerTweenRef.current && tickerTweenRef.current.resume();

  const handleFeaturedScroll = (dir = 'right') => {
    const el = featuredRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  // Advitya-focused events: show past Advitya events on Home, and highlight upcoming Advitya event
  const advityaPastEvents = eventsData.filter((e) => e.tag === 'advitya' && e.status === 'past').slice(0, 3);
  const advityaUpcoming = eventsData.find((e) => e.tag === 'advitya' && e.status === 'upcoming');
  // fallback if no advitya past events, show general upcoming
  const upcomingEvents = advityaPastEvents.length ? advityaPastEvents : eventsData.filter((e) => e.status === 'upcoming').slice(0, 3);

  const featuredProjects = [
    { id: 'p1', title: 'AI Chatbot', desc: 'Conversational AI built with LLMs' },
    { id: 'p2', title: 'Cloud Infra Lab', desc: 'Hands-on cloud workshops' },
    { id: 'p3', title: 'Hackathon Portal', desc: 'Organize and submit projects' },
    { id: 'p4', title: 'Open Source Toolkit', desc: 'Starter templates & guides' }
  ];

  const testimonials = [
    { id: 't1', name: 'Anita Sharma', role: 'Member', quote: 'MS Club helped me ship my first open-source project.' },
    { id: 't2', name: 'Rahil Mehta', role: 'Lead', quote: 'Workshops are extremely practical and well-paced.' },
    { id: 't3', name: 'Sana Kulkarni', role: 'Mentor', quote: 'Great community and great mentorship.' }
  ];

  return (
    <div className="relative">
      <style>{`
        @keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        .animated-gradient{background:linear-gradient(90deg,rgba(59,130,246,0.9),rgba(139,92,246,0.85),rgba(16,185,129,0.7));background-size:200% 200%;animation:gradientShift 8s ease infinite}
        .pulse-slow{animation: pulse 2.6s ease-in-out infinite}
        @keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.02)}100%{transform:scale(1)}}
      `}</style>

      {/* Hero Section */}
      <section ref={containerRef} className="relative min-h-[86vh] flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background + Particles + Circular Pattern */}
        <div className="absolute inset-0 z-[-1] animated-gradient opacity-30 mix-blend-multiply" aria-hidden="true"></div>

        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Large blurred circular shapes (full-bleed pattern around page) */}
          <div data-depth="0.02" className="absolute -left-10 -top-16 w-[420px] h-[420px] rounded-full blur-[160px] bg-ms-blue/30 abstract-shape circular-pattern" aria-hidden="true"></div>
          <div data-depth="0.04" className="absolute left-20 top-8 w-[320px] h-[320px] rounded-full blur-[120px] bg-ms-blue/22 abstract-shape circular-pattern" aria-hidden="true"></div>
          <div data-depth="0.05" className="absolute right-6 top-8 w-[520px] h-[520px] rounded-full blur-[180px] bg-ms-purple/28 abstract-shape circular-pattern" aria-hidden="true"></div>
          <div data-depth="0.07" className="absolute -right-20 -bottom-10 w-[420px] h-[420px] rounded-full blur-[150px] bg-ms-purple/22 abstract-shape circular-pattern" aria-hidden="true"></div>
          <div data-depth="0.08" className="absolute right-28 top-[45%] w-44 h-44 rounded-full blur-[80px] bg-ms-neon/22 abstract-shape circular-pattern" aria-hidden="true"></div>
          <div data-depth="0.03" className="absolute left-10 bottom-20 w-96 h-96 rounded-full blur-[130px] bg-ms-neon/18 abstract-shape circular-pattern" aria-hidden="true"></div>

          {/* Subtle SVG concentric rings overlay for added pattern */} 
          <div className="absolute right-10 top-6 opacity-40 pointer-events-none" aria-hidden="true">
            <svg width="340" height="340" viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="170" cy="170" r="80" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
              <circle cx="170" cy="170" r="140" stroke="rgba(255,255,255,0.04)" strokeWidth="6" />
              <circle cx="170" cy="170" r="200" stroke="rgba(255,255,255,0.02)" strokeWidth="4" />
            </svg>
          </div>

          {/* Particles (kept subtle, layered above large circles) */}
          <div data-depth="0.03" className="particle left-2 top-12 bg-ms-blue/80" aria-hidden="true"></div>
          <div data-depth="0.06" className="particle right-10 bottom-24 bg-ms-purple/80" aria-hidden="true"></div>
          <div data-depth="0.09" className="particle right-32 top-40 bg-ms-neon/80" aria-hidden="true"></div>

          {/* Decorative ribbons (subtle, animated) */}
          <svg data-depth="0.01" className="ribbon ribbon--big left-0 top-0 w-[680px] h-[320px]" viewBox="0 0 700 320" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="ribbonGradA" x1="0" x2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.28" />
                <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.12" />
              </linearGradient>
            </defs>
            <path d="M20 260 C200 160, 300 80, 520 40" fill="none" stroke="url(#ribbonGradA)" strokeWidth="4" strokeLinecap="round" className="ribbon-path" />
            <path d="M10 220 C180 140, 260 60, 480 20" fill="none" stroke="url(#ribbonGradA)" strokeWidth="3" strokeLinecap="round" className="ribbon-path" />
          </svg>

          <svg data-depth="0.02" className="ribbon ribbon--mid left-0 bottom-8 w-[620px] h-[260px]" viewBox="0 0 640 260" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="ribbonGradB" x1="0" x2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.14" />
              </linearGradient>
            </defs>
            <path d="M40 20 C160 60, 300 120, 520 180" fill="none" stroke="url(#ribbonGradB)" strokeWidth="3.4" strokeLinecap="round" className="ribbon-path" />
            <path d="M60 50 C180 90, 320 150, 540 200" fill="none" stroke="url(#ribbonGradB)" strokeWidth="2.2" strokeLinecap="round" className="ribbon-path" />
          </svg>
        </div>

        <style>{`
          @keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
          .animated-gradient{background:linear-gradient(90deg,rgba(59,130,246,0.9),rgba(139,92,246,0.85),rgba(16,185,129,0.7));background-size:200% 200%;animation:gradientShift 10s ease infinite}
          .pulse-slow{animation: pulse 2.6s ease-in-out infinite}
          @keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.02)}100%{transform:scale(1)}}

          /* Rotator words */
          .rotator{display:inline-block;position:relative;height:1.1em;width:auto}
          .rotator span{position:absolute;left:0;top:0;opacity:0;transform:translateY(8px);animation:rot 9s infinite;display:inline-block}
          .rotator span:nth-child(1){animation-delay:0s}
          .rotator span:nth-child(2){animation-delay:3s}
          .rotator span:nth-child(3){animation-delay:6s}
          @keyframes rot{0%{opacity:0;transform:translateY(8px)}6%{opacity:1;transform:none}30%{opacity:1}36%{opacity:0;transform:translateY(-8px)}100%{opacity:0}}

          /* Circular pattern and particles */
          .circular-pattern{mix-blend-mode:screen;opacity:.85;will-change:transform,opacity,filter}
          .circular-pattern.blur-small{filter:blur(60px)}
          .particle{position:absolute;width:14px;height:14px;border-radius:9999px;opacity:0.9;filter:blur(6px);transform:translate3d(0,0,0);animation:floatY 6s ease-in-out infinite}
          .particle:nth-child(1){animation-delay:0s}
          .particle:nth-child(2){animation-delay:1.6s}
          .particle:nth-child(3){animation-delay:2.8s}
          @keyframes floatY{0%{transform:translateY(0)}50%{transform:translateY(-18px)}100%{transform:translateY(0)}}

          /* Ribbons */
          .ribbon{position:absolute;pointer-events:none;opacity:0.88;will-change:transform,opacity;mix-blend-mode:screen}
          .ribbon-path{stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 10px 40px rgba(59,130,246,0.12));stroke-opacity:0.98}
          .ribbon--big{left:-140px}
          .ribbon--mid{left:-90px}
          .ribbon .ribbon-path{transform-origin:center;animation:ribbonFloat 8.6s ease-in-out infinite}
          @keyframes ribbonFloat{0%{transform:translateY(0) translateX(0)}50%{transform:translateY(-10px) translateX(6px)}100%{transform:translateY(0) translateX(0)}}
          @media (prefers-reduced-motion: reduce){.ribbon .ribbon-path{animation:none}}

          @media (max-width: 768px){
            .circular-pattern{opacity:.55;filter:blur(60px)}
            .project-card{min-width:200px}
          }

          /* Projects scroller */
          .projects-scroll{display:flex;gap:1rem;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:6px}
          .projects-scroll::-webkit-scrollbar{display:none}
          .project-card{min-width:220px;scroll-snap-align:center;border-radius:12px;padding:16px;transition:transform 220ms cubic-bezier(.2,.9,.2,1),box-shadow .25s;border:1px solid rgba(255,255,255,0.05);background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));backdrop-filter: blur(6px)}
          .event-card{transition:transform 220ms cubic-bezier(.2,.9,.2,1),box-shadow .28s}
          .event-card:active{transform:scale(.995);}
          .project-card:hover{transform:translateY(-6px);box-shadow:0 14px 30px rgba(3,7,30,0.12)}

          /* Testimonials */
          .testimonial{background:linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,247,247,0.98));color:#0f172a;backdrop-filter:blur(6px);border-radius:12px;padding:20px;border:1px solid rgba(2,6,23,0.04);box-shadow:0 8px 22px rgba(2,6,23,0.06)}
          .dark .testimonial{background:linear-gradient(180deg, rgba(3,7,18,0.68), rgba(3,7,18,0.6)); color: #e6eef8; border:1px solid rgba(255,255,255,0.04); box-shadow:0 12px 34px rgba(2,6,23,0.6)}

          @media (prefers-reduced-motion: reduce){.animated-gradient,.rotator span,.particle{animation:none}.project-card{transition:none}}

          /* Hero pill — larger, calligraphic style */
          .hero-pill{padding-left:1.1rem;padding-right:1.1rem;box-shadow:0 6px 28px rgba(14,30,50,0.22);backdrop-filter: blur(6px);transition:transform .25s ease,box-shadow .25s}
          .hero-pill:hover{transform:translateY(-4px) scale(1.02);box-shadow:0 18px 40px rgba(14,30,50,0.28)}
          .hero-pill-title{font-family: 'Dancing Script', 'Playfair Display', Georgia, 'Times New Roman', serif, cursive; font-style:italic; font-weight:700; color:transparent; background:linear-gradient(90deg, #60a5fa, #7c3aed, #10b981); background-size:200% 100%; -webkit-background-clip:text; background-clip:text; font-size:1.05rem; letter-spacing:0.6px; text-shadow:0 2px 14px rgba(0,0,0,0.28); animation:heroTextShimmer 6s linear infinite}
          @keyframes heroTextShimmer{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
          @media(min-width:1024px){ .hero-pill-title{font-size:1.25rem} }
          /* Decorative flourish */
          .hero-pill svg{filter: drop-shadow(0 6px 12px rgba(59,130,246,0.08));}
          /* Subtle underline flourish on load */
          .hero-pill-title:after{content:'';display:block;height:3px;width:40px;margin-top:6px;background:linear-gradient(90deg,#3b82f6,#8b5cf6);border-radius:999px;opacity:0.85;transform-origin:left;transform:scaleX(0);transition:transform .6s cubic-bezier(.2,.9,.2,1)}
          .hero-pill-loaded .hero-pill-title:after{transform:scaleX(1)}

        `}</style>

        <div className="container mx-auto px-6 relative z-10 text-center hero-pill-wrapper">
          <div ref={heroTextRef} className="space-y-6 max-w-5xl mx-auto">
          

            <div className="flex items-center justify-center gap-6 flex-col lg:flex-row">
              <div className="text-left">
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
                  <span className="hero-calligraphy">Build. Ship.</span>
                  <span className="ml-3 text-transparent bg-clip-text bg-gradient-to-r from-ms-blue to-ms-neon rotator"><span>Impact</span><span>Innovate</span><span>Learn</span></span>
                </h1>

                <p className="max-w-3xl mx-auto text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
                  Learn industry-grade skills, collaborate on real projects, and grow with a community that ships software and ideas. Events, workshops, hackathons — everything you need to accelerate.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-start gap-3 pt-6">
                  <Link
                    to="/join"
                    className={`relative inline-flex items-center gap-3 px-6 py-3 bg-ms-blue text-white rounded-full font-semibold focus:outline-none focus-visible:ring-4 focus-visible:ring-ms-blue/30 ${!isReduced ? 'active:scale-95 transform-gpu transition duration-150 ' : ''} ${!isReduced ? 'pulse-slow' : ''}`}
                    aria-label="Join the Microsoft Club"
                  >
                    Join the Club <ArrowRight size={18} aria-hidden="true" />
                  </Link>

                  <Link
                    to="/events"
                    className="inline-flex items-center gap-2 px-5 py-3 border border-slate-200 dark:border-white/20 rounded-full font-medium text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                  >
                    Explore Events
                  </Link>
                </div>

                {/* How it works */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md">
                  <div className="glass-card soft-glow hover-raise flex flex-col items-center text-center p-6">
                    <Users className="text-ms-blue w-6 h-6 mb-2" />
                    <div className="font-semibold">Join</div>
                    <div className="text-sm text-slate-400 mt-1">Become a member and connect</div>
                  </div>
                  <div className="glass-card soft-glow hover-raise flex flex-col items-center text-center p-6">
                    <Zap className="text-ms-purple w-6 h-6 mb-2" />
                    <div className="font-semibold">Learn</div>
                    <div className="text-sm text-slate-400 mt-1">Attend hands-on workshops</div>
                  </div>
                  <div className="glass-card soft-glow hover-raise flex flex-col items-center text-center p-6">
                    <div className="font-semibold">Ship</div>
                    <div className="text-sm text-slate-400 mt-1">Work on real projects</div>
                  </div>
                </div>

                {/* Hero Stats */}
                <div data-anim="stagger" className="mt-10 grid grid-cols-3 gap-6 max-w-md">
                  <div className="text-center glass-card glass-glow p-6 rounded-2xl">
                    <div className="text-2xl md:text-3xl font-bold text-ms-blue" data-target="120" ref={(el) => (countersRef.current[0] = el)}>0</div>
                    <div className="text-sm text-slate-500">Members</div>
                  </div>

                  <div className="text-center glass-card glass-glow p-6 rounded-2xl">
                    <div className="text-2xl md:text-3xl font-bold text-ms-purple" data-target="35" ref={(el) => (countersRef.current[1] = el)}>0</div>
                    <div className="text-sm text-slate-500">Workshops</div>
                  </div>

                  <div className="text-center glass-card glass-glow p-6 rounded-2xl">
                    <div className="text-2xl md:text-3xl font-bold text-ms-neon" data-target="18" ref={(el) => (countersRef.current[2] = el)}>0</div>
                    <div className="text-sm text-slate-500">Projects</div>
                  </div>
                </div>
              </div>

              {/* Decorative SVG */}
              <div className="hidden lg:flex items-center justify-center w-80 h-80" aria-hidden="true">
                <svg viewBox="0 0 200 200" width="220" height="220" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
                  <defs>
                    <linearGradient id="g1" x1="0" x2="1">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                  <g fill="none" stroke="url(#g1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M40 120 C60 20, 140 20, 160 120" strokeOpacity="0.15" />
                    <circle cx="60" cy="80" r="22" fill="#fff" fillOpacity="0.03" />
                    <circle cx="140" cy="110" r="30" fill="#fff" fillOpacity="0.03" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Floating CTA on larger screens */}
        <Link
          to="/join"
          className="hidden lg:flex items-center gap-3 absolute right-8 bottom-12 bg-ms-blue text-white rounded-full px-4 py-2 shadow-lg hover:scale-105 transition-transform btn-animate soft-glow"
          aria-label="Quick join Microsoft Club"
        >
          Join Now
        </Link>
      </section>

      {/* Featured Projects
      <section className="py-12 container mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl md:text-2xl font-bold">Featured Projects</h3>
          <div className="flex items-center gap-2">
            <button onClick={() => handleFeaturedScroll('left')} className="p-2 rounded-full bg-white/80 shadow hover:bg-white">◀</button>
            <button onClick={() => handleFeaturedScroll('right')} className="p-2 rounded-full bg-white/80 shadow hover:bg-white">▶</button>
          </div>
        </div>

        <div data-anim="stagger" ref={featuredRef} className="projects-scroll">
          {featuredProjects.map((p) => (
            <div key={p.id} className="project-card rounded-lg hover-raise soft-glow glass-card">
              <div className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{p.title}</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">{p.desc}</div>
              <div className="mt-4">
                <Link to="/join" className="inline-flex items-center gap-2 mt-2 bg-ms-blue text-white px-3 py-2 rounded-md text-sm shadow hover:shadow-md btn-animate">Join Project</Link>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* Testimonials */}
      <section className="py-12 container mx-auto px-6">
        <h3 className="text-xl md:text-2xl font-bold mb-6">What members say</h3>
        <div data-anim="stagger" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial glass-card soft-glow">
              <div className="font-semibold text-slate-900 dark:text-white">{t.name}</div>
              <div className="text-sm text-slate-500 dark:text-slate-300 mb-3">{t.role}</div>
              <div className="text-slate-700 dark:text-slate-100">“{t.quote}”</div>
            </div>
          ))}
        </div>
      </section>

      {/* Ticker Section - JS driven for accessibility and motion preference */}
      <section className="py-6 bg-slate-50 dark:bg-white/5 border-y border-slate-200 dark:border-white/10 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Spotlight</h3>
            <div className="text-sm text-slate-500">Updates & themes</div>
          </div>

          <div
            ref={tickerRef}
            onMouseEnter={handleTickerEnter}
            onMouseLeave={handleTickerLeave}
            className="flex gap-12 whitespace-nowrap will-change-transform overflow-hidden" 
            role="marquee"
            aria-label="Club topics rotating"
          >
            {[...Array(3)].map((_, i) => (
              <div className="flex items-center gap-10" key={i} aria-hidden={isReduced}>
                <span className="text-2xl md:text-4xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-400 opacity-60">MICROSOFT CLUB</span>
                <Terminal className="text-ms-blue w-8 h-8 opacity-60" />
                <span className="text-2xl md:text-4xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-400 opacity-60">CLOUD COMPUTING</span>
                <Cpu className="text-ms-purple w-8 h-8 opacity-60" />
                <span className="text-2xl md:text-4xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-400 opacity-60">AI & ML</span>
                <Globe className="text-ms-green w-8 h-8 opacity-60" />
              </div>
            ))}
          </div>

          {/* aria-live fallback for SR users */}
          <div className="sr-only" role="status" aria-live="polite">{spotlightMessages[liveIndex]}</div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-20 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold mb-2 text-slate-900 dark:text-white">Advitya Events</h2>
            <p className="text-slate-600 dark:text-slate-400">Past events from Advitya — relive the highlights and see what's coming next.</p>
          </div>

          <Link to="/events" className="hidden md:inline-flex items-center gap-2 text-ms-blue font-bold hover:underline">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {advityaUpcoming && (
          <div className="mb-6">
            <div className="glass-card neon-glow p-4 rounded-lg inline-flex items-center justify-between w-full max-w-2xl">
              <div>
                <div className="font-semibold text-lg">Upcoming: {advityaUpcoming.title}</div>
                <div className="text-sm text-slate-400">{advityaUpcoming.description}</div>
              </div>
              <div className="text-sm text-slate-500">{advityaUpcoming.date}</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <div
              className="event-card group opacity-0 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-lg transition-transform"
              key={event.id}
              onMouseMove={handleCardMove}
              onMouseLeave={resetCard}
            >
              <div className="relative">
                <EventCard event={event} />

                {/* Reveal CTA on hover */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity">
                  <Link to={`/events/${event.id}`} className="inline-flex items-center gap-2 bg-ms-blue text-white px-4 py-2 rounded-full text-sm font-semibold shadow">
                    View Details
                </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center md:hidden">
          <Link to="/events" className="inline-flex items-center gap-2 text-ms-blue font-bold hover:underline">
            View All <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Small footer CTA strip */}
      <div className="py-8 bg-gradient-to-r from-ms-blue to-ms-neon text-white text-center">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <div className="font-bold text-lg">Ready to build something with us?</div>
            <div className="text-sm opacity-90">Join a project or propose an idea — everyone's welcome.</div>
          </div>

          <div>
            <Link to="/join" className="inline-flex items-center gap-2 bg-white text-ms-blue px-5 py-3 rounded-full font-semibold">
              Join Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
