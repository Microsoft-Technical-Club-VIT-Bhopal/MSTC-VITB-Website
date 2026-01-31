import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from './SplitText';

gsap.registerPlugin(ScrollTrigger);

const StatCard = ({ number, label, suffix = "+", delay = 0 }) => {
    const numRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        const el = numRef.current;
        if (!el) return;

        gsap.fromTo(el, 
            { innerText: 0 },
            {
                innerText: number,
                duration: 2,
                ease: "power2.out",
                snap: { innerText: 1 },
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 85%",
                }
            }
        );
    }, [number]);

    return (
        <div ref={cardRef} className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-md flex flex-col items-center justify-center text-center group hover:-translate-y-2 transition-transform duration-300 shadow-lg dark:shadow-none">
            <div className="relative">
                <h3 className="text-6xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-500 dark:from-white dark:to-white/50 group-hover:from-ms-blue group-hover:to-ms-neon transition-all duration-500">
                    <span ref={numRef}>0</span>{suffix}
                </h3>
                 <div className="absolute inset-0 bg-ms-blue/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </div>
            <p className="mt-4 text-gray-500 dark:text-ms-dim uppercase tracking-widest text-sm font-bold group-hover:text-ms-blue dark:group-hover:text-white transition-colors">
                {label}
            </p>
        </div>
    );
};

const TestimonialCard = ({ quote, author, role }) => (
    <div className="flex-shrink-0 w-[400px] p-8 mx-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 transition-all duration-300 opacity-70 hover:opacity-100 shadow-sm dark:shadow-none">
        <p className="font-body italic text-lg text-gray-600 dark:text-gray-300 mb-6 font-light leading-relaxed">"{quote}"</p>
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ms-blue to-ms-violet shadow-md" />
            <div>
                <h5 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider">{author}</h5>
                <p className="text-xs text-gray-500 dark:text-ms-dim">{role}</p>
            </div>
        </div>
    </div>
);

const StatsBento = () => {
    const scrollRef = useRef(null);

    return (
        <section className="relative py-20 px-6 overflow-hidden bg-gray-50 dark:bg-black transition-colors duration-500">
             {/* Background Elements */}
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-ms-blue/5 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-ms-violet/5 rounded-full blur-[80px] -z-10" />

            <div className="max-w-7xl mx-auto rounded-[3rem] bg-white dark:bg-ms-obsidian p-12 md:p-24 shadow-2xl relative overflow-hidden border border-gray-100 dark:border-white/5">
                {/* Decorative gradients for the "Island" */}
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-ms-blue/5 blur-3xl rounded-full" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-ms-violet/5 blur-3xl rounded-full" />

                {/* Header */}
                <div className="text-center mb-16">
                    <SplitText
                        text="By the Numbers"
                        className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4"
                        delay={50}
                        duration={0.8}
                        splitType="words"
                    />
                    <p className="text-gray-500 dark:text-ms-dim max-w-xl mx-auto uppercase tracking-tighter">Impact that speaks for itself</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative z-10">
                    <StatCard number={120} label="Active Members" />
                    <StatCard number={1500} label="Total Participants" />
                    <StatCard number={25} label="No of Events" />
                </div>

                {/* Testimonials Ticker */}
                <div className="relative w-full overflow-hidden mask-linear-fade">
                     <div className="flex animate-ticker w-max hover:[animation-play-state:paused]">
                        {[1, 2, 3, 4].map((i) => (
                            <React.Fragment key={i}>
                                <TestimonialCard 
                                    quote="The best technical community I've ever been part of. Truly changed my career trajectory."
                                    author="Anita Roy"
                                    role="SDE @ Microsoft"
                                />
                                <TestimonialCard 
                                    quote="Code Garuda was an intense experience! Learned more in 24 hours than 2 months of classes."
                                    author="Rahil Khan"
                                    role="Full Stack Dev"
                                />
                                <TestimonialCard 
                                    quote="Incredible mentorship and resources. The workshops are top-tier."
                                    author="Sana Mir"
                                    role="Data Scientist"
                                />
                            </React.Fragment>
                        ))}
                     </div>
                </div>
            </div>
            
            <style jsx>{`
                .mask-linear-fade {
                    mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
                    -webkit-mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
                }
            `}</style>
        </section>
    );
};

export default StatsBento;
