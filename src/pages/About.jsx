import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Users, Rocket, Calendar, Star, Lightbulb, Trophy, Target, Zap, Heart, Shield, Globe, Code, Award, TrendingUp } from 'lucide-react';
import SplitText from '../components/SplitText';
import FunkyBackground from '../components/FunkyBackground';

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
  const impactRef = useRef(null); // Added impactRef
  const [isReady, setIsReady] = useState(false);
  
  // Dynamic Statistics State
  const [stats, setStats] = useState([
    { value: 500, suffix: '+', label: 'Community Members', color: 'text-ms-blue' },
    { value: 50, suffix: '+', label: 'Events & Workshops', color: 'text-ms-purple' },
    { value: 24, suffix: 'h', label: 'Hackathon Duration', color: 'text-ms-neon' },
    { value: 100, suffix: '%', label: 'Passion Driven', color: 'text-green-400' }
  ]);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Hero Content Reveal (Staggered)
    tl.fromTo(".about-reveal-item", 
        { autoAlpha: 0, y: 30 },
        { 
            autoAlpha: 1, 
            y: 0, 
            duration: 1, 
            stagger: 0.15, 
            ease: "expo.out",
            clearProps: "opacity,visibility,transform" 
        }
    );

  }, { dependencies: [] });

  // Mission & Vision animations
  const missionRef = useRef();
  const visionRef = useRef();
  

  return (
    <div className="min-h-screen pt-24 lg:pt-40 relative overflow-x-hidden bg-ms-paper dark:bg-black transition-colors duration-500">
        <FunkyBackground />
        
        <style>{` 
        /* Marquee Animations */
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
        /* Scan Line Animation */
        @keyframes scan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
        }
        .animate-scan {
            animation: scan 4s linear infinite;
        }
      `}</style>
      
      <section ref={heroRef} className="relative z-10 py-12 lg:py-0 lg:min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
            {/* Text Content */}
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-center lg:text-left order-1">
              <div className="space-y-4 about-reveal-item">
                <div className="inline-block transform lg:-rotate-2">
                    <SplitText
                    text="Innovate. Create. Inspire."
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black font-display leading-none tracking-tighter text-slate-900 dark:text-white break-words"
                    delay={40}
                    trigger={true}
                    />
                </div>
                <div className="h-2 w-32 bg-ms-blue rounded-full mx-auto lg:mx-0 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>
              </div>
              <div ref={heroTextRef} className="space-y-3 sm:space-y-4 bg-white/80 dark:bg-black/80 backdrop-blur-sm p-6 rounded-2xl border-4 border-slate-900 dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transform lg:rotate-1 about-reveal-item">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-900 dark:text-white max-w-full lg:max-w-2xl font-bold leading-relaxed break-words">
                  We are the <span className="text-ms-blue font-black underline decoration-4 underline-offset-4 decoration-ms-yellow">Connectors</span> a vibrant community bridging students, technology, and opportunity to forge tomorrow's solutions, today.
                </p>
                <div className="space-y-2 sm:space-y-3">
                  <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg text-slate-700 dark:text-slate-300 italic font-medium">
                    "Where passion meets innovation and dreams become reality"
                  </p>
                  <p className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-base text-slate-900 dark:text-white max-w-full lg:max-w-lg font-medium">
                    Founded in 2021, we've grown from a small group of tech enthusiasts to a thriving community of 500+ members, 
                    united by our shared passion for technology and innovation.
                  </p>
                </div>
              </div>
              <div ref={heroCtaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4 sm:mt-6 lg:mt-8 about-reveal-item">
                <a href="#timeline" className="group relative px-6 py-3 bg-ms-blue text-white font-black text-lg rounded-xl border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                    <span className="flex items-center gap-2">
                        <Rocket className="w-5 h-5" />
                        Our Journey
                        <ArrowRight className="w-5 h-5" />
                    </span>
                </a>
                <a href="/events" className="group relative px-6 py-3 bg-white text-slate-900 font-black text-lg rounded-xl border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                    <span className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Explore Events
                    </span>
                </a>
              </div>
            </div>
            
            {/* Enhanced Vision Card */}
            <div ref={heroCardsRef} className="w-full lg:w-5/12 flex items-center justify-center order-2 about-reveal-item">
              <div className="relative w-full max-w-[320px] sm:max-w-sm lg:max-w-lg transform lg:rotate-2 hover:rotate-0 transition-transform duration-300 group">
                <div className="relative h-72 sm:h-80 lg:h-96 xl:h-[28rem] rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
                  {/* Decorative BG & Scanner Line */}
                  <div className="absolute inset-0 bg-ms-paper dark:bg-slate-800 opacity-50 pattern-grid-lg"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ms-blue/10 to-transparent h-full w-full animate-scan pointer-events-none"></div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 z-10">
                    <div className="text-center space-y-6">
                        {/* Modern Icon Container */}
                        <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                            <svg className="absolute inset-0 w-full h-full text-slate-900 dark:text-white" viewBox="0 0 100 100" fill="currentColor">
                                <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" />
                            </svg>
                            <Code className="relative z-10 w-10 h-10 text-white dark:text-slate-900" />
                        </div>
        
                      {/* MSTC Branding */}
                      <div className="relative">
                          <h2 className="text-5xl lg:text-7xl font-black font-display text-slate-900 dark:text-white tracking-tighter" style={{ textShadow: '4px 4px 0px #00a4ef' }}>
                              MSTC
                          </h2>
                          <span className="absolute -top-4 -right-8 bg-ms-yellow text-slate-900 text-xs font-black px-2 py-1 transform rotate-12 border-2 border-slate-900">
                              EST. 2021
                          </span>
                      </div>
                      
                      <div className="inline-block px-4 py-2 bg-slate-900 text-white font-black text-sm uppercase tracking-widest border-2 border-white transform -rotate-1 shadow-[4px_4px_0px_0px_#7fba00]">
                        VIT BHOPAL
                      </div>
                      
                      {/* Tagline */}
                      <div className="space-y-2 mt-4 ml-2">
                        <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                          Building Tech Leaders
                        </p>
                      </div>
                      
                      {/* Achievement Badges */}
                      <div className="flex flex-wrap justify-center gap-3 mt-4">
                        <span className="px-3 py-1 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-bold rounded-lg border-2 border-slate-900 dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] flex items-center gap-1">
                          <Zap className="w-3 h-3 fill-ms-yellow text-ms-yellow" /> Premier Club
                        </span>
                        <span className="px-3 py-1 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-bold rounded-lg border-2 border-slate-900 dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] flex items-center gap-1">
                          <Globe className="w-3 h-3 text-ms-blue" /> Global Network
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="stats-section relative py-24 z-10">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight tracking-tighter text-slate-900 dark:text-white mb-4 bg-white dark:bg-black inline-block px-4 border-4 border-slate-900 dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transform -rotate-1">
              By the Numbers
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { 
                value: 500, 
                label: 'Active Members', 
                color: 'text-ms-blue', 
                bg: 'bg-white dark:bg-slate-900',
                suffix: '+', 
                icon: "/svg/community.svg",
                description: 'Passionate tech enthusiasts',
                rotate: 'rotate-1',
                iconShadow: 'dark:shadow-icon-blue'
              },
              { 
                value: 50, 
                label: 'Workshops Hosted', 
                color: 'text-ms-green', 
                bg: 'bg-white dark:bg-slate-900',
                suffix: '+', 
                icon: "/svg/bulb.svg",
                description: 'Hands-on learning experiences',
                rotate: '-rotate-2',
                iconShadow: 'dark:shadow-icon-green'
              },
              { 
                value: 24, 
                label: 'Hackathon Duration', 
                color: 'text-ms-orange', 
                bg: 'bg-white dark:bg-slate-900',
                suffix: 'h', 
                icon: "/svg/rocket.svg",
                description: 'Non-stop innovation',
                rotate: 'rotate-2',
                iconShadow: 'dark:shadow-icon-orange'
              },
            ].map((stat, index) => (
              <div key={index} className={`brutalist-card group p-8 rounded-2xl ${stat.bg} border-4 border-slate-900 dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transform ${stat.rotate} hover:rotate-0 hover:translate-x-[2px] hover:translate-y-[2px] hover:!shadow-none dark:hover:!shadow-none transition-all duration-300 text-center`}>
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center relative">
                   {/* Icon shape – same pressed effect on hover as card */}
                   <div className={`absolute inset-0 rounded-2xl border-2 border-slate-900 dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.35)] ${stat.iconShadow} group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:!shadow-none dark:group-hover:!shadow-none transition-all duration-300 flex items-center justify-center`}>
                      <img src={stat.icon} alt={stat.label} className="w-10 h-10 dark:invert" />
                   </div>
                </div>
                <h3 className={`text-5xl font-black font-display mb-2 ${stat.color} flex justify-center items-center`}>
                  <Counter value={stat.value} triggerSelector=".stats-section" />
                  <span>{stat.suffix}</span>
                </h3>
                <p className="text-xl font-bold text-slate-900 dark:text-white mb-2 uppercase">{stat.label}</p>
                <p className="text-slate-600 dark:text-slate-400 font-medium">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative py-12 sm:py-16 lg:py-24 overflow-hidden z-10">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Mission */}
            <div ref={missionRef} className="group relative">
              <div className="relative bg-white dark:bg-slate-900 rounded-[2rem] p-8 border-4 border-slate-900 dark:border-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] transform rotate-1 hover:rotate-0 hover:translate-x-[3px] hover:translate-y-[3px] hover:!shadow-none dark:hover:!shadow-none transition-all duration-200">
                <div className="space-y-4">
                    <div className="absolute -top-6 left-8 bg-ms-blue text-white px-4 py-1 font-black uppercase text-sm border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
                        Our Purpose
                    </div>
                  <div className="space-y-4 pt-4">
                    <h2 className="text-4xl font-display font-black text-slate-900 dark:text-white">
                      Our Mission
                    </h2>
                  </div>
                  <p className="text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    To create an inclusive ecosystem where technology enthusiasts can collaborate, innovate, and grow together. 
                    We believe in democratizing technology education and providing platforms for students to transform their ideas into impactful solutions.
                  </p>
                  <blockquote className="bg-ms-yellow/10 dark:bg-slate-800/50 p-4 rounded-xl border-l-4 border-slate-900 dark:border-white italic text-slate-900 dark:text-white font-bold text-base">
                    "Empowering every student with the tools, knowledge, and community to shape the future of technology"
                  </blockquote>
                </div>
              </div>
            </div>
            
            {/* Vision */}
            <div ref={visionRef} className="group relative mt-12 lg:mt-0">
              <div className="relative bg-white dark:bg-slate-900 rounded-[2rem] p-8 border-4 border-slate-900 dark:border-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] transform -rotate-1 hover:rotate-0 hover:translate-x-[3px] hover:translate-y-[3px] hover:!shadow-none dark:hover:!shadow-none transition-all duration-200">
                <div className="space-y-4">
                    <div className="absolute -top-6 left-8 bg-ms-neon text-black px-4 py-1 font-black uppercase text-sm border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
                        Future Goals
                    </div>
                  <div className="space-y-4 pt-4">
                    <h2 className="text-4xl font-display font-black text-slate-900 dark:text-white">
                      Our Vision
                    </h2>
                  </div>
                  <p className="text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    To be the leading student-run technology community that bridges the gap between academic learning and real-world innovation. 
                    We aspire to create a generation of tech leaders who are not just skilled professionals but also compassionate innovators.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories Section */}
      <section ref={impactRef} className="relative py-12 sm:py-16 lg:py-24 z-10">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white mb-4">
              Impact Stories
            </h2>
            <p className="text-xl text-slate-900 dark:text-white font-bold bg-ms-yellow/10 dark:bg-slate-800/50 inline-block px-4 py-1 transform -rotate-1">
              Real stories of growth, innovation, and success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
                { icon: "/svg/rocket.svg", color: 'text-ms-blue', title: 'From Idea to Impact', quote: "The hackathon organized by MSTC was the turning point in my journey. It gave me the confidence to pursue my startup idea.", author: "Alumni, Class of 2023", rotate: "rotate-1", iconShadow: 'dark:shadow-icon-blue' },
                { icon: "/svg/bulb.svg", color: 'text-ms-purple', title: 'Skills That Matter', quote: "The workshops and mentorship programs helped me land my dream internship at a leading tech company.", author: "Final Year Student", rotate: "-rotate-2", iconShadow: 'dark:shadow-icon-purple' },
                { icon: "/svg/community.svg", color: 'text-ms-neon', title: 'Community First', quote: "The friendships and connections I made here are priceless. We're not just a club, we're a family.", author: "Active Member", rotate: "rotate-2", iconShadow: 'dark:shadow-icon-neon' }
            ].map((story, i) => (
                <div key={i} className={`brutalist-card group p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transform ${story.rotate} hover:!shadow-none dark:hover:!shadow-none hover:rotate-0 hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200`}>
                <div className="w-16 h-16 relative flex items-center justify-center mb-6">
                    {/* Diamond shape – same pressed effect on hover as card */}
                    <div className={`absolute inset-0 border-2 border-slate-900 dark:border-white rounded-xl transform rotate-45 group-hover:rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.35)] ${story.iconShadow} group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:!shadow-none dark:group-hover:!shadow-none transition-all duration-200`}></div>
                    <img src={story.icon} alt={story.title} className="w-8 h-8 relative z-10 dark:invert" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 uppercase">{story.title}</h3>
                <p className="text-base text-slate-700 dark:text-slate-300 mb-4 font-medium italic">
                    "{story.quote}"
                </p>
                <div className="text-sm font-bold text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-800 inline-block px-2 py-1 rounded">
                    — {story.author}
                </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="relative py-12 overflow-hidden z-20 transform -rotate-2 w-[110vw] -left-[5vw]">
        <div className="absolute inset-0 bg-slate-900 border-y-4 border-slate-900 shadow-[0px_10px_0px_0px_rgba(0,0,0,0.2)]"></div>
        <div className="relative">
          <div className="flex animate-marquee whitespace-nowrap py-4">
            <div className="flex items-center space-x-16 px-4">
              {[
                { icon: <Star className="w-8 h-8" />, text: "500+ Active Members" },
                { icon: <Rocket className="w-8 h-8" />, text: "24-Hour Hackathons" },
                { icon: <Lightbulb className="w-8 h-8" />, text: "50+ Workshops" },
                { icon: <Users className="w-8 h-8" />, text: "Tech Community" },
                { icon: <Heart className="w-8 h-8" />, text: "Collaborative Learning" },
                { icon: <Calendar className="w-8 h-8" />, text: "Year-Round Events" },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4 text-white group cursor-default">
                   <div className="w-16 h-16 bg-ms-blue border-4 border-white shadow-[4px_4px_0px_0px_#000000] flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                      {item.icon}
                   </div>
                  <span className="text-4xl font-black font-display uppercase tracking-wider text-outline-white hover:text-ms-yellow transition-colors">{item.text}</span>
                </div>
              ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex items-center space-x-16 px-4">
             {[
                { icon: <Star className="w-8 h-8" />, text: "500+ Active Members" },
                { icon: <Rocket className="w-8 h-8" />, text: "24-Hour Hackathons" },
                { icon: <Lightbulb className="w-8 h-8" />, text: "50+ Workshops" },
                { icon: <Users className="w-8 h-8" />, text: "Tech Community" },
                { icon: <Heart className="w-8 h-8" />, text: "Collaborative Learning" },
                { icon: <Calendar className="w-8 h-8" />, text: "Year-Round Events" },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4 text-white group cursor-default">
                    <div className="w-16 h-16 bg-ms-blue border-4 border-white shadow-[4px_4px_0px_0px_#000000] flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                      {item.icon}
                   </div>
                    <span className="text-4xl font-black font-display uppercase tracking-wider text-outline-white hover:text-ms-yellow transition-colors">{item.text}</span>
                </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" ref={timelineRef} className="relative py-24 z-10">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight tracking-tighter text-slate-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto font-bold">
              From a small idea to a thriving community.
            </p>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            {/* Thick Center Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-2 bg-slate-900 dark:bg-white md:-translate-x-1/2" />
            
            <ol className="relative z-10 space-y-16">
              {[
                {
                  icon: "/svg/calender.svg",
                  title: 'Founded',
                  desc: 'Microsoft Club was born from a passion for technology and community, starting with just 15 passionate students.',
                  year: '2021',
                  highlight: 'The Beginning',
                  color: 'bg-ms-blue',
                  iconShadow: 'dark:shadow-icon-blue'
                },
                {
                  icon: "/svg/first.svg",
                  title: 'First Hackathon',
                  desc: 'Launched our first 24h hackathon with 100+ participants, igniting innovation campus-wide.',
                  year: '2022',
                  highlight: 'Breaking Ground',
                  color: 'bg-ms-neon',
                  iconShadow: 'dark:shadow-icon-neon'
                },
                {
                  icon: "/svg/bulb.svg",
                  title: 'Workshops & Growth',
                  desc: 'Hosted 50+ workshops on cutting-edge technologies, growing a vibrant and diverse community of 300+ members.',
                  year: '2023',
                  highlight: 'Expanding Horizons',
                  color: 'bg-ms-orange',
                  iconShadow: 'dark:shadow-icon-orange'
                },
                {
                  icon: "/svg/recognition.svg",
                  title: 'Recognition',
                  desc: 'Recognized as the leading tech club in the region, inspiring future leaders and innovators.',
                  year: '2024',
                  highlight: 'Achieving Excellence',
                  color: 'bg-ms-purple',
                  iconShadow: 'dark:shadow-icon-violet'
                },
              ].map((step, i) => (
                <li key={i} className={`timeline-step group flex flex-col items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="flex-1 hidden md:block" />
                  
                  {/* Icon Marker – same pressed effect on hover as card */}
                  <div className={`relative z-10 ${i % 2 === 0 ? 'md:mr-10' : 'md:ml-10'}`}>
                    <div className={`w-16 h-16 ${step.color} border-4 border-slate-900 dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.35)] ${step.iconShadow} group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:!shadow-none dark:group-hover:!shadow-none flex items-center justify-center transform rotate-45 transition-all duration-200`}>
                      <div className="transform -rotate-45">
                        <img src={step.icon} alt={step.title} className="w-8 h-8 brightness-0 invert" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Card */}
                  <div className="timeline-card flex-1 w-full md:w-auto bg-white dark:bg-slate-900 rounded-2xl p-8 border-4 border-slate-900 dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:!shadow-none dark:hover:!shadow-none transition-all duration-200">
                    <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-slate-900 text-white text-xs font-black uppercase tracking-wider mb-2">
                          {step.highlight}
                        </span>
                        <div className="flex justify-between items-start">
                             <h3 className="text-2xl font-black font-display text-slate-900 dark:text-white">{step.title}</h3>
                             <span className={`text-2xl font-black ${step.color.replace('bg-', 'text-')} font-display`}>{step.year}</span>
                        </div>
                    </div>
                    <p className="text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section ref={valuesRef} className="relative py-24 z-10">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-slate-900 dark:text-white mb-4">
              What Drives Us
            </h2>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto font-bold">
              Our core values shape everything we do.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "/svg/collaboration.svg",
                title: 'Collaboration',
                desc: 'We believe in the power of teamwork and shared learning. Great ideas emerge when diverse minds come together.',
                color: 'text-ms-blue',
                bg: 'bg-ms-blue/10 dark:bg-ms-blue/20',
                border: 'border-ms-blue',
                iconShadow: 'dark:shadow-icon-blue'
              },
              {
                icon: "/svg/bulb.svg",
                title: 'Innovation',
                desc: 'We foster creativity and encourage bold new ideas. Innovation happens at the intersection of curiosity and courage.',
                color: 'text-ms-orange',
                bg: 'bg-ms-orange/10 dark:bg-ms-orange/20',
                border: 'border-ms-orange',
                iconShadow: 'dark:shadow-icon-orange'
              },
              {
                icon: "/svg/world.svg",
                title: 'Inclusivity',
                desc: 'Technology is for everyone. We strive to create a welcoming space where anyone can learn and grow.',
                color: 'text-ms-green',
                bg: 'bg-ms-green/10 dark:bg-ms-green/20',
                border: 'border-ms-green',
                iconShadow: 'dark:shadow-icon-green'
              }
            ].map((value, i) => (
                <div key={i} className={`group p-8 bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-white rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:!shadow-none dark:hover:!shadow-none transition-all duration-200`}>
                    <div className={`w-20 h-20 mb-6 rounded-full ${value.bg} border-4 ${value.border} shadow-[4px_4px_0px_0px_rgba(0,0,0,0.35)] ${value.iconShadow} group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:!shadow-none dark:group-hover:!shadow-none flex items-center justify-center transition-all duration-200`}>
                        <img src={value.icon} alt={value.title} className="w-10 h-10 dark:invert" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">{value.title}</h3>
                    <p className="text-lg text-slate-700 dark:text-slate-300 font-bold">{value.desc}</p>
                </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
