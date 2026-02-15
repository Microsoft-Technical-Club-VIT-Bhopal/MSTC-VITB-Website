import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = () => {
    const navRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        
        if (localStorage.theme === 'light') {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        } else {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from(".nav-item", {
            y: -50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "back.out(1.7)",
        });
    }, { scope: navRef });

    const toggleTheme = (event) => {
        // Fallback to center of screen if coordinates are missing (mobile/keyboard)
        const x = event?.clientX ?? window.innerWidth / 2;
        const y = event?.clientY ?? window.innerHeight / 2;

        const updateTheme = () => {
            // Temporarily disable standard CSS transitions to avoid conflicts with View Transition reveal
            document.documentElement.classList.add('no-transitions');
            
            if (isDark) {
                document.documentElement.classList.remove('dark');
                localStorage.theme = 'light';
                setIsDark(false);
            } else {
                document.documentElement.classList.add('dark');
                localStorage.theme = 'dark';
                setIsDark(true);
            }
            
            // Force reflow and restore transitions after a tiny delay
            document.documentElement.offsetHeight;
            setTimeout(() => {
                document.documentElement.classList.remove('no-transitions');
            }, 100);
        };

        if (!document.startViewTransition) {
            updateTheme();
            return;
        }

        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            updateTheme();
        });

        transition.ready.then(() => {
            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${endRadius}px at ${x}px ${y}px)`,
                    ],
                },
                {
                    duration: 500, // Slightly faster for mobile responsiveness
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    pseudoElement: '::view-transition-new(root)',
                }
            );
        });
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Events', path: '/events' },
        { name: 'Team', path: '/team' }
    ];

    return (
        <nav ref={navRef} className={`fixed top-4 left-0 right-0 z-50 transition-all duration-500 flex justify-center px-4`}>
            <div className={`
                nav-item relative flex items-center justify-between px-6 py-3 rounded-full 
                transition-all duration-500 w-full max-w-5xl
                ${scrolled 
                    ? 'bg-white/90 dark:bg-black/80 backdrop-blur-xl border-2 border-ms-blue/30 shadow-[4px_4px_0px_#00A4EF] scale-95' 
                    : 'bg-white/50 dark:bg-black/40 backdrop-blur-md border border-white/10 shadow-[4px_4px_0px_#00A4EF] hover:border-ms-blue/50'}
            `}>
                {/* Initial Glow Animation */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-ms-blue/20 via-ms-purple/20 to-ms-neon/20 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Logo Section */}
                <NavLink to="/" className="flex items-center gap-3 group relative z-10">
                    <div className="relative w-12 h-12 flex items-center justify-center bg-white/5 rounded-full border border-white/10 group-hover:rotate-6 transition-transform duration-500 overflow-hidden shadow-[0_0_20px_rgba(0,164,239,0.3)] p-2">
                        <img 
                            src="/microsoft.jpeg" 
                            alt="Microsoft" 
                            className="w-full h-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                        />
                    </div>
                    <span className="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-ms-blue group-hover:to-ms-neon transition-all duration-300">
                        MSTC
                    </span>
                </NavLink>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-2 bg-black/5 dark:bg-white/5 p-1.5 rounded-full border border-black/5 dark:border-white/5 backdrop-blur-sm">
                    {navLinks.map((link) => (
                        <NavLink 
                            key={link.name} 
                            to={link.path}
                            className={({ isActive }) => `
                                relative px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 overflow-hidden group
                                ${isActive 
                                    ? 'text-white bg-ms-blue shadow-[4px_4px_0px_#7F00FF] scale-105 active-nav-link' 
                                    : 'text-gray-600 dark:text-ms-dim hover:text-ms-blue dark:hover:text-ms-neon hover:bg-white/10'}
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    <span className="relative z-10">{link.name}</span>
                                    {/* Glitch Hover Effect - only for inactive links */}
                                    {!isActive && (
                                        <span className="absolute inset-0 bg-ms-blue/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-4 relative z-10">
                    <button 
                        onClick={toggleTheme}
                        className={`
                            p-2.5 rounded-full transition-all duration-300 border-2
                            bg-white dark:bg-slate-900 border-slate-900 dark:border-white
                            shadow-[4px_4px_0px_#00A4EF] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]
                            text-slate-900 dark:text-white
                        `}
                        aria-label="Toggle Theme"
                    >
                        {isDark ? (
                            <img src="/svg/sun.svg" alt="Light Mode" className="w-[18px] h-[18px] dark:invert" />
                        ) : (
                            <img src="/svg/moon.svg" alt="Dark Mode" className="w-[18px] h-[18px] dark:invert" />
                        )}
                    </button>

                    <NavLink 
                        to="/join"
                        className="group relative px-6 py-2.5 rounded-full font-bold text-sm overflow-hidden bg-black dark:bg-white text-white dark:text-black shadow-[4px_4px_0px_#00A4EF] hover:shadow-[2px_2px_0px_#00A4EF] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 border-2 border-transparent hover:border-ms-blue"
                    >
                        <span className="relative z-10 group-hover:mr-2 transition-all">JOIN NOW</span>
                        <span className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-300">
                            →
                        </span>
                    </NavLink>
                </div>

                {/* Mobile Toggle */}
                <button 
                    className="md:hidden p-2 text-gray-900 dark:text-white rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`
                fixed inset-0 z-40 bg-black/60 backdrop-blur-md transition-opacity duration-300 md:hidden
                ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
            `} onClick={() => setIsMobileMenuOpen(false)} />

            {/* Mobile Menu Content */}
            <div className={`
                absolute top-24 left-4 right-4 bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-white p-6 md:hidden flex flex-col gap-6 shadow-[8px_8px_0px_#00A4EF] dark:shadow-[8px_8px_0px_#ffffff] z-50 transition-all duration-500 transform rotate-1 rounded-2xl
                ${isMobileMenuOpen ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-10 opacity-0 scale-95 pointer-events-none'}
            `}>
                <div className="flex justify-between items-center pb-4 border-b-4 border-slate-900 dark:border-white">
                    <span className="text-xs font-black font-mono text-ms-blue uppercase tracking-tighter">NAV_SYSTEM v2.0</span>
                    <button 
                        onClick={toggleTheme}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffb900] text-black border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff] text-[10px] font-black uppercase active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all z-20 flex-shrink-0"
                    >
                        {isDark ? (
                            <><img src="/svg/sun.svg" alt="Sun" className="w-3 h-3 dark:invert" /> LIGHT_MODE</>
                        ) : (
                            <><img src="/svg/moon.svg" alt="Moon" className="w-3 h-3 dark:invert" /> DARK_MODE</>
                        )}
                    </button>
                </div>

                <div className="flex flex-col gap-3">
                    {navLinks.map((link, i) => (
                        <NavLink 
                            key={link.name} 
                            to={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) => `
                                text-xl font-black p-4 transition-all border-4 border-slate-900 dark:border-white rounded-full
                                ${isActive 
                                    ? 'bg-ms-blue text-white shadow-[4px_4px_2px_#7F00FF] -rotate-1 translate-x-1' 
                                    : `bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-ms-blue/10 ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 hover:translate-x-1 hover:shadow-[4px_4px_2px_#00A4EF] shadow-none`}
                            `}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                <NavLink 
                    to="/join" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-4 bg-ms-neon text-slate-900 font-black text-center text-xl tracking-tighter border-4 border-slate-900 shadow-[6px_6px_2px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:scale-95 uppercase rounded-full"
                >
                    🚀 JOIN_NOW
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
