import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitText from './SplitText';
import FunkyBackground from './FunkyBackground';
import { ArrowRight, Sparkles, Code, Globe, ChevronDown } from 'lucide-react';
import TicTacToe from './TicTacToe';
import ConnectDots from './ConnectDots';

const Hero = () => {
    const heroRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(true);
    }, []);

    useGSAP(() => {
        if (!isReady) return;

        const tl = gsap.timeline();

        // Staggered Text Reveal
        tl.from(".hero-word", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1.7)",
        })
        .from(".hero-desc", {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.5")
         .fromTo(".cta-btn", 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
            "-=0.5"
         );

    }, { scope: heroRef, dependencies: [isReady] });

    const features = [
        { icon: Globe, title: "Join", desc: "A thriving community.", rotate: "rotate-2", color: "bg-ms-blue" },
        { icon: Code, title: "Learn", desc: "Industry-standard skills.", rotate: "-rotate-1", color: "bg-ms-violet" },
        { icon: Sparkles, title: "Win", desc: "High-stakes hackathons.", rotate: "rotate-3", color: "bg-ms-neon" },
    ];

    return (
        <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-40">
            <FunkyBackground />
            
            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center text-center px-4">
                
                {/* GIANT Funky Headline */}
                <div className="relative mb-6 flex flex-col items-center justify-center pointer-events-none select-none">
                    <div className="relative z-10 mix-blend-lighten dark:mix-blend-normal">
                         <SplitText
                             text="CODE."
                            className="text-[9vw] leading-[0.8] font-display font-black tracking-tighter text-slate-900 dark:text-white hero-word"
                            delay={10}
                            duration={0.8}
                            ease="back.out"
                            trigger={isReady}
                        />
                    </div>
                    <div className="relative z-20 -mt-[2vw] mix-blend-normal">
                        <SplitText
                            text="CRAFT."
                            className="text-[9vw] leading-[0.8] font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-ms-blue via-ms-violet to-ms-blue hero-word"
                            delay={50}
                             duration={0.8}
                             ease="back.out"
                             trigger={isReady}
                        />
                    </div>
                     <div className="relative z-10 -mt-[2vw] mix-blend-lighten dark:mix-blend-normal">
                         <SplitText
                            text="CHAOS."
                            className="text-[9vw] leading-[0.8] font-display font-black tracking-tighter text-slate-900 dark:text-white hero-word"
                            delay={90}
                             duration={0.8}
                             ease="back.out"
                             trigger={isReady}
                        />
                    </div>
                </div>

                {/* Funky Description Box */}
                <div className="hero-desc backdrop-blur-md bg-white/30 dark:bg-black/30 border-2 border-slate-900 dark:border-white/20 p-6 rounded-[2rem] max-w-2xl mb-8 transform -rotate-1 shadow-lg">
                    <p className="text-xl md:text-2xl text-slate-900 dark:text-white font-medium leading-relaxed">
                        Empowering the next generation of <span className="font-black text-ms-blue">visionaries</span>.
                    </p>
                </div>

                {/* EXTRA FUNKY Cards - Z-50 FORCED */}
                <div className="relative z-50 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12 px-4">
                    {features.map((feature, idx) => (
                        <div 
                            key={idx} 
                            className={`funky-card group p-6 rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-lg rounded-bl-lg bg-white dark:bg-ms-obsidian border-4 border-slate-900 dark:border-white transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(15,23,42,0.2)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[10px_10px_0px_0px_#00A4EF] dark:hover:shadow-[10px_10px_0px_0px_#00A4EF] hover:-translate-y-2 hover:rotate-0 cursor-pointer overflow-hidden relative ${feature.rotate}`}
                        >
                            <div className={`absolute top-0 right-0 w-16 h-16 ${feature.color} opacity-20 rounded-bl-[2.5rem] transition-all duration-300 group-hover:scale-[10] group-hover:opacity-10`} />
                            
                            <feature.icon size={40} className="mb-3 text-slate-900 dark:text-white relative z-10" />
                            <h3 className="text-xl font-black font-display text-slate-900 dark:text-white mb-2 relative z-10">{feature.title}</h3>
                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider relative z-10">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Bouncy CTAs */}
                <div className="flex flex-col sm:flex-row gap-6 mt-8">
                    <button className="cta-btn px-8 py-4 bg-ms-blue text-white font-black text-xl rounded-full shadow-[0_10px_20px_rgba(0,164,239,0.3)] hover:shadow-[0_15px_30px_rgba(0,164,239,0.5)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center gap-2 group">
                        Join the Club <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="cta-btn px-8 py-4 bg-transparent border-4 border-slate-900 dark:border-white text-slate-900 dark:text-white font-black text-xl rounded-full hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black hover:scale-110 active:scale-95 transition-all duration-300">
                        Explore Events
                    </button>
                </div>

            </div>
            
            {/* MINI GAMES - VISIBLE ON DESKTOP (LG+) */}
            <div className="hidden lg:block absolute left-[5%] top-[12%] z-20 transform -rotate-6 scale-75 xl:scale-100">
                <TicTacToe />
            </div>
            <div className="hidden lg:block absolute right-[5%] top-[18%] z-20 transform rotate-6 scale-75 xl:scale-90">
                <ConnectDots />
            </div>

        </section>
    );
};

export default Hero;
