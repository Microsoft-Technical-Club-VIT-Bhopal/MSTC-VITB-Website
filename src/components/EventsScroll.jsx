import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, MapPin } from 'lucide-react';
import SplitText from './SplitText';

gsap.registerPlugin(ScrollTrigger);

const EventCard = ({ title, subtitle, date, location, image, isPast, slug }) => {
    return (
        <div className="relative flex-shrink-0 w-[85vw] md:w-[480px] h-[50vh] md:h-[58vh] bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] rounded-3xl overflow-hidden group mx-6 flex flex-col transition-all duration-200 hover:translate-x-[8px] hover:translate-y-[8px] hover:!shadow-none dark:hover:!shadow-none">
            {/* Image Section */}
            <div className="h-2/5 border-b-4 border-slate-900 dark:border-white relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                {image && <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />}
                <div className="absolute inset-0 bg-ms-blue/20 dark:bg-ms-blue/10 mix-blend-overlay" />
                <div className="absolute top-4 left-4 z-10">
                    <span className="bg-ms-yellow text-slate-900 font-black px-3 py-1 border-2 border-slate-900 dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-200 text-[10px] md:text-xs uppercase inline-block">
                        {date}
                    </span>
                </div>
                {isPast && (
                    <div className="absolute top-4 right-4 z-10">
                        <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 font-bold px-2 py-1 border-2 border-slate-900 dark:border-white text-[10px] uppercase rounded">
                            Past Event
                        </span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                <div>
                    <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 dark:text-white leading-tight mb-2 uppercase group-hover:text-ms-blue transition-colors">
                        {title}
                    </h2>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium line-clamp-2">
                        {subtitle}
                    </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t-2 border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-wider">
                        <MapPin size={14} className="text-ms-blue" />
                        <span>{location}</span>
                    </div>
                    <Link to={`/events/${slug}`} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ms-blue text-white font-black text-sm border-2 border-slate-900 dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none dark:hover:shadow-none transition-all duration-200">
                        View <ArrowUpRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

import eventsData from '../data/events.json';
import { Link } from 'react-router-dom';

const EventsScroll = () => {
    const wrapperRef = useRef(null);
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const [spacerHeight, setSpacerHeight] = useState(0);

    // Get a few recent/upcoming events for the home page scroll
    const displayEvents = eventsData.slice(0, 6);

    // Measure scroll width and set spacer height (no pin = no DOM move = no removeChild error)
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const updateHeight = () => {
            const totalWidth = Math.max(0, container.scrollWidth - window.innerWidth);
            setSpacerHeight(totalWidth);
        };
        updateHeight();
        const ro = new ResizeObserver(updateHeight);
        ro.observe(container);
        return () => ro.disconnect();
    }, [displayEvents]);

    // Sticky + scrub: section stays in place via CSS, GSAP only animates transform (no pin)
    useEffect(() => {
        const container = containerRef.current;
        const wrapper = wrapperRef.current;
        if (!container || !wrapper || spacerHeight <= 0) return;

        const tl = gsap.to(container, {
            x: -spacerHeight,
            ease: "none",
            scrollTrigger: {
                trigger: wrapper,
                start: "top top",
                end: () => `+=${spacerHeight}`,
                scrub: 0.5,
                invalidateOnRefresh: true,
            }
        });

        return () => {
            if (tl.scrollTrigger) tl.scrollTrigger.kill();
            tl.kill();
        };
    }, [spacerHeight]);

    return (
        <div ref={wrapperRef} className="relative">
        <section ref={sectionRef} className="sticky top-0 h-screen overflow-hidden bg-ms-paper dark:bg-black transition-colors duration-500">
            {/* Header / Ticket Stub */}
            <div className="absolute top-[6vh] left-6 md:left-10 z-20 pointer-events-none">
                 <div className="flex flex-col gap-2">
                     <div className="flex items-center gap-3">
                        <div className="bg-ms-black dark:bg-white text-white dark:text-slate-900 px-3 py-1 text-[10px] md:text-sm font-black uppercase tracking-tighter border-2 border-slate-900 dark:border-white shadow-[4px_4px_0px_0px_rgba(0,164,239,1)] transform -rotate-3 inline-block">
                            Upcoming & Past
                        </div>
                        <div className="w-12 h-1 bg-gradient-to-r from-ms-blue to-ms-neon shadow-[0_0_10px_rgba(0,164,239,0.5)]" />
                     </div>
                     
                     <div className="relative">
                         {/* Background sticker effect */}
                         <div className="absolute -inset-x-4 -inset-y-2 bg-ms-blue/10 dark:bg-ms-neon/5 blur-2xl rounded-full" />
                         
                         <SplitText
                            text="Events Timeline"
                            className="relative text-5xl md:text-6xl lg:text-7xl font-display font-black text-slate-900 dark:text-white leading-none tracking-tighter"
                            delay={40}
                            duration={1}
                            splitType="chars"
                         />
                         
                         {/* Decorative underline */}
                         <div className="h-2 w-1/2 bg-ms-yellow mt-2 border-2 border-slate-900 dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transform rotate-1" />
                     </div>
                 </div>
            </div>

            <div ref={containerRef} className="flex h-full items-center pb-12 pl-[10vw] pr-[10vw] w-fit pt-[35vh]">
                {displayEvents.map((event, i) => (
                    <EventCard 
                        key={event.id || i}
                        title={event.title}
                        subtitle={event.description}
                        date={event.date}
                        location={event.location}
                        image={event.cover}
                        isPast={event.status === "past"}
                        slug={event.slug}
                    />
                ))}
                
                {/* Final Card - View All */}
                <div className="flex-shrink-0 w-[40vw] md:w-[300px] h-[35vh] md:h-[45vh] flex flex-col items-center justify-center p-8 bg-ms-blue text-white rounded-3xl border-4 border-slate-900 dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] mx-6 transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:!shadow-none dark:hover:!shadow-none hover:scale-[1.02]">
                    <h3 className="text-2xl md:text-3xl font-black mb-6 text-center uppercase">More Chaos Awaits</h3>
                    <Link to="/events" className="bg-white text-slate-900 px-6 py-3 rounded-xl font-black border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                        View All
                    </Link>
                </div>
            </div>
        </section>
        <div style={{ height: spacerHeight }} aria-hidden="true" />
        </div>
    );
};

export default EventsScroll;
