import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({ children, className = "", delay = 0 }) => {
    const elRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(elRef.current,
            { 
                y: 50, 
                opacity: 0,
                scale: 0.95 
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                delay: delay,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elRef.current,
                    start: "top 85%", // Triggers slightly before element is fully in view
                    toggleActions: "play none none reverse" 
                }
            }
        );
    }, [delay]);

    return (
        <div ref={elRef} className={`will-change-transform ${className}`}>
            {children}
        </div>
    );
};

export default ScrollReveal;
