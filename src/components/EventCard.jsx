import React, { useRef } from "react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";

export default function EventCard({ event }) {
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <Link to={`/events/${event.slug}`} className="block">
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="glass rounded-2xl overflow-hidden group hover:shadow-xl hover:shadow-ms-blue/10 transition-all duration-300 border border-slate-200 dark:border-white/10 hover-raise soft-glow"
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-ms-blue/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500"></div>

          {(event.cover || event.image_path) ? (
  <img
    src={event.cover || event.image_path}
    alt={event.title}
    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
    onError={(e) => {
      e.target.onerror = null;
      e.target.src =
        "https://images.unsplash.com/photo-1633419461186-7d721f1de865?q=80&w=2070&auto=format&fit=crop";
    }}
  />
) : (
  <div className="w-full h-full bg-gradient-to-br from-ms-blue to-ms-purple flex items-center justify-center">
    <span className="text-white font-display font-bold text-2xl opacity-50">
      MS Club
    </span>
  </div>
)}

          {/* Status Badge */}
          <div className="absolute top-4 right-4 z-20">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
                event.status === "upcoming"
                  ? "bg-ms-green/20 text-ms-green border border-ms-green/30"
                  : "bg-slate-500/20 text-slate-500 border border-slate-500/30"
              }`}
            >
              {event.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 text-ms-blue dark:text-ms-neon text-sm font-medium mb-3">
            <Calendar size={16} />
            <span>{event.date}</span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-display group-hover:text-ms-blue dark:group-hover:text-ms-neon transition-colors">
            {event.title}
          </h3>

          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-2">
            {event.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            {event.location && (
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-500">
                <MapPin size={14} />
                <span>{event.location}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white group/btn">
              Details
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