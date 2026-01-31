import React, { useState } from 'react';
import eventsData from '../data/events.json';
import EventCard from '../components/EventCard';
import { clsx } from 'clsx';

export default function Events() {
  const [filter, setFilter] = useState('upcoming'); // 'upcoming' | 'past'

  const filteredEvents = eventsData.filter(event => event.status === filter);

  return (
    <div data-anim="reveal" className="min-h-screen pt-24 pb-20 container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
        <div>
           <h1 className="text-4xl md:text-6xl font-bold font-display text-slate-900 dark:text-white mb-4">Events</h1>
           <p className="text-slate-600 dark:text-slate-400 text-lg">Join us for workshops, hackathons, and tech talks.</p>
        </div>

        {/* Filter Tabs */}
        <div className="relative p-1 bg-slate-100 dark:bg-white/10 rounded-full backdrop-blur-sm flex">
          {/* Sliding Pill Background */}
          <div 
            className={clsx(
              "absolute top-1 bottom-1 rounded-full bg-white dark:bg-ms-blue shadow-sm transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]",
              filter === 'upcoming' ? "left-1 w-[calc(50%-4px)]" : "left-[calc(50%+2px)] w-[calc(50%-4px)]"
            )}
          ></div>

          <button
            onClick={() => setFilter('upcoming')}
            className={clsx(
              "relative z-10 px-8 py-2 rounded-full text-sm font-bold transition-colors duration-300 w-full text-center",
              filter === 'upcoming' 
                ? "text-slate-900 dark:text-white" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            )}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('past')}
            className={clsx(
              "relative z-10 px-8 py-2 rounded-full text-sm font-bold transition-colors duration-300 w-full text-center",
              filter === 'past' 
                ? "text-slate-900 dark:text-white" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            )}
          >
            Past Events
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
           <div className="col-span-full py-20 text-center text-slate-500 dark:text-slate-500">
             <p className="text-xl">No {filter} events found.</p>
           </div>
        )}
      </div>
    </div>
  );
}
