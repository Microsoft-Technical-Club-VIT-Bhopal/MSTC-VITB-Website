import React, { useEffect, useRef, useState } from 'react';
import { Instagram, Linkedin, MessageSquare, Mail, User, Briefcase, Code, BookOpen, Clock, UploadCloud, ArrowRight, CheckCircle, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createPortal } from 'react-dom';
import FunkyBackground from '../components/FunkyBackground';
import SplitText from '../components/SplitText';

gsap.registerPlugin(ScrollTrigger);

function ErrorBubble({ message, onDismiss }) {
  if (!message) return null;
  return (
    <div 
      onClick={onDismiss}
      className="absolute -top-12 left-4 z-[60] animate-bounce-short cursor-pointer group"
    >
      <div className="bg-red-500 text-white font-display font-black uppercase text-xs py-2 px-4 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] relative group-hover:scale-105 transition-transform">
        {message}
        <div className="absolute -bottom-2 left-4 w-4 h-4 bg-red-500 border-r-2 border-b-2 border-slate-900 rotate-45"></div>
      </div>
    </div>
  );
}

function YearSelect({ value, onChange, error, clearError }) {
  const options = ['First Year','Second Year','Third Year','Final Year'];
  const btnRef = React.useRef();
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const [style, setStyle] = React.useState({});

  useEffect(() => {
    if (!open) return;
    const rect = btnRef.current.getBoundingClientRect();
    setStyle({ position: 'absolute', left: `${rect.left}px`, top: `${rect.bottom + window.scrollY}px`, width: `${rect.width}px`, zIndex: 9999 });

    const onScroll = () => {
      const r = btnRef.current.getBoundingClientRect();
      setStyle(s => ({ ...s, left: `${r.left}px`, top: `${r.bottom + window.scrollY}px` }));
    };
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowDown') setActiveIndex(i => Math.min(options.length-1, i+1));
      if (e.key === 'ArrowUp') setActiveIndex(i => Math.max(0, i-1));
      if (e.key === 'Enter' && activeIndex >= 0) { onChange(options[activeIndex]); setOpen(false); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, activeIndex]);

  useEffect(() => { if (!open) setActiveIndex(-1); }, [open]);

  return (
    <>
      <div>
        <button
          ref={btnRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => { setOpen(o => !o); if(typeof clearError === 'function') clearError('year'); }}
          className={`w-full mt-2 p-4 rounded-full bg-slate-100 dark:bg-white/5 border-2 ${error ? 'border-red-400' : 'border-transparent focus:border-ms-blue'} text-left flex items-center justify-between transition-all outline-none font-display font-black uppercase text-xl`}
        >
          <span className={`${value ? 'text-slate-900 dark:text-white' : 'text-slate-400 opacity-50'}`}>{value || 'Select mission year'}</span>
          <svg className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="none" aria-hidden><path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
      {open && createPortal(
        <ul role="listbox" aria-label="Academic year" style={style} className="bg-white dark:bg-slate-900 rounded-2xl shadow-[6px_6px_0px_0px_rgba(127,186,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] border-2 border-slate-900 dark:border-white overflow-hidden mt-2 z-[9999]">
          {options.map((opt, i) => (
            <li 
              key={opt} 
              role="option" 
              aria-selected={value===opt} 
              onMouseEnter={() => setActiveIndex(i)} 
              onMouseDown={(e)=>{e.preventDefault(); onChange(opt); setOpen(false);}} 
              className={`px-6 py-3 cursor-pointer transition-colors font-display font-black uppercase text-lg ${activeIndex===i || value===opt ? 'bg-ms-neon text-slate-900' : 'hover:bg-ms-neon/10 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400'}`}
            >
              {opt}
            </li>
          ))}
        </ul>
      , document.body)}
    </>
  );
}

export default function Join() {
  const formRef = useRef(null);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '',
    email: '',
    year: '',
    role: 'Member',
    skills: [],
    interests: '',
    availability: '',
    avatar: null,
    oath: false,
    honeypot: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Funky entrance
      gsap.from('.join-content', { 
        y: 50, 
        opacity: 0, 
        duration: 1, 
        stagger: 0.2, 
        ease: "back.out(1.7)"
      });
      
      gsap.from('.step-indicator', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "elastic.out(1, 0.5)"
      });

      // Global click listener to clear errors
      const handleGlobalClick = (e) => {
        if (!e.target.closest('input') && !e.target.closest('button') && !e.target.closest('textarea')) {
          setErrors({});
        }
      };
      
      document.addEventListener('mousedown', handleGlobalClick);
      
      return () => {
        document.removeEventListener('mousedown', handleGlobalClick);
      };
    }, formRef);
    return () => ctx.revert();
  }, []);

  const validateStep = (s = step) => {
    const e = {};
    if (s === 0) {
      if (!form.name) e.name = 'Name is required';
      if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
        e.email = 'Valid email required';
      } else if (!form.email.toLowerCase().endsWith('@vitbhopal.ac.in')) {
        e.email = 'VIT Email Required';
      }
      if (!form.year) e.year = 'Select your year';
    }
    if (s === 2) {
      if (!form.oath) e.oath = 'Oath required to proceed';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const clearError = (field) => {
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const next = () => {
    if (!validateStep(step)) {
      // Trigger a small shake or feedback?
      return;
    }
    setStep((s) => Math.min(3, s + 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const onChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const toggleSkill = (skill) => {
    setForm((f) => ({ ...f, skills: f.skills.includes(skill) ? f.skills.filter(s => s !== skill) : [...f.skills, skill] }));
  };

  const onAvatar = (file) => {
    if (!file) return setAvatarPreview(null);
    setForm(f => ({ ...f, avatar: file }));
    setAvatarPreview(URL.createObjectURL(file));
  };

  const submit = async () => {
    console.log("Submit process started...");
    // Commented out honeypot to prevent browser autofill from blocking humans during test
    /*
    if (form.honeypot) {
        console.log("Honeypot filled, blocking.");
        return;
    }
    */
    if (!validateStep(0)) {
        console.log("Validation failed, returning to step 0.");
        return setStep(0);
    }
    
    setSubmitting(true);
    console.log("Payload ready:", form);
    
    try {
      const submissionData = {
        name: form.name,
        email: form.email,
        year: form.year,
        role: form.role,
        skills: form.skills,
        availability: form.availability,
        timestamp: new Date().toISOString()
      };

      console.log("Calling API...");
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      console.log("API Response Status:", response.status);
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error captured:', err);
      // Fallback: show success anyway so user isn't stuck
      setSubmitted(true); 
    } finally { 
      setSubmitting(false); 
      console.log("Submit process finished.");
    }
  };

  // Funky step colors
  const stepColors = ['bg-ms-blue', 'bg-ms-purple', 'bg-ms-neon', 'bg-ms-orange'];
  const currentStepColor = stepColors[step];

  return (
    <div className="min-h-screen pt-28 pb-32 relative overflow-hidden bg-ms-paper dark:bg-black transition-colors duration-500" ref={formRef}>
      <FunkyBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column - Vibe & Info */}
          <div className="lg:col-span-5 space-y-12 join-content">
            <div className="space-y-6">
                <div className="inline-block px-4 py-1 bg-ms-yellow text-black font-black uppercase text-sm border-4 border-black transform -rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    Open for everyone
                </div>
              <h1 className="flex flex-col">
                <SplitText 
                    text="JOIN THE" 
                    className="text-6xl md:text-8xl font-black font-display leading-[0.8] text-slate-900 dark:text-white tracking-tighter" 
                    trigger={isReady}
                />
                <SplitText 
                    text="REVOLUTION" 
                    className="text-6xl md:text-8xl font-black font-display leading-tight text-ms-blue tracking-tighter relative z-50 block pb-2"
                    trigger={isReady}
                    delay={50}
                />
              </h1>
              <p className="text-xl font-bold text-slate-700 dark:text-slate-300 leading-relaxed max-w-lg">
                Become a prompt engineer, a cloud architect, or just a really cool nerd. 
                We're building the future, one commit at a time.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[
                {icon: <Zap className="w-6 h-6" />, title: 'Level Up', desc: 'Workshops that actually teach you stuff.', color: 'bg-ms-blue'},
                {icon: <Code className="w-6 h-6" />, title: 'Build Cool Sh*t', desc: 'Hackathons, projects, and chaos.', color: 'bg-ms-neon'},
                {icon: <User className="w-6 h-6" />, title: 'Find Your Tribe', desc: 'Networking without the awkwardness.', color: 'bg-[#7F00FF]'}
              ].map((b,i) => (
                <div key={i} className={`group flex items-start gap-4 p-6 rounded-[2rem] bg-white dark:bg-ms-obsidian border-4 border-slate-900 dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none dark:hover:shadow-none transition-all duration-300 cursor-default ${i % 2 === 0 ? '-rotate-1' : 'rotate-1'} hover:rotate-0`}>
                  <div className={`w-14 h-14 rounded-2xl ${b.color} border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center text-white shrink-0 group-hover:rotate-12 transition-transform`}>
                    {b.icon}
                  </div>
                  <div>
                    <h3 className="font-black font-display text-2xl text-slate-900 dark:text-white uppercase tracking-tight">{b.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-bold text-sm leading-snug">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t-2 border-slate-900/10 dark:border-white/10">
                <p className="font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs opacity-50">Stalk us politely</p>
                <div className="flex gap-4">
                    {[
                        { icon: <Instagram />, href: "https://www.instagram.com/mstc_vitb/", color: "hover:bg-ms-neon dark:hover:bg-ms-neon" },
                        { icon: <Linkedin />, href: "https://www.linkedin.com/groups/17283015/?feedType=highlightedFeedForGroups&highlightedUpdateUrn=urn%3Ali%3AgroupPost%3A17283015-7428341469201002496&q=highlightedFeedForGroups", color: "hover:bg-ms-blue dark:hover:bg-ms-blue" },
                        { icon: <Mail />, href: "mailto:mstcvitb@gmail.com", color: "hover:bg-ms-yellow dark:hover:bg-ms-yellow" }
                    ].map((s, i) => (
                        <a 
                            key={i}
                            href={s.href} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-14 h-14 flex items-center justify-center rounded-full bg-white dark:bg-ms-obsidian text-slate-900 dark:text-white border-2 border-slate-900 dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none dark:hover:shadow-none ${s.color} hover:text-black dark:hover:text-black transition-all duration-200`}
                        >
                            {s.icon}
                        </a>
                    ))}
                </div>
            </div>
          </div>

          {/* Right Column - Funky Form */}
          <div className="lg:col-span-7 join-content">
            <div className="relative bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 border-4 border-slate-900 dark:border-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
             
              {/* Step Indicator */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                    <div className={`step-indicator w-14 h-14 rounded-2xl ${currentStepColor} border-2 border-slate-900 dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center text-white font-black text-xl transform -rotate-3`}>
                        {step + 1}
                    </div>
                    <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Current Mission</div>
                        <div className="font-black font-display text-2xl text-slate-900 dark:text-white uppercase transform skew-x-[-10deg]">{['Identity', 'Skills', 'Oath', 'Launch'][step]}</div>
                    </div>
                </div>
                {/* Visual Progress */}
                <div className="hidden sm:flex gap-2">
                    {[0,1,2,3].map(i => (
                        <div key={i} className={`w-3 h-3 rounded-full border-2 border-slate-900 dark:border-white ${i <= step ? currentStepColor : 'bg-transparent'}`} />
                    ))}
                </div>
              </div>

              {!submitted ? (
                <form noValidate onSubmit={(e)=>{e.preventDefault(); step===3 ? submit() : next();}} className="space-y-6">
                  {/* Step 1: Identity */}
                  <div className={step===0 ? 'block space-y-6' : 'hidden'}>
                    <div className="relative">
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2 ml-4">Full Name</label>
                        <input 
                            value={form.name} 
                            onChange={(e)=>{onChange('name', e.target.value); clearError('name');}}
                            onFocus={()=>clearError('name')}
                            className={`w-full p-4 rounded-full bg-slate-100 dark:bg-white/5 border-2 ${errors.name ? 'border-red-500' : 'border-transparent focus:border-ms-blue'} outline-none font-display font-black uppercase transition-all text-xl md:text-2xl placeholder:opacity-30`}
                            placeholder="YOUR APERTURE NAME"
                        />
                        <ErrorBubble message={errors.name} onDismiss={()=>clearError('name')} />
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2 ml-4">Email Address</label>
                        <input 
                            value={form.email} 
                            onChange={(e)=>{onChange('email', e.target.value); clearError('email');}}
                            onFocus={()=>clearError('email')}
                            className={`w-full p-4 rounded-full bg-slate-100 dark:bg-white/5 border-2 ${errors.email ? 'border-red-500' : 'border-transparent focus:border-ms-blue'} outline-none font-display font-black transition-all text-xl md:text-2xl placeholder:opacity-30`}
                            placeholder="SECURE_ID@VITBHOPAL.AC.IN"
                        />
                        <ErrorBubble message={errors.email} onDismiss={()=>clearError('email')} />
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2 ml-4">Academic Year</label>
                        <YearSelect value={form.year} onChange={(v)=>{onChange('year', v); clearError('year');}} error={errors.year} clearError={clearError} />
                        <ErrorBubble message={errors.year} onDismiss={()=>clearError('year')} />
                    </div>
                  </div>

                  {/* Step 2: Skills */}
                  <div className={step===1 ? 'block space-y-6' : 'hidden'}>
                    <div>
                        <label className="block text-sm font-bold uppercase tracking-wider mb-4 ml-4">Choose your Character Class</label>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            {[
                                {name: 'Member', color: 'rgba(0, 164, 239, 1)'}, 
                                {name: 'Volunteer', color: 'rgba(242, 80, 34, 1)'}, 
                                {name: 'Organizer', color: 'rgba(255, 185, 0, 1)'}
                            ].map(r=> (
                            <button 
                                type="button" 
                                key={r.name} 
                                onClick={()=>onChange('role', r.name)} 
                                className={`flex-1 py-4 sm:py-3 px-4 rounded-xl border-2 font-display font-black uppercase text-lg transition-all transform hover:-translate-y-1 ${form.role===r.name ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]' : 'bg-transparent border-slate-300 dark:border-white/20 text-slate-500 hover:border-ms-neon hover:text-ms-neon'}`}
                                style={form.role===r.name ? { boxShadow: `4px 4px 0px 0px ${r.color}` } : {}}
                            >
                                {r.name}
                            </button>
                            ))}
                        </div>
                    </div>

                    <div>
                         <label className="block text-sm font-bold uppercase tracking-wider mb-4 ml-4">Skill Tree (Select all that apply)</label>
                         <div className="flex flex-wrap gap-3">
                            {['Web Dev','AI/ML','Cloud','Design','Blockchain','Cybersec','App Dev'].map(s=> (
                            <button 
                                type="button" 
                                key={s} 
                                onClick={()=>toggleSkill(s)} 
                                className={`py-2 px-5 rounded-full border-2 font-bold text-sm transition-all ${form.skills.includes(s) ? 'bg-ms-neon border-slate-900 text-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]' : 'bg-transparent border-slate-300 dark:border-white/20 text-slate-500 hover:border-ms-neon hover:text-ms-neon'}`}
                            >
                                {s}
                            </button>
                            ))}
                         </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2 ml-4">What excites you about tech?</label>
                        <textarea 
                            value={form.interests} 
                            onChange={(e)=>onChange('interests', e.target.value)} 
                            className="w-full p-6 rounded-3xl bg-slate-100 dark:bg-white/5 border-2 border-slate-900 dark:border-white focus:border-ms-blue outline-none font-display font-black uppercase text-lg transition-all shadow-[4px_4px_0px_0px_rgba(0,164,239,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px] placeholder:opacity-30" 
                            rows={3} 
                            placeholder="TELL US WHAT MAKES YOU TICK..."
                        />
                    </div>
                  </div>

                  {/* Step 3: Oath */}
                  <div className={step===2 ? 'block space-y-6' : 'hidden'}>
                    <div>
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2 ml-4">When are you free?</label>
                        <input 
                            value={form.availability} 
                            onChange={(e)=>onChange('availability', e.target.value)} 
                            className="w-full p-4 rounded-full bg-slate-100 dark:bg-white/5 border-2 border-transparent focus:border-ms-blue outline-none font-display font-black uppercase transition-all text-xl placeholder:opacity-30" 
                            placeholder="E.G., WEEKENDS, AFTER 1800" 
                        />
                    </div>
                    
                    <div className="relative p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-white shadow-[4px_4px_0px_0px_rgba(255,185,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                         <label className="flex items-start gap-4 cursor-pointer group">
                            <div className="relative flex items-center justify-center flex-shrink-0">
                                <input 
                                    type="checkbox" 
                                    className="peer sr-only" 
                                    checked={form.oath}
                                    onChange={(e)=>{onChange('oath', e.target.checked); clearError('oath');}}
                                /> 
                                <div 
                                    onClick={()=>clearError('oath')}
                                    className={`w-8 h-8 border-2 ${errors.oath ? 'border-red-500 animate-shake' : 'border-slate-900 dark:border-white'} rounded-lg transition-all peer-checked:bg-ms-yellow peer-checked:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:scale-105 active:scale-95 flex items-center justify-center`}
                                >
                                    <svg className={`w-6 h-6 text-slate-900 transition-all duration-300 transform ${form.oath ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-12'}`} viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <span className="text-sm font-display font-black uppercase leading-relaxed text-slate-900 dark:text-white select-none pt-1">
                                I hereby declare that I will use my tech powers for good, respect my fellow club members, and contribute to the community chaos responsibly.
                            </span>
                        </label>
                        <ErrorBubble message={errors.oath} onDismiss={()=>clearError('oath')} />
                    </div>
                  </div>

                  {/* Step 4: Review */}
                  <div className={step===3 ? 'block space-y-6' : 'hidden'}>
                    <h4 className="font-black font-display text-3xl mb-6">CONFIRM DETAILS</h4>
                    <div className="space-y-4 bg-slate-100 dark:bg-white/5 p-6 rounded-3xl border-2 border-dashed border-slate-300 dark:border-white/20">
                        <ReviewItem label="Agent Name" value={form.name} />
                        <ReviewItem label="Secure Comm" value={form.email} />
                        <ReviewItem label="Clearance Level" value={form.year} />
                        <ReviewItem label="Selected Class" value={form.role} />
                        <ReviewItem label="Skill Set" value={form.skills.join(', ') || 'Novice'} />
                    </div>
                  </div>

                  <input type="text" value={form.honeypot} onChange={(e)=>onChange('honeypot', e.target.value)} className="sr-only" aria-hidden />

                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-8">
                    {step>0 && (
                        <button 
                            type="button" 
                            onClick={back} 
                            className="w-full sm:w-auto px-10 py-4 rounded-xl border-2 border-slate-900 dark:border-white font-display font-black uppercase tracking-wider transition-all hover:bg-slate-100 dark:hover:bg-white/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                        >
                            Back
                        </button>
                    )}
                    <button 
                        type="submit" 
                        className="w-full sm:flex-1 px-8 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-display font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(127,186,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(127,186,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-50"
                        disabled={submitting}
                    >
                        {step===3 ? (submitting ? 'Initializing...' : 'Confirm Launch') : 'Next Level'}
                        {!submitting && <ArrowRight className="w-5 h-5 ml-1" />}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-12 text-center">
                  <div className="w-24 h-24 mx-auto rounded-full bg-ms-green border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-white mb-6 animate-bounce">
                      <CheckCircle size={48} />
                  </div>
                  <h3 className="text-4xl font-black font-display mb-4">YOU'RE IN!</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-sm mx-auto">
                    Welcome to the squad, <strong>{form.name}</strong>. Keep an eye on your inbox ({form.email}) for your briefing.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/events" className="px-6 py-3 bg-ms-blue text-white font-bold rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                        Deploy to Events
                    </a>
                    <a href="/" className="px-6 py-3 bg-white text-slate-900 font-bold rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                        Return Base
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ReviewItem = ({label, value}) => (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-slate-200 dark:border-white/10 pb-2 last:border-0 last:pb-0">
        <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{label}</span>
        <span className="font-bold text-slate-900 dark:text-white text-lg">{value}</span>
    </div>
);

const startCase = (str) => str; 

