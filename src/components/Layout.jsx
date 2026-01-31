import React, { useEffect, useState } from 'react';
import ReactLenis from 'lenis/react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Preloader from './Preloader';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Layout({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Lock scroll during preloader
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [loading]);

  return (
    <ReactLenis root>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <div className={`relative min-h-screen flex flex-col font-body bg-slate-50 dark:bg-ms-obsidian text-slate-900 dark:text-ms-white transition-colors duration-500 opacity-100`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
}
