import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// NOTE: Since the premium GSAP SplitText plugin might not be available or licensed for all environments,
// I am implementing a robust custom splitting logic that achieves the same effect using standard GSAP.
// This ensures the component works perfectly out-of-the-box.

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SplitText = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars', // 'chars' | 'words'
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  trigger = true,
  enableScrollTrigger = true,
  onLetterAnimationComplete
}) => {
  const ref = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => setFontsLoaded(true));
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded || !trigger) return;
      
      const el = ref.current;
      const targets = el.querySelectorAll(splitType === 'chars' ? '.split-char' : '.split-word');

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign = marginValue === 0 ? '' : marginValue < 0 ? `-=${Math.abs(marginValue)}${marginUnit}` : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      const vars = {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          onComplete: onLetterAnimationComplete,
          willChange: 'transform, opacity',
          force3D: true
      };

      if (enableScrollTrigger) {
          vars.scrollTrigger = {
              trigger: el,
              start,
              once: true,
              fastScrollEnd: true,
              anticipatePin: 0.4
          };
      }

      gsap.fromTo(targets, { ...from }, vars);
    },
    {
      dependencies: [text, fontsLoaded, trigger],
      scope: ref
    }
  );

  const words = text.split(' ');

  return (
    <div 
      ref={ref} 
      className={`inline-block relative ${className}`} 
      style={{ textAlign, opacity: trigger ? 1 : 0, transition: 'opacity 0.3s' }}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="split-word inline-block whitespace-nowrap">
          {splitType === 'chars' 
            ? word.split('').map((char, charIdx) => (
                <span key={charIdx} className="split-char inline-block" style={{ color: "inherit" }}>
                  {char}
                </span>
              ))
            : word}
          {wordIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </div>
  );
};

export default SplitText;
