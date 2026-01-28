import React, { useEffect, useRef, useState } from 'react';
import { Github, Instagram, Linkedin, Heart, ArrowUpRight, Mail, MapPin, Phone, Twitter, Globe, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import events from '../data/events.json';

export default function Footer() {
  const footerRef = useRef(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-item", {
        y: 16,
        duration: 0.8,
        stagger: 0.08,
        immediateRender: false,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom-=100",
        }
      });
      
      gsap.from(".big-text", {
        y: 60,
        duration: 1.2,
        ease: "power4.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        }
      });
    }, footerRef);
    
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 320);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const validateEmail = (e) => /\S+@\S+\.\S+/.test(e);

  const subscribe = async () => {
    if (!validateEmail(email)) return alert('Please enter a valid email');
    setSubmitting(true);
    try {
      // mock API delay
      await new Promise((r) => setTimeout(r, 800));
      setSubscribed(true);
      // analytics
      try { if (window.gtag) window.gtag('event','subscribe',{email}); else console.log('subscribe',email); } catch(e){}
    } finally { setSubmitting(false); }
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer ref={footerRef} data-anim="reveal" className="relative glass soft-glow text-white pt-20 pb-6 overflow-hidden mt-20">      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-ms-blue/16 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-ms-purple/16 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Decorative Wave */}
        <div className="pointer-events-none -mt-8 mb-8">
          <svg className="w-full h-12 text-slate-900" viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0,40 C150,0 350,0 720,40 C1090,80 1290,80 1440,40 L1440 60 L0 60 Z" fill="currentColor" opacity="0.06"></path></svg>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* Brand Column */}
          <div className="md:col-span-4 footer-item">
            <Link to="/" className="text-3xl font-bold font-display tracking-tighter flex items-center gap-2 mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-ms-blue/30 rounded-md" aria-label="MS Club home">
              <span className="text-white">MS Club</span>
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed max-w-sm mb-6">
              Empowering the next generation of tech leaders. Join our community to learn, build, and innovate with Microsoft technologies.
            </p>
            <div className="flex gap-3 mb-3" role="list" aria-label="Social links">
               {[{ icon: Linkedin, href: "#", label: 'LinkedIn' },{ icon: Instagram, href: "#", label: 'Instagram' },{ icon: Github, href: "#", label: 'GitHub' },{ icon: Twitter, href: "#", label: 'Twitter' }].map((Social, index) => (
                 <a 
                   key={index}
                   href={Social.href}
                   aria-label={Social.label}
                   title={Social.label}
                   className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-ms-blue/30"
                 >
                   <Social.icon size={18} className="transform group-hover:scale-110 transition-transform" />
                 </a>
               ))}
            </div>
            <div className="text-slate-400 text-sm mb-2">
              <div className="flex items-center gap-2"><Mail size={14} /> <span>hello@msclub.example</span></div>
              <div className="flex items-center gap-2 mt-1"><Phone size={14} /> <span>+91 90000 00000</span></div>
            </div>
            <div className="mt-4">
              <button onClick={() => { try{ if(window.gtag) window.gtag('event','contact_click'); else console.log('contact_click'); }catch(e){}; window.location.href='#contact'; }} className="inline-flex items-center gap-2 bg-ms-blue text-white px-4 py-2 rounded-full font-semibold hover:scale-105 transition shadow-md focus:outline-none focus-visible:ring-4 focus-visible:ring-ms-blue/30">
                Contact Us
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 footer-item">
            <h4 className="font-bold text-white mb-6">Explore</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/about" className="hover:text-ms-blue transition-colors">About Us</Link></li>
              <li><Link to="/events" className="hover:text-ms-blue transition-colors">Events</Link></li>
              <li><Link to="/team" className="hover:text-ms-blue transition-colors">Team</Link></li>
              <li><Link to="/join" className="hover:text-ms-blue transition-colors">Join Club</Link></li>
            </ul>
          </div>

          {/* Recent Events */}
          <div className="md:col-span-3 footer-item">
            <h4 className="font-bold text-white mb-6">Upcoming</h4>
            <div className="space-y-3 text-slate-300">
              {events.filter(e=>e.status === 'upcoming').slice(0,2).map(ev => (
                <Link key={ev.id} to={`/events#${ev.id}`} className="block p-3 rounded-lg bg-white/5 hover:bg-white/7 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="font-semibold">{ev.title}</div>
                      <div className="text-xs text-slate-400">{ev.date} • {ev.location}</div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter / Sponsors */}
          <div className="md:col-span-3 footer-item">
            <h4 className="font-bold text-white mb-6">Stay Updated</h4>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              {!subscribed ? (
                <>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <input id="email" aria-label="Email address" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email address" className="bg-transparent border-b border-white/20 w-full py-3 pr-3 text-sm focus:outline-none focus:border-ms-blue transition-colors" />
                      <div className="absolute right-2 top-3">
                        <button disabled={submitting} onClick={subscribe} className="inline-flex items-center gap-2 text-ms-blue hover:text-white transition-colors focus:outline-none">
                          {submitting ? '...' : <ArrowUpRight />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">We send 1–2 emails per month. No spam. Unsubscribe anytime.</p>
                </>
              ) : (
                <div className="p-4 rounded-lg bg-ms-blue/10 text-ms-blue">Thanks for subscribing! Check your inbox.</div>
              )}

              {/* <div className="mt-6">
                <h5 className="text-sm font-semibold text-white mb-3">Sponsored by</h5>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-10 bg-white/6 rounded flex items-center justify-center text-sm soft-glow">Sponsor A</div>
                  <div className="w-24 h-10 bg-white/6 rounded flex items-center justify-center text-sm soft-glow">Sponsor B</div>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Big Text / Legal */}
        <div className="border-t border-white/10 pt-8 pb-4">
           <h1 className="text-[8.5vw] md:text-[6.5vw] leading-none font-bold font-display text-transparent bg-clip-text bg-gradient-to-t from-white/30 via-white/12 to-white/0 text-center select-none pointer-events-none big-text" style={{WebkitTextStroke: '0px rgba(255,255,255,0.02)'}}>
             Microsoft 
           </h1>

           <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 mt-4 footer-item gap-3">
              <p>&copy; {new Date().getFullYear()} Microsoft Club. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <Link to="/privacy" className="hover:text-ms-blue">Privacy</Link>
                <Link to="/terms" className="hover:text-ms-blue">Terms</Link>
                <button onClick={() => { try { if(window.gtag) window.gtag('click_feedback'); else console.log('feedback'); } catch(e){}; alert('Thanks for the feedback!'); }} className="hover:text-ms-blue">Send Feedback</button>
              </div>
              <p className="flex items-center gap-1">Designed with <Heart size={12} className="text-ms-blue fill-current" /> by Tech Team</p>
           </div>
        </div>

        {/* Back to top button */}
        <div className="fixed right-6 bottom-8 z-50">
          <button onClick={scrollTop} aria-label="Back to top" title="Back to top" className={`w-12 h-12 rounded-full bg-white/6 backdrop-blur-sm text-white flex items-center justify-center shadow-lg transition-transform ${showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}`}>
            <ChevronUp />
          </button>
        </div>

      </div>
    </footer>
  );
}
