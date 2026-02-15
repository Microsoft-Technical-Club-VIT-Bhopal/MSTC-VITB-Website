import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StatBubble = ({ number, label, suffix = "+", colorClass, rotateClass, delay }) => {
    const bubbleRef = useRef(null);
    const numRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Count up animation
            gsap.fromTo(numRef.current,
                { innerText: 0 },
                {
                    innerText: number,
                    duration: 2.5,
                    ease: "power2.out",
                    snap: { innerText: 1 },
                    scrollTrigger: {
                        trigger: bubbleRef.current,
                        start: "top 80%",
                    }
                }
            );

            // Perma-float animation
            gsap.to(bubbleRef.current, {
                y: -20,
                rotation: 5,
                duration: "random(2, 4)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: delay
            });
        }, bubbleRef);

        return () => ctx.revert();
    }, [number, delay]);

    return (
        <div 
            ref={bubbleRef}
            className={`relative group w-64 h-64 md:w-80 md:h-80 flex flex-col items-center justify-center rounded-full border-4 ${colorClass} bg-white dark:bg-ms-obsidian shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer ${rotateClass}`}
        >
            <div className="text-center z-10">
                <h3 className="text-6xl md:text-8xl font-display font-black text-slate-800 dark:text-white mb-2">
                    <span ref={numRef}>0</span>{suffix}
                </h3>
                <p className="text-sm md:text-lg font-bold uppercase tracking-widest text-slate-500 dark:text-gray-400 group-hover:text-ms-blue transition-colors">
                    {label}
                </p>
            </div>
            
            {/* Inner Glow "Blob" */}
            <div className="absolute inset-4 rounded-full border-2 border-dashed border-gray-200 dark:border-white/10 animate-spin-slow opacity-50" />
        </div>
    );
};

const FunkyStats = () => {
    return (
        <section className="relative py-32 px-6 overflow-hidden bg-white dark:bg-black transition-colors duration-500 rounded-t-[3rem] md:rounded-t-[5rem] -mt-12 z-20 shadow-2xl border-t border-white/10">
            {/* Messy Background Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                 <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,50 Q25,30 50,50 T100,50" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-ms-blue animate-pulse-slow" />
                    <path d="M0,70 Q25,90 50,70 T100,70" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-ms-violet animate-pulse-slow delay-700" />
                 </svg>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col items-center">
                {/* Header - Sticky */}
                <div className="text-center mb-20 relative sticky top-4 z-0">
                    <h2 className="text-6xl md:text-9xl font-display font-black text-black dark:text-white tracking-tighter transform -rotate-2 drop-shadow-2xl">
                        IMPACT?
                    </h2>
                    <span className="absolute -bottom-4 right-0 bg-ms-neon text-black font-bold px-4 py-1 rotate-6 text-xl shadow-lg">
                        HUGE.
                    </span>
                </div>

                {/* Chaotic "Anti-Grid" Layout */}
                <div className="relative w-full flex flex-col md:flex-row flex-wrap justify-center items-center gap-12 md:gap-24">
                    
                    <div className="md:-mt-12">
                        <StatBubble 
                            number={25} 
                            label="Active Members" 
                            colorClass="border-ms-blue shadow-ms-blue/20" 
                            rotateClass="-rotate-6"
                            delay={0}
                        />
                    </div>

                    <div className="md:mt-12">
                        <StatBubble 
                            number={1500} 
                            label="Participants" 
                            colorClass="border-ms-violet shadow-ms-violet/20" 
                            rotateClass="rotate-3"
                            delay={0.5}
                        />
                    </div>

                    <div className="md:-mt-8">
                        <StatBubble 
                            number={5} 
                            label="Events Held" 
                            colorClass="border-ms-neon shadow-ms-neon/20" 
                            rotateClass="-rotate-3"
                            delay={1}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FunkyStats;
