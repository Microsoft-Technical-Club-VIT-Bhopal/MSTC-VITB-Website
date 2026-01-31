import React, { useEffect, useRef, useState } from 'react';
import { Instagram, Linkedin, MessageSquare, Mail, User, Briefcase, Code, BookOpen, Clock, UploadCloud, ArrowRight, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { createPortal } from 'react-dom';

function YearSelect({ value, onChange, error }) {
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
          onClick={() => setOpen(o => !o)}
          className={`w-full mt-2 p-3 rounded-lg bg-transparent border ${error ? 'border-red-400' : 'border-white/10'} text-left flex items-center justify-between`}
        >
          <span className={`${value ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>{value || 'Select year'}</span>
          <svg className="w-4 h-4 opacity-80" viewBox="0 0 20 20" fill="none" aria-hidden><path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
      {open && createPortal(
        <ul role="listbox" aria-label="Academic year" style={style} className="bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-white/10 overflow-hidden">
          {options.map((opt, i) => (
            <li key={opt} role="option" aria-selected={value===opt} onMouseEnter={() => setActiveIndex(i)} onMouseDown={(e)=>{e.preventDefault(); onChange(opt); setOpen(false);}} className={`px-4 py-3 cursor-pointer ${activeIndex===i ? 'bg-slate-100 dark:bg-slate-800' : ''} ${value===opt ? 'font-semibold' : ''}`}>
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
    honeypot: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.join-hero', { y: 20, opacity: 0, duration: 0.8, stagger: 0.08, scrollTrigger: { trigger: '.join-hero', start: 'top 90%' }, immediateRender: false });
      gsap.from('.benefit-card', { y: 24, opacity: 0, duration: 0.9, stagger: 0.06, scrollTrigger: { trigger: '.benefits', start: 'top 95%' }, immediateRender: false });
    }, formRef);
    return () => ctx.revert();
  }, []);

  const validateStep = (s = step) => {
    const e = {};
    if (s === 0) {
      if (!form.name) e.name = 'Name is required';
      if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    }
    if (s === 1) {
      if (!form.year) e.year = 'Select your year';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep(step)) return;
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
    if (form.honeypot) return; // spam
    if (!validateStep(0) || !validateStep(1)) return setStep(0);
    setSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 900));
      setSubmitted(true);
      try { if (window.gtag) window.gtag('event','join_submit',{email: form.email, name: form.name}); else console.log('join_submit', form); } catch(e){}
    } finally { setSubmitting(false); }
  };

  return (
    <div className="min-h-screen pt-24 pb-32 container mx-auto px-6" ref={formRef}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-8">
          <div className="join-hero">
            <h1 className="text-5xl md:text-6xl font-bold font-display mb-4">Become a <span className="text-ms-blue">Member</span></h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">Join the Microsoft Club to access workshops, mentorship, and a community of builders. Our membership is open to students of all backgrounds.</p>
          </div>

          <div className="benefits grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {icon: <Briefcase />, title: 'Career Growth', desc: 'Mentorship, internships and portfolio projects.'},
              {icon: <Code />, title: 'Hands-on Workshops', desc: 'Azure, AI, Git, and more.'},
              {icon: <BookOpen />, title: 'Learning Resources', desc: 'Curated resources and study groups.'},
              {icon: <Clock />, title: 'Events & Hackathons', desc: 'Compete, collaborate, and win.'}
            ].map((b,i) => (
              <div key={i} className="benefit-card p-5 rounded-2xl bg-white/5 border border-white/5 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-ms-blue">{b.icon}</div>
                  <div>
                    <div className="font-semibold">{b.title}</div>
                    <div className="text-sm text-slate-400">{b.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            <h4 className="font-semibold">Connect with us</h4>
            <div className="flex items-center gap-3">
              <a aria-label="LinkedIn" href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5"><Linkedin /></a>
              <a aria-label="Instagram" href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5"><Instagram /></a>
              <a aria-label="Discord" href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5"><MessageSquare /></a>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-slate-50 dark:bg-white/5 border border-white/10 p-8 shadow-2xl soft-glow">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-ms-blue/10 flex items-center justify-center text-ms-blue"><User /></div>
                <div>
                  <div className="text-sm text-slate-500">Step {step+1} of 4</div>
                  <div className="font-semibold">{['Personal','Profile','Commitment','Review'][step]}</div>
                </div>
              </div>
              <div className="w-48 bg-white/5 rounded-full h-2 overflow-hidden">
                <div className="h-2 bg-ms-blue transition-all" style={{width: `${((step+1)/4)*100}%`}} />
              </div>
            </div>

            {!submitted ? (
              <form onSubmit={(e)=>{e.preventDefault(); step===3 ? submit() : next();}}>
                {/* Step 1 */}
                <div style={{display: step===0 ? 'block' : 'none'}} aria-hidden={step!==0}>
                  <label className="block text-sm font-medium">Full name</label>
                  <input value={form.name} onChange={(e)=>onChange('name', e.target.value)} className={`w-full mt-2 p-3 rounded-lg bg-transparent border ${errors.name ? 'border-red-400' : 'border-white/10'} focus:outline-none`} />
                  {errors.name && <div className="text-xs text-red-400 mt-1">{errors.name}</div>}

                  <label className="block text-sm font-medium mt-4">Email</label>
                  <input value={form.email} onChange={(e)=>onChange('email', e.target.value)} className={`w-full mt-2 p-3 rounded-lg bg-transparent border ${errors.email ? 'border-red-400' : 'border-white/10'} focus:outline-none`} />
                  {errors.email && <div className="text-xs text-red-400 mt-1">{errors.email}</div>}

                  <label className="block text-sm font-medium mt-4">Academic year</label>
                  {/* Custom portal-backed select to avoid native dropdown clipping issues */}
                  <YearSelect
                    value={form.year}
                    onChange={(v)=>onChange('year', v)}
                    error={errors.year}
                  />
                </div>

                {/* Step 2 */}
                <div style={{display: step===1 ? 'block' : 'none'}} aria-hidden={step!==1}>
                  <label className="block text-sm font-medium">Role</label>
                  <div className="flex gap-3 mt-2">
                    {['Member','Volunteer','Organizer'].map(r=> (
                      <button type="button" key={r} onClick={()=>onChange('role', r)} className={`py-2 px-4 rounded-lg ${form.role===r ? 'bg-ms-blue text-white' : 'bg-transparent border border-white/10'}`}>{r}</button>
                    ))}
                  </div>

                  <label className="block text-sm font-medium mt-4">Skills (pick any)</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Web','AI','Cloud','Design','ML'].map(s=> (
                      <button type="button" key={s} onClick={()=>toggleSkill(s)} className={`py-1 px-3 rounded-full ${form.skills.includes(s) ? 'bg-ms-neon text-slate-900' : 'bg-white/5 border border-white/5'}`}>{s}</button>
                    ))}
                  </div>

                  <label className="block text-sm font-medium mt-4">Interests</label>
                  <textarea value={form.interests} onChange={(e)=>onChange('interests', e.target.value)} className="w-full mt-2 p-3 rounded-lg bg-transparent border border-white/10" rows={4} />

                  <div className="mt-4">
                    <label className="block text-sm font-medium">Upload avatar (optional)</label>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="w-20 h-20 rounded-full bg-white/5 overflow-hidden flex items-center justify-center">
                        {avatarPreview ? <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" /> : <UploadCloud />}
                      </div>
                      <div>
                        <input id="avatar" type="file" accept="image/*" onChange={(e)=>onAvatar(e.target.files && e.target.files[0])} className="sr-only" />
                        <label htmlFor="avatar" className="inline-flex items-center gap-2 cursor-pointer text-ms-blue">Choose file</label>
                        {form.avatar && <button type="button" onClick={()=>{setForm(f=>({...f,avatar:null})); setAvatarPreview(null);}} className="ml-3 text-sm text-slate-400">Remove</button>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div style={{display: step===2 ? 'block' : 'none'}} aria-hidden={step!==2}>
                  <label className="block text-sm font-medium">Availability</label>
                  <input value={form.availability} onChange={(e)=>onChange('availability', e.target.value)} className="w-full mt-2 p-3 rounded-lg bg-transparent border border-white/10" placeholder="E.g., Weekends, Evenings" />

                  <div className="mt-4">
                    <label className="inline-flex items-center gap-2"><input type="checkbox" className="accent-ms-blue" /> I agree to the club code of conduct and commit to participating actively.</label>
                  </div>

                  <p className="text-xs text-slate-400 mt-4">We respect your privacy. Your data will be used only for club operations.</p>
                </div>

                {/* Step 4 Review */}
                <div style={{display: step===3 ? 'block' : 'none'}} aria-hidden={step!==3}>
                  <h4 className="font-semibold mb-2">Review</h4>
                  <div className="text-sm text-slate-600 mb-3">Name: <strong>{form.name}</strong></div>
                  <div className="text-sm text-slate-600 mb-3">Email: <strong>{form.email}</strong></div>
                  <div className="text-sm text-slate-600 mb-3">Year: <strong>{form.year}</strong></div>
                  <div className="text-sm text-slate-600 mb-3">Role: <strong>{form.role}</strong></div>
                  <div className="text-sm text-slate-600 mb-3">Skills: <strong>{form.skills.join(', ')}</strong></div>
                  <div className="text-sm text-slate-600 mb-3">Availability: <strong>{form.availability}</strong></div>
                </div>

                {/* honeypot */}
                <input type="text" value={form.honeypot} onChange={(e)=>onChange('honeypot', e.target.value)} className="sr-only" aria-hidden />

                <div className="mt-6 flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-3">
                    {step>0 && <button type="button" onClick={back} className="px-4 py-2 rounded-lg border border-white/10">Back</button>}
                    <button type="submit" className="px-6 py-2 rounded-lg bg-ms-blue text-white font-semibold">{step===3 ? (submitting ? 'Submitting...' : 'Submit') : 'Next'}</button>
                  </div>
                  <div className="text-sm text-slate-400">Need help? <a href="mailto:hello@msclub.example" className="text-ms-blue">Contact us</a></div>
                </div>
              </form>
            ) : (
              <div className="p-8 text-center">
                <div className="text-ms-blue mx-auto w-20 h-20 rounded-full flex items-center justify-center bg-white/5 mb-4"><CheckCircle size={36} /></div>
                <h3 className="text-2xl font-semibold mb-2">Thanks for joining!</h3>
                <p className="text-slate-500 mb-4">We will contact you at <strong>{form.email}</strong> with next steps.</p>
                <div className="flex gap-3 justify-center">
                  <a href="/events" className="px-4 py-2 bg-ms-blue text-white rounded-lg">View Events</a>
                  <a href="/team" className="px-4 py-2 border border-white/10 rounded-lg">Meet the Team</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
