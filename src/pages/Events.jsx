import { useState } from "react";
import eventsData from "../data/events.json";
import EventCard from "../components/EventCard";
import FunkyBackground from "../components/FunkyBackground";
import SplitText from "../components/SplitText";
import clsx from "clsx";

export default function Events() {
  const [filter, setFilter] = useState("upcoming");

  const filteredEvents = eventsData.filter(
    (event) => event.status === filter
  );

  const rotations = ['rotate-1', '-rotate-2', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-3'];

  return (
    <section className="min-h-screen pt-40 pb-20 relative overflow-hidden bg-ms-paper dark:bg-black">
      <FunkyBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="inline-block relative">
            <h1 className="text-6xl md:text-8xl font-black font-display text-slate-900 dark:text-white mb-4 tracking-tighter transform -rotate-2">
              <SplitText 
                text="EVENTS" 
                className="inline-block"
                delay={50}
                enableScrollTrigger={false}
              />
            </h1>
            <div className="absolute -top-6 -right-8 bg-ms-yellow dark:bg-slate-900 text-slate-900 dark:text-white font-bold px-4 py-1 rotate-12 border-2 border-slate-900 dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] text-sm md:text-base hidden md:block">
                JOIN US!
            </div>
          </div>
          
          <p className="mt-6 text-xl md:text-2xl text-slate-700 dark:text-slate-300 font-medium max-w-2xl mx-auto bg-white/80 dark:bg-black/50 backdrop-blur-sm p-4 rounded-xl border-2 border-slate-900 dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            Workshops, hackathons, bootcamps, and tech talks.
          </p>
        </div>

        {/* Filter Tabs - Brutalist Style */}
        <div className="flex justify-center mb-16">
          <div className="relative bg-white dark:bg-slate-900 p-2 rounded-2xl flex w-80 border-4 border-slate-900 dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transform rotate-1">
            <button
              onClick={() => setFilter("upcoming")}
              className={clsx(
                "w-1/2 py-3 text-lg font-black uppercase tracking-wider rounded-xl transition-all duration-300 border-2",
                filter === "upcoming"
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-[4px_4px_0px_#00A4EF] transform -translate-y-1 -rotate-1"
                  : "bg-transparent text-slate-500 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              Upcoming
            </button>

            <button
              onClick={() => setFilter("past")}
              className={clsx(
                "w-1/2 py-3 text-lg font-black uppercase tracking-wider rounded-xl transition-all duration-300 border-2",
                filter === "past"
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-[4px_4px_0px_#00A4EF] transform -translate-y-1 rotate-1"
                  : "bg-transparent text-slate-500 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              Past
            </button>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
            {filteredEvents.map((event, index) => (
              <div key={event.id} className="h-full">
                <EventCard 
                    event={event} 
                    rotate={rotations[index % rotations.length]}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/50 dark:bg-slate-900/50 rounded-3xl border-4 border-dashed border-slate-400 dark:border-slate-600 max-w-2xl mx-auto">
            <p className="text-2xl font-bold text-slate-500 dark:text-slate-400 font-display">
              No events found. Stay tuned! 🚀
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
