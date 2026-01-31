import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        
        // Initialize theme
        if (localStorage.theme === 'light') {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        } else {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        }

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
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Events', path: '/events' },
        { name: 'Team', path: '/team' }
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
            <div className="container mx-auto px-6 flex justify-center">
                <div className={`
                    flex items-center justify-between px-6 py-3 rounded-full 
                    transition-all duration-500 w-full max-w-6xl
                    ${scrolled ? 'bg-white/80 dark:bg-ms-obsidian/60 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-lg' : 'bg-transparent border border-transparent'}
                `}>
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                         {/* Placeholder Icon */}
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ms-blue to-ms-violet flex items-center justify-center shadow-[0_0_15px_rgba(0,164,239,0.3)]">
                            <span className="font-bold text-white text-xl">M</span>
                        </div>
                        <span className="font-display font-bold text-xl tracking-tight hidden md:block text-gray-900 dark:text-white">
                            MSTC <span className="text-ms-blue">VITB</span>
                        </span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <NavLink 
                                key={link.name} 
                                to={link.path}
                                className={({ isActive }) => `
                                    relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                                    ${isActive ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-white/10' : 'text-gray-600 dark:text-ms-dim hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'}
                                `}
                            >
                                {({ isActive }) => (
                                    <div className="flex flex-col items-center">
                                        {link.name}
                                        {isActive && (
                                            <span className="absolute -bottom-1 w-1 h-1 bg-ms-blue dark:bg-ms-neon rounded-full shadow-[0_0_8px_rgba(0,164,239,0.5)]" />
                                        )}
                                    </div>
                                )}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Theme Toggle */}
                        <button 
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {/* CTA Button */}
                        <button className="group relative px-6 py-2.5 rounded-full overflow-hidden bg-gray-900 dark:bg-white text-white dark:text-black font-semibold text-sm transition-all hover:shadow-[0_0_20px_rgba(0,164,239,0.3)]">
                            <span className="relative z-10 group-hover:text-ms-blue transition-colors">Join Now</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-ms-blue to-ms-violet opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                     <button 
                         className="md:hidden text-gray-900 dark:text-white p-2"
                         onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                     >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                     </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-24 left-4 right-4 bg-white/95 dark:bg-ms-obsidian/95 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:hidden flex flex-col gap-4 shadow-2xl animate-in fade-in slide-in-from-top-4 z-40">
                    <div className="flex justify-end">
                        <button 
                            onClick={toggleTheme}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white"
                        >
                            {isDark ? <><Sun size={18} /> Light Mode</> : <><Moon size={18} /> Dark Mode</>}
                        </button>
                    </div>
                    {navLinks.map((link) => (
                        <NavLink 
                            key={link.name} 
                            to={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) => `
                                text-lg font-medium p-4 rounded-xl transition-all border border-transparent
                                ${isActive ? 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-ms-blue dark:text-ms-neon' : 'text-gray-600 dark:text-ms-dim hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'}
                            `}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                    <button className="w-full py-4 rounded-xl bg-gradient-to-r from-ms-blue to-ms-violet text-white font-bold mt-2 shadow-lg shadow-ms-blue/20">
                        Join the Club
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
