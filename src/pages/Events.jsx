import { useState } from "react";
import eventsData from "../data/events.json";
import EventCard from "../components/EventCard";
import clsx from "clsx";

export default function Events() {
  const [filter, setFilter] = useState("upcoming");

  const filteredEvents = eventsData.filter(
    (event) => event.status === filter
  );

  return (
    <section className="min-h-screen pt-28 pb-20 container mx-auto px-6">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white">
          Events
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Join us for workshops, hackathons, bootcamps, and tech talks organized by MSTC
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center mb-12">
        <div className="relative bg-slate-100 dark:bg-white/10 p-1 rounded-full flex w-72">
          <div
            className={clsx(
              "absolute top-1 bottom-1 w-1/2 rounded-full bg-white dark:bg-slate-900 shadow transition-all duration-300",
              filter === "upcoming" ? "left-1" : "left-1/2"
            )}
          />

          <button
            onClick={() => setFilter("upcoming")}
            className={clsx(
              "relative z-10 w-1/2 py-2 text-sm font-semibold",
              filter === "upcoming"
                ? "text-slate-900 dark:text-white"
                : "text-slate-500"
            )}
          >
            Upcoming
          </button>

          <button
            onClick={() => setFilter("past")}
            className={clsx(
              "relative z-10 w-1/2 py-2 text-sm font-semibold",
              filter === "past"
                ? "text-slate-900 dark:text-white"
                : "text-slate-500"
            )}
          >
            Past
          </button>
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-500 dark:text-slate-400">
          No events found.
        </p>
      )}
    </section>
  );
}
