import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Users, Rocket, Calendar, Star, Lightbulb, Trophy, Target, Zap, Heart, Shield, Globe, Code, Award, TrendingUp } from 'lucide-react';
import SplitText from '../components/SplitText';

// Counter Component
function Counter({ value, triggerSelector = '.bg-slate-50' }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to({ val: 0 }, {
        val: value,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: triggerSelector,
          start: 'top 80%'
        },
        onUpdate: function () {
          setCount(Math.floor(this.targets()[0].val));
        }
      });
    });
    return () => ctx.revert();
  }, [value, triggerSelector]);
  return <span>{count}</span>;
}

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function About() {
  const heroRef = useRef();
  const timelineRef = useRef();
  const valuesRef = useRef();
  const statsRef = useRef();
  const heroTextRef = useRef(null);
  const heroCardsRef = useRef(null);
  const heroCtaRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  
  // Dynamic Statistics State
  const [stats, setStats] = useState([
    { value: 500, suffix: '+', label: 'Community Members', color: 'text-ms-blue' },
    { value: 50, suffix: '+', label: 'Events & Workshops', color: 'text-ms-purple' },
    { value: 24, suffix: 'h', label: 'Hackathon Duration', color: 'text-ms-neon' },
    { value: 100, suffix: '%', label: 'Passion Driven', color: 'text-green-400' }
  ]);

  // Function to dynamically update statistics
  const updateStats = (newStats) => {
    setStats(newStats);
  };

  // Example: You can call this function anywhere to update stats
  // updateStats([
  //   { value: 600, suffix: '+', label: 'Community Members', color: 'text-ms-blue' },
  //   { value: 60, suffix: '+', label: 'Events & Workshops', color: 'text-ms-purple' },
  //   { value: 48, suffix: 'h', label: 'Hackathon Duration', color: 'text-ms-neon' },
  //   { value: 100, suffix: '%', label: 'Passion Driven', color: 'text-green-400' }
  // ]);

  // Demo: Update stats when component mounts or on trigger
  useEffect(() => {
    // Uncomment below to auto-update stats after 5 seconds for testing
    // setTimeout(() => {
    //   updateStats([
    //     { value: 750, suffix: '+', label: 'Community Members', color: 'text-ms-blue' },
    //     { value: 75, suffix: '+', label: 'Events & Workshops', color: 'text-ms-purple' },
    //     { value: 36, suffix: 'h', label: 'Hackathon Duration', color: 'text-ms-neon' },
    //     { value: 100, suffix: '%', label: 'Passion Driven', color: 'text-green-400' }
    //   ]);
    // }, 5000);
  }, []);

  // Demo: Reset counters to 0 on scroll to test animation
  useEffect(() => {
    const handleScroll = () => {
      // This is just for testing - the counters should automatically start from 0
      // when their section comes into view due to ScrollTrigger
      console.log('Counters will animate from 0 when their section is visible');
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Sync with preloader completion
    const timer = setTimeout(() => setIsReady(true), 3500);
    
    const tl = gsap.timeline({ delay: 4 });

    tl.fromTo(heroCardsRef.current?.children || [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" },
        "-=0.5"
    )
    .fromTo(heroCtaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.5"
    );

    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.1 }
    );
    gsap.from('.about-hero-bg', {
      scale: 0.9,
      opacity: 0.5,
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.2
    });
    
    const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    const reduced = mq ? mq.matches : false;

    if (reduced) {
      // Gentle fallbacks for reduced motion
      gsap.utils.toArray('.timeline-step').forEach((el, i) => {
        gsap.from(el, { y: 20, opacity: 0, duration: 0.6, delay: 0.08 + i * 0.08, ease: 'power1.out' });
      });
      gsap.utils.toArray('.value-card').forEach((el, i) => {
        gsap.from(el, { y: 12, opacity: 0, duration: 0.6, delay: 0.08 + i * 0.06 });
      });
      gsap.from(statsRef.current, { y: 20, opacity: 0, duration: 0.8 });
      return;
    }

    // Smooth scroll-driven timeline without pinning
    const steps = timelineRef.current.querySelectorAll('.timeline-step');
    const centerLine = timelineRef.current.querySelector('.center-line');

    // Draw the center connector line as we scroll
    gsap.fromTo(centerLine, 
      { scaleY: 0, transformOrigin: 'top center' }, 
      { 
        scaleY: 1, 
        ease: 'none', 
        duration: 1,
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 0.6
        }
      }
    );

    // Animate each timeline step
    steps.forEach((el, i) => {
      const icon = el.querySelector('.timeline-icon');
      const card = el.querySelector('.timeline-card');

      // Step icon animation
      gsap.fromTo(icon, 
        { scale: 0.7, y: 18, opacity: 0, filter: 'blur(4px)' }, 
        { 
          scale: 1, y: 0, opacity: 1, filter: 'blur(0px)', 
          duration: 0.6, 
          ease: 'back.out(1.1)',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.6
          }
        }
      );

      // Content card animation
      gsap.fromTo(card, 
        { y: 40, opacity: 0 }, 
        { 
          y: 0, opacity: 1, 
          duration: 0.7, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 0.6
          }
        }
      );

      // Add active class for glow effects when step is centered
      ScrollTrigger.create({
        trigger: el,
        start: 'top center+=40',
        end: 'bottom center-=40',
        onEnter: () => el.classList.add('is-active'),
        onEnterBack: () => el.classList.add('is-active'),
        onLeave: () => el.classList.remove('is-active'),
        onLeaveBack: () => el.classList.remove('is-active')
      });
    });

    // cleanup
    return () => {
      clearTimeout(timer);
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Mission & Vision animations
  const missionRef = useRef();
  const visionRef = useRef();
  
  useGSAP(() => {
    if (missionRef.current) {
      gsap.fromTo(missionRef.current,
        { opacity: 0, y: 50, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
      );
    }
    
    if (visionRef.current) {
      gsap.fromTo(visionRef.current,
        { opacity: 0, y: 50, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
      );
    }
  }, { scope: missionRef });

  // Impact Stories animations
  const impactRef = useRef();
  
  useGSAP(() => {
    if (impactRef.current) {
      const cards = impactRef.current.querySelectorAll('.impact-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 40, scale: 0.95, rotationX: 5 },
        { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 1, stagger: 0.2, ease: "back.out(1.3)" }
      );
    }
  }, { scope: impactRef });

  // Values animations
  useGSAP(() => {
    if (valuesRef.current) {
      const cards = valuesRef.current.querySelectorAll('.value-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 50, scale: 0.85, rotationY: 10 },
        { opacity: 1, y: 0, scale: 1, rotationY: 0, duration: 1.2, stagger: 0.15, ease: "elastic.out(1, 0.8)" }
      );
    }
  }, { scope: valuesRef });

  // Stats animations
  useGSAP(() => {
    if (statsRef.current) {
      const cards = statsRef.current.querySelectorAll('.stat-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 40, scale: 0.9, rotationZ: 2 },
        { opacity: 1, y: 0, scale: 1, rotationZ: 0, duration: 1, stagger: 0.12, ease: "power4.out" }
      );
    }
  }, { scope: statsRef });

  return (
    <div className="min-h-screen pt-20 relative overflow-x-clip bg-gray-50 dark:bg-ms-obsidian transition-colors duration-500">
        <style>{` 
        .timeline-icon{transition:transform .35s ease, box-shadow .35s, filter .35s; display:flex; align-items:center; justify-content:center}
        .timeline-icon > *{width:48px; height:48px}
        .timeline-step.is-active .timeline-icon{transform:scale(1.12); box-shadow:0 18px 40px rgba(59,130,246,0.12); filter:drop-shadow(0 10px 30px rgba(59,130,246,0.08));}
        .timeline-card{transition:transform .35s ease, box-shadow .35s}
        .timeline-step.is-active .timeline-card{transform:translateX(6px) scale(1.01); box-shadow:0 20px 40px rgba(2,6,23,0.12)}

        /* Improved center line styling */
        .center-line{transform-origin:top center; transform:scaleY(0); transition:transform .6s ease; left:50%; transform-origin:top center; z-index:0; width:1px;}
        .center-line::before{content:'';position:absolute;left:50%;transform:translateX(-50%);top:0;bottom:0;width:4px;border-radius:999px;background:linear-gradient(180deg,rgba(59,130,246,0.10),rgba(139,92,246,0.04));filter:blur(4px);opacity:0.45}

        /* Timeline icon with proper spacing from center line */
        .timeline-icon-container {display:flex; flex-direction:column; align-items:center; gap:0}
        .timeline-icon {transition:transform .35s ease, box-shadow .35s, filter .35s; display:flex; align-items:center; justify-content:center; margin:0 16px}
        .timeline-icon > *{width:48px; height:48px}
        .timeline-step.is-active .timeline-icon{transform:scale(1.12); box-shadow:0 18px 40px rgba(59,130,246,0.12); filter:drop-shadow(0 10px 30px rgba(59,130,246,0.08));}

        /* Marquee Animations */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-medium {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-fast {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee-slow {
          animation: marquee-slow 25s linear infinite;
        }
        .animate-marquee-medium {
          animation: marquee-medium 18s linear infinite;
        }
        .animate-marquee-fast {
          animation: marquee-fast 15s linear infinite;
        }
        .animate-marquee:hover,
        .animate-marquee-slow:hover,
        .animate-marquee-medium:hover,
        .animate-marquee-fast:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce){ .timeline-icon,.timeline-card,.center-line,.animate-marquee,.animate-marquee-slow,.animate-marquee-medium,.animate-marquee-fast{transition:none!important; animation:none!important} }
      `}</style>
      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden about-hero-bg">
          <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] sm:w-[60vw] sm:h-[60vw] lg:w-[60vw] lg:h-[60vw] bg-ms-blue/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] sm:w-[50vw] sm:h-[50vw] lg:w-[50vw] lg:h-[50vw] bg-ms-purple/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] sm:w-[40vw] sm:h-[40vw] lg:w-[40vw] lg:h-[40vw] bg-ms-neon/5 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow delay-500" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-20">
            {/* Text Content */}
            <div className="flex-1 space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1 lg:pl-16 xl:pl-24">
              <div className="space-y-4">
                <SplitText
                  text="Innovate. Create. Inspire."
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-display font-black leading-tight tracking-tighter text-slate-900 dark:text-white break-words"
                  delay={40}
                  duration={1.2}
                  ease="power4.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 80, rotateX: 30, filter: 'blur(10px)' }}
                  to={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                  trigger={isReady}
                />
                <div className="h-1 w-16 sm:w-20 lg:w-24 xl:w-32 bg-gradient-to-r from-ms-blue to-ms-purple rounded-full mx-auto lg:mx-0"></div>
              </div>
              <div ref={heroTextRef} className="space-y-3 sm:space-y-4">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-slate-600 dark:text-slate-300 max-w-full lg:max-w-2xl font-light leading-relaxed break-words">
                  We are the <span className="text-ms-blue font-bold">Connectors</span>a vibrant community bridging students, technology, and opportunity to forge tomorrow's solutions, today.
                </p>
                <div className="space-y-2 sm:space-y-3">
                  <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg text-slate-500 dark:text-slate-400 italic break-words">
                    "Where passion meets innovation and dreams become reality"
                  </p>
                  <p className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-base text-slate-600 dark:text-slate-300 max-w-full lg:max-w-lg break-words">
                    Founded in 2021, we've grown from a small group of tech enthusiasts to a thriving community of 500+ members, 
                    united by our shared passion for technology and innovation.
                  </p>
                </div>
              </div>
              <div ref={heroCtaRef} className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start mt-4 sm:mt-6 lg:mt-8">
                <a href="#timeline" className="group relative px-6 lg:px-8 py-3 lg:py-4 bg-ms-blue text-white font-bold text-base lg:text-lg rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-2xl whitespace-nowrap">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Rocket className="w-4 h-4 lg:w-5 lg:h-5 group-hover:scale-110 transition-transform" />
                    Our Journey
                    <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
                <a href="/events" className="group flex items-center justify-center gap-2 lg:gap-3 text-ms-blue font-medium text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4 rounded-full border border-ms-blue/30 hover:border-ms-blue hover:bg-ms-blue hover:text-white transition-all whitespace-nowrap">
                  <span className="inline-flex items-center justify-center w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-ms-blue/10 text-ms-blue group-hover:bg-white group-hover:text-ms-blue transition-all">
                    <Calendar className="w-4 h-4 lg:w-5 lg:h-5" />
                  </span>
                  Explore Events
                </a>
              </div>
            </div>
            
            {/* Enhanced Vision Card */}
            <div ref={heroCardsRef} className="flex-1 flex items-center justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-lg xl:max-w-xl">
                <div className="relative h-72 sm:h-80 lg:h-96 xl:h-[28rem] rounded-3xl overflow-hidden bg-gradient-to-br from-ms-blue/10 via-ms-purple/10 to-ms-neon/10 border border-white/20 backdrop-blur-sm shadow-2xl group hover:scale-105 transition-all duration-500">
                  {/* Animated Background Elements */}
                  <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-ms-blue/20 rounded-full blur-2xl animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-ms-purple/20 rounded-full blur-2xl animate-pulse delay-700" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 bg-ms-neon/20 rounded-full blur-2xl animate-pulse delay-500" />
                  </div>
                  
                  {/* MSTC Logo/Brand Element */}
                  <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-ms-blue to-ms-purple rounded-xl flex items-center justify-center shadow-lg">
                      <Code className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6">
                    <div className="text-center space-y-3 sm:space-y-4 lg:space-y-6">
                      {/* MSTC Branding */}
                      <div className="space-y-2">
                        <div className="text-xl sm:text-2xl lg:text-3xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-ms-blue to-ms-purple">
                          MSTC
                        </div>
                        <div className="text-xs sm:text-xs lg:text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                          VIT BHOPAL
                        </div>
                      </div>
                      
                    
                   
                      
                      {/* Tagline */}
                      <div className="space-y-1 sm:space-y-2">
                        <p className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 dark:text-white leading-tight">
                          Building Tech Leaders
                        </p>
                        <p className="text-xs sm:text-sm lg:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                          Empowering students to innovate, collaborate, and excel in technology
                        </p>
                      </div>
                      
                      {/* Achievement Badges */}
                      <div className="flex flex-wrap justify-center gap-2">
                        <span className="px-3 py-1 bg-ms-blue/10 text-ms-blue text-xs font-semibold rounded-full border border-ms-blue/20">
                          Microsoft Partner
                        </span>
                        <span className="px-3 py-1 bg-ms-purple/10 text-ms-purple text-xs font-semibold rounded-full border border-ms-purple/20">
                          Student Led
                        </span>
                        <span className="px-3 py-1 bg-ms-neon/10 text-ms-neon text-xs font-semibold rounded-full border border-ms-neon/20">
                          Since 2021
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="stats-section relative py-24 overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-ms-blue/5 via-ms-neon/5 to-ms-purple/5" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-[50vw] h-[50vw] bg-ms-blue/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/3 w-[45vw] h-[45vw] bg-ms-purple/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow delay-500" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight tracking-tighter text-slate-900 dark:text-white mb-4">
              By the Numbers
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Our impact measured in achievements, milestones, and community growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { 
                value: 500, 
                label: 'Active Members', 
                color: 'text-ms-blue', 
                bgColor: 'bg-ms-blue/10',
                borderColor: 'border-ms-blue/20',
                suffix: '+', 
                icon: <Users className="w-10 h-10" />,
                description: 'Passionate tech enthusiasts and innovators'
              },
              { 
                value: 50, 
                label: 'Workshops Hosted', 
                color: 'text-ms-green', 
                bgColor: 'bg-ms-green/10',
                borderColor: 'border-ms-green/20',
                suffix: '+', 
                icon: <Lightbulb className="w-10 h-10" />,
                description: 'Hands-on learning experiences'
              },
              { 
                value: 24, 
                label: 'Hackathon Duration', 
                color: 'text-ms-orange', 
                bgColor: 'bg-ms-orange/10',
                borderColor: 'border-ms-orange/20',
                suffix: 'h', 
                icon: <Rocket className="w-10 h-10" />,
                description: 'Non-stop innovation and creativity'
              },
            ].map((stat, index) => (
              <div key={index} className="group p-10 rounded-3xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-sm hover:bg-white dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] text-center">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${stat.bgColor} ${stat.borderColor} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <span className={stat.color}>{stat.icon}</span>
                </div>
                <h3 className={`text-5xl md:text-6xl font-bold font-display mb-2 ${stat.color} flex justify-center items-center`}>
                  <Counter value={stat.value} triggerSelector=".stats-section" />
                  <span>{stat.suffix}</span>
                </h3>
                <p className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{stat.label}</p>
                <p className="text-slate-600 dark:text-slate-300">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative py-12 sm:py-16 lg:py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[60vw] h-[60vw] sm:w-[45vw] sm:h-[45vw] lg:w-[45vw] lg:h-[45vw] bg-ms-blue/5 rounded-full blur-[90px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow" />
          <div className="absolute bottom-1/4 left-1/4 w-[55vw] h-[55vw] sm:w-[40vw] sm:h-[40vw] lg:w-[40vw] lg:h-[40vw] bg-ms-purple/5 rounded-full blur-[70px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow delay-700" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Mission */}
            <div ref={missionRef} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-ms-blue/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white dark:hover:bg-white/10 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] border border-gray-200 dark:border-white/10">
                <div className="space-y-4 sm:space-y-6">
                  <div className="space-y-3 sm:space-y-4">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white">
                      Our Mission
                    </h2>
                    <div className="h-1 w-16 sm:w-20 lg:w-24 bg-ms-blue rounded-full"></div>
                  </div>
                  <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                    To create an inclusive ecosystem where technology enthusiasts can collaborate, innovate, and grow together. 
                    We believe in democratizing technology education and providing platforms for students to transform their ideas into impactful solutions.
                  </p>
                  <blockquote className="border-l-4 border-ms-blue pl-4 sm:pl-6 italic text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                    "Empowering every student with the tools, knowledge, and community to shape the future of technology"
                  </blockquote>
                </div>
              </div>
            </div>
            
            {/* Vision */}
            <div ref={visionRef} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-ms-purple/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white dark:hover:bg-white/10 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] border border-gray-200 dark:border-white/10">
                <div className="space-y-4 sm:space-y-6">
                  <div className="space-y-3 sm:space-y-4">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white">
                      Our Vision
                    </h2>
                    <div className="h-1 w-16 sm:w-20 lg:w-24 bg-ms-purple rounded-full"></div>
                  </div>
                  <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                    To be the leading student-run technology community that bridges the gap between academic learning and real-world innovation. 
                    We aspire to create a generation of tech leaders who are not just skilled professionals but also compassionate innovators.
                  </p>
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-8">
                    <div className="text-center group/bounce">
                     
                    </div>
                    <div className="text-center group/bounce">
                     
                    </div>
                    <div className="text-center group/bounce">
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories Section */}
      <section ref={impactRef} className="relative py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4">
              Impact Stories
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Real stories of growth, innovation, and success from our community members
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="impact-card group p-6 sm:p-8 rounded-3xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-sm hover:bg-white dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-ms-blue/10 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-ms-blue" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">From Idea to Impact</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4">
                "The hackathon organized by MSTC was the turning point in my journey. It gave me the confidence to pursue my startup idea."
              </p>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                — Alumni, Class of 2023
              </div>
            </div>
            
            <div className="impact-card group p-6 sm:p-8 rounded-3xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-sm hover:bg-white dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-ms-purple/10 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-ms-purple" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">Skills That Matter</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4">
                "The workshops and mentorship programs helped me land my dream internship at a leading tech company."
              </p>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                — Final Year Student
              </div>
            </div>
            
            <div className="impact-card group p-6 sm:p-8 rounded-3xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-sm hover:bg-white dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-ms-neon/10 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-6 h-6 sm:w-8 sm:h-8 text-ms-neon" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">Community First</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4">
                "The friendships and connections I made here are priceless. We're not just a club, we're a family."
              </p>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                — Active Member
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="relative py-8 overflow-hidden bg-gradient-to-r from-ms-blue/5 via-ms-neon/5 to-ms-purple/5">
        <div className="relative">
          <div className="flex animate-marquee whitespace-nowrap">
            <div className="flex items-center space-x-12 px-4">
              {[
                { icon: <Star className="w-6 h-6 text-ms-yellow" />, text: "500+ Active Members" },
                { icon: <Rocket className="w-6 h-6 text-ms-orange" />, text: "24-Hour Hackathons" },
                { icon: <Lightbulb className="w-6 h-6 text-ms-green" />, text: "50+ Workshops" },
                { icon: <Users className="w-6 h-6 text-ms-blue" />, text: "Tech Community" },
                { icon: <Heart className="w-6 h-6 text-ms-purple" />, text: "Collaborative Learning" },
                { icon: <Calendar className="w-6 h-6 text-ms-neon" />, text: "Year-Round Events" },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 text-slate-700 dark:text-slate-300">
                  {item.icon}
                  <span className="text-lg font-semibold">{item.text}</span>
                </div>
              ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex items-center space-x-12 px-4">
              {[
                { icon: <Star className="w-6 h-6 text-ms-yellow" />, text: "500+ Active Members" },
                { icon: <Rocket className="w-6 h-6 text-ms-orange" />, text: "24-Hour Hackathons" },
                { icon: <Lightbulb className="w-6 h-6 text-ms-green" />, text: "50+ Workshops" },
                { icon: <Users className="w-6 h-6 text-ms-blue" />, text: "Tech Community" },
                { icon: <Heart className="w-6 h-6 text-ms-purple" />, text: "Collaborative Learning" },
                { icon: <Calendar className="w-6 h-6 text-ms-neon" />, text: "Year-Round Events" },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 text-slate-700 dark:text-slate-300">
                  {item.icon}
                  <span className="text-lg font-semibold">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* Timeline Section */}
      <section id="timeline" ref={timelineRef} className="relative py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-ms-blue/5 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] bg-ms-purple/5 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow delay-500" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight tracking-tighter text-slate-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              From a small idea to a thriving community, every milestone has shaped who we are today
            </p>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-ms-blue/20 via-ms-neon/20 to-ms-purple/20 -translate-x-1/2 rounded-full center-line" />
            <ol className="relative z-10 space-y-24">
              {[
                {
                  icon: <Calendar className="w-12 h-12 text-ms-blue" />,
                  title: 'Founded',
                  desc: 'Microsoft Club was born from a passion for technology and community, starting with just 15 passionate students.',
                  year: '2021',
                  highlight: 'The Beginning'
                },
                {
                  icon: <Rocket className="w-12 h-12 text-ms-neon" />,
                  title: 'First Hackathon',
                  desc: 'Launched our first 24h hackathon with 100+ participants, igniting innovation campus-wide.',
                  year: '2022',
                  highlight: 'Breaking Ground'
                },
                {
                  icon: <Lightbulb className="w-12 h-12 text-ms-orange" />,
                  title: 'Workshops & Growth',
                  desc: 'Hosted 50+ workshops on cutting-edge technologies, growing a vibrant and diverse community of 300+ members.',
                  year: '2023',
                  highlight: 'Expanding Horizons'
                },
                {
                  icon: <Star className="w-12 h-12 text-ms-purple" />,
                  title: 'Recognition',
                  desc: 'Recognized as the leading tech club in the region, inspiring future leaders and innovators.',
                  year: '2024',
                  highlight: 'Achieving Excellence'
                },
              ].map((step, i) => (
                <li key={i} className={`timeline-step flex items-center gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="flex-1" />
                  <div className="timeline-icon-container flex flex-col items-center">
                    <div className="timeline-icon w-20 h-20 rounded-2xl bg-white/80 dark:bg-white/10 border border-white/20 shadow-xl flex items-center justify-center backdrop-blur-sm mx-4">
                      {step.icon}
                    </div>
                  </div>
                  {/* decorative marker aligned to center line */}
                  <span className="timeline-marker" aria-hidden="true" />
                  <div className="timeline-card flex-1 bg-white/80 dark:bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20 backdrop-blur-sm hover:scale-105 transition-all duration-500 soft-glow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 bg-ms-blue/10 text-ms-blue text-sm font-semibold rounded-full mb-2">
                          {step.highlight}
                        </span>
                        <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-1">{step.title}</h3>
                        <span className="text-lg font-bold text-ms-blue font-display">{step.year}</span>
                      </div>
                    </div>
                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section ref={valuesRef} className="relative py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-[45vw] h-[45vw] bg-ms-neon/5 rounded-full blur-[90px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow" />
          <div className="absolute bottom-1/3 left-1/4 w-[40vw] h-[40vw] bg-ms-orange/5 rounded-full blur-[70px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow delay-700" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight tracking-tighter text-slate-900 dark:text-white mb-4">
              What Drives Us
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Our core values shape everything we do, from workshops to hackathons
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Heart className="w-12 h-12" />,
                title: 'Collaboration',
                desc: 'We believe in the power of teamwork and shared learning. Great ideas emerge when diverse minds come together.',
                color: 'text-ms-blue',
                bgColor: 'bg-ms-blue/10',
                borderColor: 'border-ms-blue/20'
              },
              {
                icon: <Lightbulb className="w-12 h-12" />,
                title: 'Innovation',
                desc: 'We foster creativity and encourage bold new ideas. Innovation happens at the intersection of curiosity and courage.',
                color: 'text-ms-orange',
                bgColor: 'bg-ms-orange/10',
                borderColor: 'border-ms-orange/20'
              },
              {
                icon: <Star className="w-12 h-12" />,
                title: 'Excellence',
                desc: 'We strive for quality and impact in everything we do. Excellence is not a destination, but a continuous journey.',
                color: 'text-ms-purple',
                bgColor: 'bg-ms-purple/10',
                borderColor: 'border-ms-purple/20'
              },
            ].map((value, i) => (
              <div key={i} className="value-card group p-8 rounded-3xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-sm hover:bg-white dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${value.bgColor} ${value.borderColor} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <span className={value.color}>{value.icon}</span>
                </div>
                <h3 className={`text-2xl font-bold font-display mb-4 ${value.color}`}>{value.title}</h3>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-gradient-to-r from-ms-blue/10 to-ms-purple/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">
              Ready to Join Our Journey?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Whether you're a beginner exploring technology or an experienced developer looking to make an impact, 
              there's a place for you in our community. Together, we're shaping the future, one innovation at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group px-8 py-4 bg-ms-blue text-white font-bold text-lg rounded-full hover:scale-105 hover:shadow-2xl transition-all">
                <span className="flex items-center gap-2">
                  Join the Community
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <a href="/events" className="group px-8 py-4 border-2 border-ms-purple text-ms-purple font-bold text-lg rounded-full hover:bg-ms-purple hover:text-white transition-all inline-flex items-center justify-center">
                <span className="flex items-center gap-2">
                  Explore Events
                  <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </span>
              </a>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-6">
              No experience required • All skill levels welcome • Join 500+ tech enthusiasts
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
