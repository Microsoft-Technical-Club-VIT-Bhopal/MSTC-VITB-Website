import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Preloader from './Preloader';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


export default function Layout({ children }) {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // GSAP ScrollTrigger integration - staggered reveals & sheen-on-scroll for glass cards
    const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    const reduced = mq ? mq.matches : false;

    if (!reduced) {
      // Staggered reveals for containers marked with data-anim="stagger"
      document.querySelectorAll('[data-anim="stagger"]').forEach((container) => {
        const items = container.querySelectorAll(':scope > *');
        if (!items.length) return;
        gsap.set(items, { y: 28, opacity: 0 });
        ScrollTrigger.create({
          trigger: container,
          start: 'top 85%',
          onEnter: () => gsap.to(items, { y: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: 'power2.out' }),
          once: true
        });
      });

      // Sheen-on-scroll for glass cards via CSS variable --sheen
      document.querySelectorAll('.glass-card').forEach((card) => {
        // initialize var
        card.style.setProperty('--sheen', '-60%');
        ScrollTrigger.create({
          trigger: card,
          start: 'top 95%',
          end: 'bottom 40%',
          scrub: 0.6,
          onUpdate: (self) => {
            // map progress 0->1 to -60% -> 220%
            const p = Math.min(1, Math.max(0, self.progress));
            const from = -60; const to = 220;
            const val = from + (to - from) * p;
            card.style.setProperty('--sheen', `${val}%`);
          }
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      lenis.destroy();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col pt-32 font-body bg-white dark:bg-ms-dark text-slate-900 dark:text-white transition-colors duration-300">
      <Preloader />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
