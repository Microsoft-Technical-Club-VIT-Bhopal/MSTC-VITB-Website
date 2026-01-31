import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, MapPin } from 'lucide-react';
import SplitText from './SplitText';

gsap.registerPlugin(ScrollTrigger);

const EventCard = ({ title, subtitle, date, location, image, isPast }) => {
    return (
        <div className="relative flex-shrink-0 w-[80vw] md:w-[600px] h-[60vh] glass-panel rounded-2xl overflow-hidden group mx-4 transition-transform duration-500 hover:scale-[1.02] border border-gray-200 dark:border-white/10 shadow-xl">
            {/* Image Placeholder */}
            <div className="absolute inset-0 bg-gray-200 dark:bg-ms-dark/50 group-hover:bg-gray-300 dark:group-hover:bg-ms-dark/30 transition-colors duration-500" />
            
            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                    <div className="bg-white/90 dark:bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 shadow-sm">
                        <span className="text-xs font-bold tracking-widest uppercase text-gray-900 dark:text-white">{date}</span>
                    </div>
                    {isPast && (
                        <div className="bg-gray-200 dark:bg-ms-dim/20 backdrop-blur-md px-3 py-1 rounded border border-gray-300 dark:border-white/5">
                            <span className="text-xs text-gray-600 dark:text-ms-dim uppercase font-bold">PAST EVENT</span>
                        </div>
                    )}
                </div>

                <div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold leading-none mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-gray-900 dark:text-white">
                        {title}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-ms-dim mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {subtitle}
                    </p>

                    <div className="flex items-center justify-between border-t border-gray-300 dark:border-white/10 pt-6">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-ms-dim font-medium">
                            <MapPin size={16} />
                            <span className="text-sm">{location}</span>
                        </div>
                        <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-sm transform translate-y-20 group-hover:translate-y-0 transition-transform duration-500 hover:bg-ms-blue hover:text-white dark:hover:bg-ms-blue dark:hover:text-white">
                            View Details <ArrowUpRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Parallax Image Effect (Simulated with gradient for now) */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ms-obsidian via-ms-blue/20 to-ms-purple/20 opacity-60" />
        </div>
    );
};

const EventsScroll = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const section = sectionRef.current;
        if (!container || !section) return;

        const totalWidth = container.scrollWidth - window.innerWidth;

        const tl = gsap.to(container, {
            x: () => -totalWidth,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${totalWidth}`,
                scrub: 0.5,
                pin: true,
                invalidateOnRefresh: true,
                anticipatePin: 1,
            }
        });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative h-screen overflow-hidden bg-gray-50 dark:bg-ms-obsidian transition-colors duration-500">
            {/* Header / Ticket Stub */}
            <div className="absolute top-39 left-10 z-20 pointer-events-none">
                 <div className="flex items-center gap-4">
                     <div className="w-2 h-12 bg-ms-blue dark:bg-ms-neon shadow-[0_0_15px_rgba(0,164,239,0.5)]" />
                     <div>
                         <h4 className="text-gray-500 dark:text-ms-dim uppercase tracking-widest text-sm font-bold mb-1">Upcoming & Past</h4>
                         <SplitText
                            text="Events Timeline"
                            className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white"
                            delay={40}
                            duration={1}
                            splitType="chars"
                         />
                     </div>
                 </div>
            </div>

            <div ref={containerRef} className="flex h-full items-end pb-12 pl-[10vw] pr-[10vw] w-fit">
                <EventCard 
                    title="Code Garuda 3.0"
                    subtitle="Concept to Code in 24 Hours"
                    date="Oct 12, 2025"
                    location="Advitya Hall, VITB"
                />
                <EventCard 
                    title="Vainateya 2.0"
                    subtitle="Drone Tech & Robotics Workshop"
                    date="Nov 05, 2025"
                    location="Robotics Lab"
                />
                <EventCard 
                    title="Azure Cloud Summit"
                    subtitle="Deploying Scalable Apps"
                    date="Dec 01, 2025"
                    location="Auditorium"
                />
                <EventCard 
                    title="AI/ML Bootcamp"
                    subtitle="Zero to Hero in Neural Networks"
                    date="Jan 15, 2026"
                    location="Online / Lab 2"
                    isPast
                />
            </div>
        </section>
    );
};

export default EventsScroll;
