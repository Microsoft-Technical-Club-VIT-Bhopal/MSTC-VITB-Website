import React from 'react';
import { ArrowUpRight, MapPin, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const events = [
    {
        title: "Code Garuda 4.0",
        slug: "code-garuda-4",
        date: "Reveal Soon",
        time: "TBA",
        location: "MSTC Hall",
        rotate: "rotate-2",
        color: "bg-ms-blue"
    },
    {
        title: "Vainateya 2.0",
        slug: "vainateya-2",
        date: "Past",
        time: "TBA",
        location: "Auditorium",
        rotate: "-rotate-3",
        color: "bg-ms-violet"
    }
];

const EventCard = ({ event }) => (
    <Link to={`/events/${event.slug}`} className={`block transition-transform duration-200 ${event.rotate} hover:rotate-0`}>
        <div className={`flex-shrink-0 w-80 md:w-96 p-6 mr-16 rounded-[2rem] bg-white dark:bg-ms-obsidian border-2 border-slate-900 dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:!shadow-none dark:hover:!shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:scale-[0.98] transition-all duration-200 cursor-pointer h-full group`}>
            <div className="flex justify-between items-start mb-6">
                <div className={`px-3 py-1 rounded-full border-2 border-slate-900 dark:border-white text-xs font-black uppercase tracking-wider ${event.color} text-white`}>
                    {event.date}
                </div>
                <ArrowUpRight className="text-slate-900 dark:text-white group-hover:rotate-45 transition-transform" />
            </div>

            <h3 className="text-3xl font-display font-black leading-tight text-slate-900 dark:text-white mb-4 line-clamp-2">
                {event.title}
            </h3>

            <div className="flex flex-col gap-2 text-sm font-bold text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {event.time}
                </div>
                <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {event.location}
                </div>
            </div>
        </div>
    </Link>
);

const EventsMarquee = () => {
    return (
        <section className="relative py-12 overflow-hidden bg-ms-neon/5 dark:bg-ms-blue/5 border-y-4 border-slate-900 dark:border-white">
            {/* Tilted "WARNING TAPE" Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none overflow-hidden">
                <h1 className="text-[20vw] font-black text-slate-900 dark:text-white -rotate-12 whitespace-nowrap">
                    UPCOMING EVENTS UPCOMING EVENTS
                </h1>
            </div>

            <div className="relative z-10 flex overflow-hidden group py-4">
                {/* Track 1 */}
                <div className="flex w-max shrink-0 animate-ticker group-hover:[animation-play-state:paused] will-change-transform">
                    {[...events, ...events, ...events, ...events].map((event, i) => (
                        <EventCard key={`t1-${i}`} event={event} />
                    ))}
                </div>
                {/* Track 2 (Duplicate for seamless loop) */}
                <div className="flex w-max shrink-0 animate-ticker group-hover:[animation-play-state:paused] will-change-transform" aria-hidden="true">
                    {[...events, ...events, ...events, ...events].map((event, i) => (
                        <EventCard key={`t2-${i}`} event={event} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventsMarquee;
