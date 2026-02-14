import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import eventsData from "../data/events.json";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Globe, ArrowLeft, Clock, ArrowRight } from "lucide-react";
import FunkyBackground from "../components/FunkyBackground";
import clsx from "clsx";

export default function EventDetail() {
  const { slug } = useParams();
  const event = eventsData.find((e) => e.slug === slug);

  const [current, setCurrent] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!event) {
    return (
        <div className="min-h-screen pt-40 flex flex-col items-center justify-center bg-ms-paper dark:bg-black">
            <h1 className="text-4xl font-black mb-4 dark:text-white">Event Not Found</h1>
            <Link to="/events" className="text-ms-blue underline font-bold text-xl">Back to Events</Link>
        </div>
    );
  }

  // ✅ Ensure unique images to prevent phantom skips
  const images = Array.from(new Set([
    event.cover,
    ...(event.gallery || [])
  ])).filter(Boolean);

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming": return "bg-ms-blue text-white";
      case "live": return "bg-ms-neon text-slate-900";
      case "completed": return "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden bg-ms-paper dark:bg-black transition-colors duration-500">
      <FunkyBackground />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
        <Link to="/events" className="inline-flex items-center gap-2 mb-8 font-bold text-slate-900 dark:text-white hover:-translate-x-1 transition-transform group">
            <div className="w-10 h-10 bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] rounded-lg flex items-center justify-center group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all">
                <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="text-lg bg-white dark:bg-slate-900 px-3 py-1 rounded-lg border-2 border-slate-900 dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all">Back to Events</span>
        </Link>
        
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] border-4 border-slate-900 dark:border-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] overflow-hidden">
            
            {/* Image Slider */}
            <div className="relative h-64 sm:h-96 md:h-[28rem] lg:h-[32rem] border-b-4 border-slate-900 dark:border-white bg-slate-100 dark:bg-slate-800 group">
                {images.length > 0 ? (
                    <img 
                        src={images[current]} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xl">
                        No Images Available
                    </div>
                )}
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Status Badge */}
                <span className={clsx(
                    "absolute top-6 right-6 px-4 py-2 text-sm font-black uppercase tracking-wider border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-2 z-20 rounded-lg",
                    getStatusColor(event.status)
                )}>
                    {event.status}
                </span>

                {images.length > 1 && (
                    <>
                        <button 
                            onClick={(e) => { e.stopPropagation(); e.preventDefault(); prevSlide(); }} 
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-slate-900 p-4 border-4 border-slate-900 shadow-[4px_4px_0px_#000] active:translate-y-[-48%] active:shadow-none transition-all z-20 rounded-full"
                            aria-label="Previous Image"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); e.preventDefault(); nextSlide(); }} 
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-slate-900 p-4 border-4 border-slate-900 shadow-[4px_4px_0px_#000] active:translate-y-[-48%] active:shadow-none transition-all z-20 rounded-full"
                            aria-label="Next Image"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}
                
                {/* Slide Indicators */}
                {images.length > 1 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border-2 border-white/50 shadow-[4px_4px_0px_rgba(255,255,255,0.2)]">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onPointerDown={(e) => e.stopPropagation()} 
                                onClick={(e) => { e.stopPropagation(); e.preventDefault(); setCurrent(idx); }}
                                className={`w-3 h-3 rounded-full transition-all ${current === idx ? "bg-ms-yellow scale-125 border-2 border-black" : "bg-white/50 hover:bg-white"}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-10 lg:p-12 space-y-8">
                {/* Header Info */}
                <div className="space-y-6">
                    <div className="flex flex-wrap gap-3 items-center text-sm font-bold text-slate-900 dark:text-white">
                        <span className="flex items-center gap-2 bg-ms-blue/10 dark:bg-ms-blue/20 px-3 py-1.5 rounded-lg border-2 border-slate-900 dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transform -rotate-1">
                            <Calendar className="w-4 h-4" /> {event.date}
                        </span>
                        <span className="flex items-center gap-2 bg-ms-purple/10 dark:bg-ms-purple/20 px-3 py-1.5 rounded-lg border-2 border-slate-900 dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transform rotate-1">
                            <Clock className="w-4 h-4" /> {event.time || "TBA"}
                        </span>
                        <span className="flex items-center gap-2 bg-ms-green/10 dark:bg-ms-green/20 px-3 py-1.5 rounded-lg border-2 border-slate-900 dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transform -rotate-1">
                            {event.mode === "Online" ? <Globe className="w-4 h-4" /> : <MapPin className="w-4 h-4" />} {event.location}
                        </span>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-black leading-tight text-slate-900 dark:text-white break-words">
                        {event.title}
                    </h1>
                </div>

                {/* Description */}
                <div className="prose prose-lg dark:prose-invert max-w-none border-t-4 border-slate-900/10 dark:border-white/10 pt-8">
                    <p className="text-lg md:text-xl font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                        {event.description}
                    </p>
                </div>

                {/* Registration CTA - Only if upcoming */}
                {event.status === "upcoming" && (
                    <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <a 
                            href={event.registrationLink || "#"} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-ms-blue text-white text-xl font-black rounded-xl border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:scale-95 group"
                        >
                            Register Now <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </a>
                        
                        <button className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 text-xl font-black rounded-xl border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:scale-95">
                            Add to Calendar
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
