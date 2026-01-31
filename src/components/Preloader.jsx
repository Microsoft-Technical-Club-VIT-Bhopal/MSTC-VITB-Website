import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
    const containerRef = useRef(null);
    const bitsRef = useRef(null);
    const textRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Timeline for the squares animation (infinite loop while loading)
        const bitsTl = gsap.timeline({ repeat: -1, yoyo: true });
        const bits = bitsRef.current.children;

        // Animate the 4 bits
        bitsTl.fromTo(bits, 
            { scale: 0.8, opacity: 0.5 },
            { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.inOut" }
        );

        // Main Loading Logic
        const mainTl = gsap.timeline({
            onComplete: () => {
                // Exit Animation
                gsap.to(containerRef.current, {
                    y: '-100%',
                    duration: 1,
                    ease: "power4.inOut",
                    onComplete: onComplete
                });
            }
        });

        // Simulate Progress
        let counter = { val: 0 };
        mainTl.to(counter, {
            val: 100,
            duration: 3, // slightly longer for the animation to play
            ease: "expo.inOut",
            onUpdate: () => setProgress(Math.floor(counter.val))
        });

        // Text Reveal
        gsap.fromTo(textRef.current,
            { opacity: 0, y: 20, filter: 'blur(10px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, delay: 0.5 }
        );

        return () => {
            if (bitsTl) bitsTl.kill();
            if (mainTl) mainTl.kill();
        };
    }, [onComplete]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-center overflow-hidden">
            
            {/* 4 Bits Grid (Microsoft Logo Style) */}
            <div ref={bitsRef} className="grid grid-cols-2 gap-2 mb-8">
                {/* Top Left - Red-ish */}
                <div className="w-12 h-12 rounded-lg border-2 border-white/20 bg-white/5 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
                {/* Top Right - Green-ish */}
                <div className="w-12 h-12 rounded-lg border-2 border-white/20 bg-white/5 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
                {/* Bottom Left - Blue-ish */}
                <div className="w-12 h-12 rounded-lg border-2 border-white/20 bg-white/5 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
                {/* Bottom Right - Yellow-ish */}
                <div className="w-12 h-12 rounded-lg border-2 border-white/20 bg-white/5 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
            </div>

            {/* Bold Text */}
            <div className="relative">
                <h1 ref={textRef} className="text-6xl md:text-8xl font-display font-bold tracking-tighter text-white">
                    MS Club
                </h1>
                {/* Optional Progress Indicator */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-mono text-gray-500">
                    {progress}%
                </div>
            </div>
            
        </div>
    );
};

export default Preloader;
