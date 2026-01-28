import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Removed all lucide-react icons for a text-only nav bar
import { twMerge } from 'tailwind-merge';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navRef = useRef(null);
  const menuButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const linkRefs = useRef([]);
  const underlineRef = useRef(null);
  // small timeout used to debounce closing the Events menu for stable hover/focus
  const closeTimeoutRef = useRef(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications] = useState([{id:1,text:'New workshop added'}, {id:2,text:'Hackathon winners announced'}]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Theme initialization
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }

    // Scroll handler
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Events', path: '/events', submenu: [
      { title: 'Workshops', path: '/events?type=workshop', desc: 'Hands-on training & labs' },
      { title: 'Hackathons', path: '/events?type=hackathon', desc: 'Ship fast, win prizes' },
      { title: 'Calendar', path: '/events/calendar', desc: 'All upcoming dates' }
    ] },
    { title: 'Team', path: '/team' },
    { title: 'Join', path: '/join' },
  ];

  // underline position - accepts an optional target element to position to (used for hover)
  const positionUnderline = useCallback((targetEl) => {
    if (!underlineRef.current || !navRef.current) return;

    const navRect = navRef.current.getBoundingClientRect();

    let el = targetEl;
    if (!el) {
      const activeIndex = navLinks.findIndex((l) => (l.path === '/' ? location.pathname === '/' : location.pathname.startsWith(l.path)));
      el = linkRefs.current[activeIndex];
    }

    if (!el) {
      underlineRef.current.style.opacity = '0';
      return;
    }

    // prefer measuring the inner text so the underline matches text width (not the padded button)
    const textEl = el.querySelector && el.querySelector('.nav-link-text') ? el.querySelector('.nav-link-text') : el;
    const rect = textEl.getBoundingClientRect();

    underlineRef.current.style.width = `${Math.max(8, rect.width)}px`;
    underlineRef.current.style.transform = `translateX(${rect.left - navRect.left}px)`;
    underlineRef.current.style.opacity = '1';
    // subtle glow for active/hover
    underlineRef.current.style.boxShadow = '0 4px 18px rgba(59,130,246,0.12)';
  }, [location.pathname]); 

  useEffect(() => {
    positionUnderline();
    const onResize = () => positionUnderline();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [positionUnderline]);

  // helpers to make Events dropdown stable on hover/touch/focus
  const openEventsMenu = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsEventsOpen(true);
  }, []);

  const closeEventsMenu = useCallback((delay = 200) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setIsEventsOpen(false);
      closeTimeoutRef.current = null;
    }, delay);
  }, []);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  // Close mobile menu/on-escape and close other overlays on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (isOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(e.target) && !menuButtonRef.current.contains(e.target)) {
        setIsOpen(false);
      }

      if (isEventsOpen && navRef.current && !navRef.current.contains(e.target)) setIsEventsOpen(false);
      if (isNotifOpen && e.target && !e.target.closest('.notif-dropdown')) setIsNotifOpen(false);
      if (isSearchOpen && e.target && !e.target.closest('.search-overlay')) setIsSearchOpen(false);
    };

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setIsEventsOpen(false);
        setIsNotifOpen(false);
        setIsSearchOpen(false);
      }
      if (e.key === '/') {
        // focus search
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => searchInputRef.current && searchInputRef.current.focus(), 30);
      }
    };

    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, isEventsOpen, isNotifOpen, isSearchOpen]);

  useEffect(() => {
    const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq ? mq.matches : false);
  }, []);

  // manage focus when mobile menu opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const first = mobileMenuRef.current && mobileMenuRef.current.querySelector('a');
        first && first.focus();
      }, 0);
    } else {
      menuButtonRef.current && menuButtonRef.current.focus();
    }
  }, [isOpen]);

  // analytics stub
  const trackEvent = (name, payload) => {
    try {
      if (window.gtag) window.gtag('event', name, payload);
      else console.log('analytics', name, payload);
    } catch (e) { /* ignore */ }
  };

  return (
    <header 
      className={twMerge(
        "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out will-change-[width,padding,top]",
        isScrolled ? "top-4 w-[90%] max-w-5xl" : "top-6 w-[95%] max-w-7xl"
      )}
    >
      <style>{` 
        /* Header enhancements */
        .pulse-cta{animation: pulseCta 2.8s ease-in-out infinite}
        @keyframes pulseCta{0%{transform:scale(1);box-shadow:0 8px 24px rgba(59,130,246,0.12)}50%{transform:scale(1.02);box-shadow:0 20px 40px rgba(59,130,246,0.16)}100%{transform:scale(1);box-shadow:0 8px 24px rgba(59,130,246,0.12)}}
        .nav-underline{position:absolute;bottom:2px;height:2px;border-radius:999px;left:0;transform:translateX(0);transition:transform .18s cubic-bezier(.2,.9,.2,1),width .18s cubic-bezier(.2,.9,.2,1),opacity .12s} 
        .pulse-cta:focus{outline:none;box-shadow:0 0 0 6px rgba(59,130,246,0.12)}
        .header-decor{position:absolute;inset:0;pointer-events:none;opacity:0.6}
        .icon-hover:hover{transform:translateY(-3px) scale(1.03);transition:transform .18s}

        /* Modern navbar utility styles */
        .nav-inner{display:flex;align-items:center;justify-content:space-between;gap:1rem;background:linear-gradient(180deg, rgba(11,22,36,0.92), rgba(6,12,22,0.9));padding:0.5rem 1rem;border-radius:999px;border:1px solid rgba(255,255,255,0.04);box-shadow:0 10px 36px rgba(2,6,23,0.45);backdrop-filter: blur(8px);transition:transform .28s cubic-bezier(.2,.9,.2,1),box-shadow .28s cubic-bezier(.2,.9,.2,1)}
        .nav-inner:hover{transform:translateY(-1px)}
        .nav-link{padding:0.45rem 0.8rem;border-radius:8px;transition:background .22s cubic-bezier(.2,.9,.2,1),transform .22s cubic-bezier(.2,.9,.2,1),color .22s cubic-bezier(.2,.9,.2,1)}
        .nav-link:hover,.nav-link:focus{background:rgba(255,255,255,0.02);transform:translateY(-2px)}
        .nav-cta{padding:0.6rem 1rem;box-shadow:0 10px 30px rgba(59,130,246,0.12);transition:transform .18s cubic-bezier(.2,.9,.2,1),box-shadow .18s cubic-bezier(.2,.9,.2,1)}
        .nav-cta:hover{transform:translateY(-3px);box-shadow:0 20px 44px rgba(59,130,246,0.22)}

        @media (prefers-reduced-motion: reduce){.pulse-cta,.icon-hover,.nav-inner,.nav-link{animation:none;transition:none}}
      `}</style>
      <style>{`
        .nav-underline{position:absolute;bottom:2px;height:2px;border-radius:999px;left:0;transform:translateX(0);transition:transform .25s cubic-bezier(.2,.9,.2,1),width .25s cubic-bezier(.2,.9,.2,1),opacity .2s} 
        .nav-underline.bg{background:linear-gradient(90deg,#3b82f6,#8b5cf6);}

        /* Hover box behind nav items */
        .nav-link{position:relative;overflow:visible}
        .nav-link::before{content:'';position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(.86);width:calc(100% + 8px);height:calc(100% + 8px);border-radius:10px;background:linear-gradient(90deg, rgba(59,130,246,0.06), rgba(139,92,246,0.04));box-shadow:0 8px 26px rgba(2,6,23,0.06);opacity:0;transition:opacity .22s cubic-bezier(.2,.9,.2,1),transform .22s cubic-bezier(.2,.9,.2,1)}
        .nav-link:hover::before,.nav-link:focus::before,.nav-link.is-active::before{opacity:1;transform:translate(-50%,-50%) scale(1)}
        .nav-link.is-active{color:var(--ms-blue,#3b82f6)}

        .header-slide{transform:translateY(-6px);opacity:0;animation:headerIn .5s forwards}
        @keyframes headerIn{to{transform:none;opacity:1}}
        @media (prefers-reduced-motion: reduce){.nav-underline{transition:none}.header-slide{animation:none}}
      `}</style>

      <div className={twMerge(
        "absolute inset-0 glass rounded-full shadow-lg dark:shadow-ms-blue/10 border border-white/20 dark:border-white/10 transition-all duration-500 pointer-events-none soft-glow",
      )} aria-hidden="true" />

      <div className={twMerge(
        "relative flex justify-between items-center transition-all duration-500 nav-inner",
        isScrolled ? "px-6 py-3" : "px-8 py-4 header-slide"
      )}>
        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-bold font-display tracking-tighter flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-ms-blue/30 rounded-md hover-raise">
          <div className="w-8 h-8 grid grid-cols-2 gap-0.5 transition-transform group-hover:rotate-90 duration-500">
            <div className="bg-ms-orange rounded-[1px]"></div>
            <div className="bg-ms-green rounded-[1px]"></div>
            <div className="bg-ms-blue rounded-[1px]"></div>
            <div className="bg-yellow-500 rounded-[1px]"></div>
          </div>
          <span className="text-slate-900 dark:text-white">MS Club</span>
        </Link>

        {/* Desktop Nav */}
        <nav ref={navRef} onPointerLeave={() => positionUnderline()} className="hidden md:flex items-center gap-8 relative" aria-label="Primary navigation">
          <div className="relative flex items-center gap-8">
            {navLinks.map((link, idx) => {
              const isActive = link.path === '/' ? location.pathname === '/' : location.pathname.startsWith(link.path);

              // Events has a submenu
              if (link.submenu) {
                return (
                  <div
                    key={link.path}
                    className="relative"
                    onPointerEnter={(e) => {
                      // open on hover for mouse/pen pointers and cancel any pending close
                      if (!reducedMotion && e.pointerType !== 'touch') openEventsMenu();
                    }}
                    onPointerLeave={(e) => {
                      if (!reducedMotion && e.pointerType !== 'touch') closeEventsMenu(180);
                    }}
                    onPointerDown={(e) => {
                      // open immediately on touch or pointer down so long-press isn't required
                      if (e.pointerType === 'touch' || e.pointerType === 'pen') {
                        openEventsMenu();
                      }
                    }}
                    onFocus={() => openEventsMenu()}
                    onBlur={() => closeEventsMenu(180)}
                  >
                    <button
                      ref={(el) => (linkRefs.current[idx] = el)}
                      onPointerEnter={(e) => { positionUnderline(e.currentTarget); if (!reducedMotion && e.pointerType !== 'touch') openEventsMenu(); }}
                      onMouseLeave={() => positionUnderline()}
                      onClick={(e) => {
                        // On click/tap open (first click) — subsequent click will close
                        e.preventDefault();
                        setIsEventsOpen((s) => !s);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setIsEventsOpen((s) => !s);
                        }
                      }}
                      onFocus={() => positionUnderline(linkRefs.current[idx])}
                      onBlur={() => positionUnderline()}
                      className={twMerge(
                        "relative text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ms-blue/30 rounded-md px-2 py-1 inline-flex items-center gap-2 nav-link",
                        isActive ? "text-ms-blue dark:text-ms-neon is-active" : "text-slate-600 dark:text-slate-300 hover:text-ms-blue dark:hover:text-ms-neon"
                      )}
                      aria-expanded={isEventsOpen}
                      aria-haspopup="menu"
                      aria-controls="events-submenu"
                    > 
                      <span className="align-middle nav-link-text">{link.title}</span>
                      <span className="opacity-70 ml-1">▼</span> 
                    </button>

                    {/* Submenu */}
                    <div
                      id="events-submenu"
                      className={twMerge("absolute left-0 mt-3 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-white/10 transition-transform origin-top z-50 pointer-events-auto", isEventsOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none')}
                      role="menu"
                      aria-label="Events submenu"
                      onPointerEnter={() => {
                        if (closeTimeoutRef.current) {
                          clearTimeout(closeTimeoutRef.current);
                          closeTimeoutRef.current = null;
                        }
                      }}
                      onPointerLeave={() => closeEventsMenu(180)}
                    >
                      {link.submenu.map((s) => (
                        <Link key={s.path} to={s.path} onClick={() => setIsEventsOpen(false)} className="flex items-start gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">
                          <div className="text-ms-blue w-7 h-7 rounded flex items-center justify-center">{/* small dot */}</div>
                          <div>
                            <div className="font-semibold text-sm">{s.title}</div>
                            <div className="text-xs text-slate-500">{s.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  ref={(el) => (linkRefs.current[idx] = el)}
                  onPointerEnter={(e) => positionUnderline(e.currentTarget)}
                  onMouseLeave={() => positionUnderline()}
                  onFocus={() => positionUnderline(linkRefs.current[idx])}
                  onBlur={() => positionUnderline()}
                  className={twMerge(
                    "relative text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ms-blue/30 rounded-md px-2 py-1 inline-flex items-center gap-2 nav-link",
                    isActive ? "text-ms-blue dark:text-ms-neon is-active" : "text-slate-600 dark:text-slate-300 hover:text-ms-blue dark:hover:text-ms-neon"
                  )}
                  aria-current={isActive ? 'page' : undefined}
                > 
                  <span className="align-middle nav-link-text">{link.title}</span>
                </Link>
              );
            })}

            {/* animated underline */}
            <span ref={underlineRef} className="nav-underline bg absolute nav-underline bg ms-hidden" aria-hidden="true" style={{opacity: 0}} />
          </div>

          {/* CTA Only (no icons, no search, no notifications, no theme) */}
          <div className="flex items-center gap-4">
            <Link to="/join" onClick={() => trackEvent('cta_click',{label:'Join Now'})} className="inline-flex items-center gap-2 bg-gradient-to-r from-ms-blue to-ms-neon text-white px-4 py-2 rounded-full font-semibold hover:scale-105 transform-gpu transition shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-ms-blue/30 pulse-cta btn-animate soft-glow nav-cta">
              Join Now
            </Link>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button
            ref={menuButtonRef}
            onClick={() => setIsOpen((s) => !s)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            className="text-slate-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ms-blue/30"
          >
            {isOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        className={twMerge(
          "md:hidden absolute top-full left-0 mt-2 w-full glass rounded-3xl border border-white/20 dark:border-white/10 p-6 flex flex-col gap-4 shadow-xl transition-transform origin-top",
          isOpen ? 'scale-y-100 opacity-100' : 'scale-y-95 opacity-0 pointer-events-none'
        )}
        style={{transformOrigin: 'top'}}
      >
        {navLinks.map((link) => (
          <div key={link.path}>
            {link.submenu ? (
              <details className="group" open={false}>
                <summary className="flex items-center gap-3 text-lg font-medium py-3 px-4 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ms-blue/30 cursor-pointer">
                  {link.title}
                  {link.submenu && <span className="opacity-70 ml-1">▼</span>}
                </summary>
                <div className="pl-6 flex flex-col">
                  {link.submenu.map(s => (
                    <Link key={s.path} to={s.path} onClick={() => setIsOpen(false)} className="py-2 text-sm text-slate-600 dark:text-slate-300">{s.title}</Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={twMerge(
                  "text-lg font-medium py-3 px-4 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ms-blue/30 inline-flex items-center gap-3",
                  location.pathname === link.path ? "text-ms-blue dark:text-ms-neon bg-slate-50 dark:bg-slate-800/40" : "text-slate-700 dark:text-slate-300"
                )}
              >
                {link.title}
              </Link>
            )}
          </div>
        ))}

        <div className="pt-2 border-t border-slate-200 dark:border-white/10 mt-2 flex items-center justify-between">
          <Link to="/join" onClick={() => setIsOpen(false)} className="inline-flex items-center gap-2 bg-ms-blue text-white px-4 py-2 rounded-full font-semibold">
            Join Now
          </Link>
        </div>
      </div>
    </header>
  );
}
