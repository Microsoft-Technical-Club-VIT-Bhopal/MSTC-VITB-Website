import { useParams } from "react-router-dom";
import { useState } from "react";
import eventsData from "../data/events.json";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function EventDetail() {
  const { slug } = useParams();
  const event = eventsData.find(e => e.slug === slug);

  const [current, setCurrent] = useState(0);

  if (!event) {
    return <p className="text-center pt-40">Event not found</p>;
  }

  const images = [event.cover, ...(event.gallery || [])];

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="pt-32 pb-20 container mx-auto px-6">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        {event.title}
      </h1>
      <p className="text-slate-500 mb-10">{event.date} • {event.location}</p>

      {/* Image Slider */}
      <div className="relative max-w-4xl mx-auto">
        <img
          src={images[current]}
          alt="event"
          className="w-full h-[450px] object-cover rounded-2xl shadow-lg"
        />

        {/* Left Arrow */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 -translate-y-1/2 left-4 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextImage}
          className="absolute top-1/2 -translate-y-1/2 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Description */}
      <p className="max-w-3xl mx-auto mt-10 text-slate-600 text-lg leading-relaxed">
        {event.description}
      </p>
    </section>
  );
}