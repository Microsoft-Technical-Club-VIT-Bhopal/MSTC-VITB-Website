import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

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
    { title: 'Events', path: '/events' },
    { title: 'Team', path: '/team' },
    { title: 'Join', path: '/join' },
  ];

  return (
    <header 
      className={twMerge(
        "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[width,padding,top]",
        isScrolled ? "top-4 w-[90%] max-w-5xl" : "top-6 w-[95%] max-w-7xl"
      )}
    >
      <div className="absolute inset-0 glass rounded-full shadow-lg dark:shadow-ms-blue/10 border border-white/20 dark:border-white/10 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"></div>
      
      <div className={twMerge(
        "relative flex justify-between items-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
        isScrolled ? "px-8 py-3" : "px-8 py-5"
      )}>
        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-bold font-display tracking-tighter flex items-center gap-3 group">
          <div className="w-8 h-8 grid grid-cols-2 gap-0.5 transition-transform group-hover:rotate-90 duration-500">
            <div className="bg-ms-orange rounded-[1px]"></div>
            <div className="bg-ms-green rounded-[1px]"></div>
            <div className="bg-ms-blue rounded-[1px]"></div>
            <div className="bg-yellow-500 rounded-[1px]"></div>
          </div>
          <span className="text-slate-900 dark:text-white">Microsoft Technical Club</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={twMerge(
                "relative text-sm font-bold transition-colors hover:text-ms-blue dark:hover:text-ms-neon",
                location.pathname === link.path ? "text-ms-blue dark:text-ms-neon" : "text-slate-600 dark:text-slate-300"
              )}
            >
              {link.title}
              {location.pathname === link.path && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-ms-blue dark:bg-ms-neon rounded-full" />
              )}
            </Link>
          ))}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
          </button>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10"
          >
            {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 dark:text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 mt-2 w-full glass rounded-3xl border border-white/20 dark:border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top-5 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={twMerge(
                "text-lg font-medium py-2 border-b border-dashed border-slate-200 dark:border-white/10",
                location.pathname === link.path ? "text-ms-blue dark:text-ms-neon" : "text-slate-600 dark:text-slate-300"
              )}
            >
              {link.title}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
