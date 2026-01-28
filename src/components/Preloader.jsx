import React, { useEffect, useState } from 'react';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    // Hide preloader after window 'load' or fallback timeout
    const onLoad = () => {
      setHiding(true);
      // allow CSS fade to complete
      setTimeout(() => setVisible(false), 520);
    };

    window.addEventListener('load', onLoad);

    // Fallback in case 'load' doesn't fire quickly (dev HMR, fast refresh)
    const fallback = setTimeout(() => {
      if (!hiding) onLoad();
    }, 2200);

    return () => {
      window.removeEventListener('load', onLoad);
      clearTimeout(fallback);
    };
  }, [hiding]);

  if (!visible) return null;

  return (
    <div className={`preloader ${hiding ? 'preloader--hide' : ''}`} role="status" aria-live="polite">
      <div className="preloader-inner">
        <div className="preloader-ring" aria-hidden>
          <svg viewBox="0 0 100 100" width="88" height="88" aria-hidden>
            <defs>
              <linearGradient id="preloader-grad" x1="0%" x2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="none" stroke="url(#preloader-grad)" strokeWidth="6" strokeLinecap="round" strokeDasharray="68 126" strokeDashoffset="0" />
          </svg>
        </div>

        <div className="preloader-brand">
          <div className="preloader-logo">MS Club</div>
          <div className="preloader-text hero-calligraphy hero-calligraphy--sm">Empowering Innovators</div>
        </div>

        <span className="sr-only">Loading Microsoft Club</span>
      </div>
    </div>
  );
}
