import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, ChevronRight, Users, Code, Trophy } from 'lucide-react';
import SplitText from './SplitText';

const Hero = () => {
    const heroTextRef = useRef(null);
    const cardsRef = useRef(null);
    const ctaRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Sync with preloader completion
        const timer = setTimeout(() => setIsReady(true), 3500);
        
        const tl = gsap.timeline({ delay: 4 }); // Delay rest of hero content slightly after title starts

        tl.fromTo(cardsRef.current.children,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" },
            "-=0.5"
        )
        .fromTo(ctaRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
            "-=0.5"
        );
        return () => {
            clearTimeout(timer);
            if (tl) tl.kill();
        };
    }, []);

    const features = [
        {
            icon: <Users size={32} className="text-ms-blue" />,
            title: "Join",
            desc: "Become part of a thriving community of tech enthusiasts and innovators."
        },
        {
            icon: <Code size={32} className="text-ms-violet" />,
            title: "Learn",
            desc: "Master industry-grade skills through hands-on workshops and expert guidance."
        },
        {
            icon: <Trophy size={32} className="text-ms-neon" />,
            title: "Participate",
            desc: "Compete in high-stakes hackathons and build projects that matter."
        }
    ];

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-32 lg:pt-40 bg-gray-50 dark:bg-ms-obsidian transition-colors duration-500">
            {/* Abstract Background Elements (Replaces 3D) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-ms-blue/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-ms-violet/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow delay-1000" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center text-center">
                
                {/* Main Headline */}
                <div className="relative mb-16 mt-10">
                    <SplitText
                        text="Connect. Create. Collaborate."
                        className="text-5xl md:text-8xl font-display font-black leading-tight tracking-tighter text-gray-900 dark:text-gray-100 transition-colors duration-500 cursor-default select-none pb-4"
                        delay={40}
                        duration={1.2}
                        ease="power4.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 80, rotateX: 30, filter: 'blur(10px)' }}
                        to={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                        trigger={isReady}
                    />
                    <div ref={heroTextRef}>
                        <p className="mt-4 text-xl md:text-2xl text-gray-600 dark:text-ms-dim max-w-2xl mx-auto font-light">
                        Empowering the next generation of <span className="text-ms-blue font-medium">visionaries</span> to turn ideas into reality.
                    </p>
                </div>
            </div>

                {/* Feature Cards */}
                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-12">
                    {features.map((feature, idx) => (
                        <div key={idx} className="group p-8 rounded-3xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-sm hover:bg-white dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                            <div className="mb-4 bg-gray-100 dark:bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-ms-dim leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTAs */}
                <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 items-center mb-12">
                    <button className="group relative px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-2xl">
                        <span className="relative z-10 flex items-center gap-2">
                            Join the Club <ChevronRight size={20} />
                        </span>
                    </button>

                    <button className="group flex items-center gap-2 text-gray-900 dark:text-ms-white font-medium text-lg px-8 py-4 rounded-full border border-gray-300 dark:border-white/10 hover:border-gray-900 dark:hover:border-white/30 hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
                        Explore Events 
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
