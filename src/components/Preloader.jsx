import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
    const containerRef = useRef(null);
    const squaresRef = useRef(null);
    const contentRef = useRef(null);
    const [progress, setProgress] = useState(0);

    const phrases = ["Initializing Chaos", "Coding Future", "Crafting Magic", "Syncing Vision"];
    const [activePhrase, setActivePhrase] = useState(phrases[0]);

    useEffect(() => {
        const phraseInterval = setInterval(() => {
            setActivePhrase(prev => {
                const idx = phrases.indexOf(prev);
                return phrases[(idx + 1) % phrases.length];
            });
        }, 500);

        const tl = gsap.timeline({
            onComplete: () => {
                // Funky exit: Scale up and fade out
                gsap.to(containerRef.current, {
                    clipPath: "circle(0% at 50% 50%)",
                    duration: 1,
                    ease: "power4.inOut",
                    onComplete: onComplete
                });
            }
        });

        // 1. Initial State
        tl.set(".preloader-text", { y: 20, opacity: 0 });

        // 2. Logo Animation (Staggered)
        if (squaresRef.current) {
            const squares = squaresRef.current.children;
            tl.fromTo(squares, 
                { scale: 0, rotation: -180, opacity: 0 },
                { 
                    scale: 1, 
                    rotation: 0, 
                    opacity: 1, 
                    duration: 0.8, 
                    stagger: 0.1, 
                    ease: "back.out(2)" 
                }
            );
        }

        // 3. Reveal Text
        tl.to(".preloader-text", {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.4");

        // 4. Counter Animation
        let count = { val: 0 };
        tl.to(count, {
            val: 100,
            duration: 2.5,
            ease: "power3.inOut",
            onUpdate: () => setProgress(Math.floor(count.val))
        }, "<");

        // 5. Final Logo Spin & Blast
        if(squaresRef.current){
             tl.to(squaresRef.current, {
                rotation: 360,
                scale: 1.5,
                opacity: 0,
                duration: 0.8,
                ease: "expo.in"
            }, "-=0.2");
        }

        // 6. Content Blur & Fade
        tl.to(contentRef.current, {
            filter: "blur(20px)",
            opacity: 0,
            duration: 0.5
        }, "<");

        return () => {
            tl.kill();
            clearInterval(phraseInterval);
        };
    }, [onComplete]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-ms-obsidian overflow-hidden">
             {/* Dynamic Noise & Grid */}
            <div className="absolute inset-0 opacity-[0.03] pattern-grid-lg pointer-events-none"></div>
            <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none"></div>
            
            {/* Animated Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-ms-blue/20 blur-[120px] rounded-full animate-pulse"></div>
            
            <div ref={contentRef} className="relative z-10 flex flex-col items-center justify-center gap-12">
                {/* MSTC Logo (Neobrutalist Style) */}
                <div ref={squaresRef} className="grid grid-cols-2 gap-4 p-4 scale-125">
                    {/* Red */}
                    <div className="w-12 h-12 bg-[#F25022] border-2 border-white/20 shadow-[0px_6px_0px_0px_rgba(242,80,34,0.3)]"></div>
                    {/* Green */}
                    <div className="w-12 h-12 bg-[#7FBA00] border-2 border-white/20 shadow-[0px_6px_0px_0px_rgba(127,186,0,0.3)]"></div>
                    {/* Blue */}
                    <div className="w-12 h-12 bg-[#00A4EF] border-2 border-white/20 shadow-[0px_6px_0px_0px_rgba(0,164,239,0.3)]"></div>
                    {/* Yellow */}
                    <div className="w-12 h-12 bg-[#FFB900] border-2 border-white/20 shadow-[0px_6px_0px_0px_rgba(255,185,0,0.3)]"></div>
                </div>

                <div className="flex flex-col items-center gap-2 px-10">
                    {/* Giant Progress */}
                    <div className="relative">
                        <span className="text-[12vw] sm:text-[8vw] font-black font-display text-white tracking-tighter leading-tight italic select-none block px-4">
                            {progress.toString().padStart(2, '0')}
                        </span>
                        {/* Shadow copy for depth */}
                        <span className="absolute top-2 left-6 text-[12vw] sm:text-[8vw] font-black font-display text-ms-blue/20 tracking-tighter leading-tight italic -z-10 block">
                            {progress.toString().padStart(2, '0')}
                        </span>
                    </div>
                    
                    {/* Dynamic Phrases */}
                    <div className="preloader-text overflow-hidden h-8">
                        <div className="text-ms-neon font-black tracking-widest uppercase text-xs md:text-sm text-center">
                            {activePhrase}
                        </div>
                    </div>
                </div>
                
                {/* Progress bar (Neobrutalist) */}
                <div className="preloader-text w-48 h-3 bg-white/10 p-0.5 border-2 border-white/20 rotate-1">
                    <div 
                        className="h-full bg-ms-blue transition-all duration-100 ease-linear shadow-[0_0_15px_#00A4EF]"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
