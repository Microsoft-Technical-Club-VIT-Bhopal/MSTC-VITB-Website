import React, { useRef } from "react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";

export default function EventCard({ event, rotate = "rotate-0" }) {
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    // Optional: Add specific hover animations if needed, but CSS handles the main "press" effect
  };

  const handleMouseLeave = () => {
    // Reset if needed
  };

  // ✅ Safety fallback for slug
  const eventSlug = event.slug || "";

  return (
    <Link
      to={eventSlug ? `/events/${eventSlug}` : "#"}
      className={`block group ${rotate} transition-transform duration-300 hover:rotate-0 hover:z-10`}
    >
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border-4 border-slate-900 dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all duration-200 group-hover:translate-x-[4px] group-hover:translate-y-[4px] group-hover:!shadow-none dark:group-hover:!shadow-none h-full flex flex-col"
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden border-b-4 border-slate-900 dark:border-white">
          <div className="absolute inset-0 bg-ms-blue/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500"></div>

          {(event.cover || event.image_path) ? (
            <img
              src={event.cover || event.image_path}
              alt={event.title}
              loading="lazy"   // ✅ LAZY LOADING
              className="w-full h-full object-cover transform grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://images.unsplash.com/photo-1633419461186-7d721f1de865?q=80&w=2070&auto=format&fit=crop";
              }}
            />
          ) : (
            <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <span className="text-slate-900 dark:text-white font-display font-black text-3xl rotate-12 opacity-20">
                MSTC
              </span>
            </div>
          )}

          {/* Status Badge - Brutalist Tag */}
          <div className="absolute top-4 right-4 z-20">
            <span
              className={`px-3 py-1 text-xs font-black uppercase tracking-wider border-2 border-slate-900 dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-colors ${
                event.status === "upcoming"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
              }`}
            >
              {event.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar size={14} className="text-ms-blue" />
            <span>{event.date}</span>
          </div>

          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 font-display leading-tight group-hover:text-ms-blue dark:group-hover:text-ms-neon transition-colors uppercase">
            {event.title}
          </h3>

          <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 line-clamp-3 leading-relaxed font-medium">
            {event.description}
          </p>

          <div className="mt-auto pt-4 border-t-2 border-slate-100 dark:border-slate-800 flex items-center justify-between">
            {event.location && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                <MapPin size={14} />
                <span>{event.location}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white bg-ms-yellow/20 px-3 py-1 rounded-lg border-2 border-transparent group-hover:border-slate-900 dark:group-hover:border-white transition-all">
              DETAILS
              <ArrowRight
                size={16}
                className="transform group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
