
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Rocket, HeartHandshake, Lightbulb, Star, ArrowRight, Calendar, User } from 'lucide-react';
import TeamCard from '../components/TeamCard';


gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const heroRef = useRef();
  const timelineRef = useRef();
  const valuesRef = useRef();
  const statsRef = useRef();
  const teamRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.1 }
    );
    gsap.from('.about-hero-bg', {
      scale: 0.9,
      opacity: 0.5,
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.2
    });
    const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    const reduced = mq ? mq.matches : false;

    if (reduced) {
      // Gentle fallbacks for reduced motion
      gsap.utils.toArray('.timeline-step').forEach((el, i) => {
        gsap.from(el, { y: 20, opacity: 0, duration: 0.6, delay: 0.08 + i * 0.08, ease: 'power1.out' });
      });
      gsap.utils.toArray('.value-card').forEach((el, i) => {
        gsap.from(el, { y: 12, opacity: 0, duration: 0.6, delay: 0.08 + i * 0.06 });
      });
      gsap.from(statsRef.current, { y: 20, opacity: 0, duration: 0.8 });
      gsap.from(teamRef.current, { y: 20, opacity: 0, duration: 0.8 });
      return;
    }

    // Advanced scroll-driven timeline that pins the section and reveals steps sequentially
    const steps = timelineRef.current.querySelectorAll('.timeline-step');
    const centerLine = timelineRef.current.querySelector('.center-line');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: timelineRef.current,
        start: 'top top+=120',
        end: `+=${Math.max(600, steps.length * 380)}`,
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
        onEnter: () => {},
      }
    });

    // Draw the center connector line as we scroll
    tl.fromTo(centerLine, { scaleY: 0, transformOrigin: 'top center' }, { scaleY: 1, ease: 'none', duration: Math.max(1.6, steps.length * 0.25) }, 0);

    steps.forEach((el, i) => {
      const icon = el.querySelector('.timeline-icon');
      const card = el.querySelector('.timeline-card');

      // step icon pops in with a little overshoot
      tl.fromTo(icon, { scale: 0.7, y: 18, opacity: 0, filter: 'blur(4px)' }, { scale: 1, y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'back.out(1.1)' }, i * 0.55 + 0.1);
      // content slides in shortly after
      tl.fromTo(card, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, `<${0.25}`);

      // add an active class when this step is centered so we can add glows
      ScrollTrigger.create({
        trigger: el,
        start: 'top center+=40',
        end: 'bottom center-=40',
        onEnter: () => el.classList.add('is-active'),
        onEnterBack: () => el.classList.add('is-active'),
        onLeave: () => el.classList.remove('is-active'),
        onLeaveBack: () => el.classList.remove('is-active')
      });
    });

    // when timeline completes (or near complete), reveal Values -> Stats -> Team
    tl.addLabel('revealExtras', `+=${Math.max(0.6, steps.length * 0.2)}`);
    tl.add(() => {
      gsap.fromTo(valuesRef.current.querySelectorAll('.value-card'), { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power2.out' });
    }, 'revealExtras');
    tl.add(() => {
      gsap.fromTo(statsRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });
    }, 'revealExtras+=0.2');
    tl.add(() => {
      gsap.fromTo(teamRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });
    }, 'revealExtras+=0.4');

    // cleanup
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      tl.kill();
    };
  }, []);

  return (
    <div className="min-h-screen pt-20 relative overflow-x-clip">
      <style>{` 
        .timeline-icon{transition:transform .35s ease, box-shadow .35s, filter .35s; display:flex; align-items:center; justify-content:center}
        .timeline-icon > *{width:48px; height:48px}
        .timeline-step.is-active .timeline-icon{transform:scale(1.12); box-shadow:0 18px 40px rgba(59,130,246,0.12); filter:drop-shadow(0 10px 30px rgba(59,130,246,0.08));}
        .timeline-card{transition:transform .35s ease, box-shadow .35s}
        .timeline-step.is-active .timeline-card{transform:translateX(6px) scale(1.01); box-shadow:0 20px 40px rgba(2,6,23,0.12)}

        /* Improved center line styling */
        .center-line{transform-origin:top center; transform:scaleY(0); transition:transform .6s ease; left:50%; transform-origin:top center; z-index:0}
        .center-line{width:1px}
        .center-line::before{content:'';position:absolute;left:50%;transform:translateX(-50%);top:0;bottom:0;width:4px;border-radius:999px;background:linear-gradient(180deg,rgba(59,130,246,0.10),rgba(139,92,246,0.04));filter:blur(4px);opacity:0.45}

        /* Make the vertical connector segments thinner and subtler */
        .timeline-step .connector{width:1px;background:linear-gradient(180deg,rgba(59,130,246,0.12),rgba(139,92,246,0.06));border-radius:999px}

        /* Marker aligned on center line for each step */
        .timeline-step{position:relative; z-index:10}
        .timeline-card{position:relative; z-index:20}
        .timeline-marker{position:absolute;left:50%;transform:translateX(-50%);top:14px;width:10px;height:10px;border-radius:999px;background:linear-gradient(90deg,#60a5fa,#a78bfa);box-shadow:0 8px 24px rgba(59,130,246,0.12);border:2px solid rgba(255,255,255,0.06);transition:transform .35s, box-shadow .35s, background .35s; z-index:30}
        .timeline-step.is-active .timeline-marker{transform:translateX(-50%) scale(1.3);box-shadow:0 18px 46px rgba(59,130,246,0.2)}

        @media (prefers-reduced-motion: reduce){ .timeline-icon,.timeline-card,.center-line{transition:none!important; animation:none!important} }
      `}</style>
      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 container mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-16">
        {/* Blurred Backgrounds */}
        <div className="absolute inset-0 -z-10">
          <div className="about-hero-bg absolute -top-32 -left-32 w-[32rem] h-[32rem] bg-ms-blue/30 rounded-full blur-3xl opacity-70 animate-pulse" />
          <div className="about-hero-bg absolute -bottom-24 right-0 w-[28rem] h-[28rem] bg-ms-purple/30 rounded-full blur-3xl opacity-60 animate-pulse delay-300" />
        </div>
        {/* Text */}
        <div className="flex-1 space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold font-display mb-4 text-slate-900 dark:text-white">
            <span className="hero-calligraphy" data-anim="reveal">Empowering Innovators</span>
          </h1>
          <p className="text-2xl md:text-3xl text-slate-700 dark:text-slate-200 max-w-xl font-medium">
            We are the <span className="text-ms-blue font-bold">Connectors</span>—bridging students, technology, and opportunity.
          </p>
          <div className="flex gap-4 mt-8">
            <a href="#timeline" className="inline-flex items-center px-6 py-3 rounded-full bg-ms-blue text-white font-semibold shadow-lg hover:bg-ms-neon transition-all text-lg group">
              <Rocket className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
              Our Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            <a href="#team" className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass text-ms-blue font-semibold shadow-lg transition-all text-lg border border-white/10 hover:bg-ms-blue hover:text-white hover:text-white hover:scale-105 focus-visible:ring-4 focus-visible:ring-ms-blue/20 btn-animate hover-raise soft-glow" aria-label="Meet the Club">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-ms-blue/8 text-ms-blue transition-transform group-hover:scale-105">
                <Users className="w-5 h-5" />
              </span>
              <span>Meet the Club</span>
            </a>
          </div>
        </div>
        {/* Glass Card Vision */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative h-80 w-full max-w-md rounded-3xl overflow-hidden glass border border-white/20 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-ms-blue/20 to-ms-purple/20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-ms-blue rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-ms-neon rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse delay-700 ml-10 mt-10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl font-bold text-white/10 font-display tracking-widest">VISION</span>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" ref={timelineRef} className="container mx-auto px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold font-display mb-12 text-center text-slate-900 dark:text-white">
          Our Journey
        </h2>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-ms-blue/30 via-ms-neon/30 to-ms-purple/30 -translate-x-1/2 rounded-full center-line" />
          <ol className="relative z-10 space-y-16">
            {[
              {
                icon: <Calendar className="w-10 h-10 text-ms-blue bg-white/80 dark:bg-white/10 rounded-full p-2 shadow-lg" />,
                title: 'Founded',
                desc: 'Microsoft Club was born from a passion for technology and community.',
                year: '2021',
              },
              {
                icon: <Rocket className="w-10 h-10 text-ms-neon bg-white/80 dark:bg-white/10 rounded-full p-2 shadow-lg" />,
                title: 'First Hackathon',
                desc: 'Launched our first 24h hackathon, igniting innovation campus-wide.',
                year: '2022',
              },
              {
                icon: <Lightbulb className="w-10 h-10 text-ms-orange bg-white/80 dark:bg-white/10 rounded-full p-2 shadow-lg" />,
                title: 'Workshops & Growth',
                desc: 'Hosted 50+ workshops, growing a vibrant, diverse community.',
                year: '2023',
              },
              {
                icon: <Star className="w-10 h-10 text-ms-purple bg-white/80 dark:bg-white/10 rounded-full p-2 shadow-lg" />,
                title: 'Recognition',
                desc: 'Recognized as a leading tech club, inspiring future leaders.',
                year: '2024',
              },
            ].map((step, i) => (
              <li key={i} className="timeline-step flex items-center gap-8">
                <div className="flex flex-col items-center">
                  <div className="timeline-icon">{step.icon}</div>
                  {i < 3 && <div className="h-16 connector" />}
                </div>
                {/* decorative marker aligned to center line */}
                <span className="timeline-marker" aria-hidden="true" />
                <div className="timeline-card bg-white/80 dark:bg-white/10 rounded-2xl p-8 shadow-xl border border-white/20 flex-1 soft-glow">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-2xl font-bold text-ms-blue font-display">{step.year}</span>
                    <span className="text-lg font-semibold text-slate-700 dark:text-slate-200">{step.title}</span>
                  </div>
                  <p className="text-lg text-slate-600 dark:text-slate-300">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Core Values Section */}
      <section ref={valuesRef} className="container mx-auto px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold font-display mb-12 text-center text-slate-900 dark:text-white">
          What Drives Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: <HeartHandshake className="w-10 h-10 text-ms-neon mb-4" />,
              title: 'Collaboration',
              desc: 'We believe in the power of teamwork and shared learning.',
            },
            {
              icon: <Lightbulb className="w-10 h-10 text-ms-orange mb-4" />,
              title: 'Innovation',
              desc: 'We foster creativity and encourage bold new ideas.',
            },
            {
              icon: <Star className="w-10 h-10 text-ms-purple mb-4" />,
              title: 'Excellence',
              desc: 'We strive for quality and impact in everything we do.',
            },
          ].map((value, i) => (
            <div key={i} className="value-card bg-white/80 dark:bg-white/10 rounded-2xl p-10 shadow-xl border border-white/20 flex flex-col items-center text-center hover:scale-105 transition-transform duration-500 soft-glow">
              {value.icon}
              <h3 className="text-2xl font-bold font-display mb-2 text-ms-blue dark:text-ms-neon">{value.title}</h3>
              <p className="text-lg text-slate-600 dark:text-slate-300">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="bg-slate-50 dark:bg-white/5 py-24 mb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-ms-blue/5 dark:bg-ms-blue/10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { value: 500, label: 'Active Members', color: 'text-ms-blue', suffix: '+', icon: <Users className="w-8 h-8 mx-auto mb-2 text-ms-blue" /> },
              { value: 50, label: 'Workshops Hosted', color: 'text-ms-green', suffix: '+', icon: <Lightbulb className="w-8 h-8 mx-auto mb-2 text-ms-green" /> },
              { value: 24, label: 'Hackathon Duration', color: 'text-ms-orange', suffix: 'h', icon: <Rocket className="w-8 h-8 mx-auto mb-2 text-ms-orange" /> },
            ].map((stat, index) => (
              <div key={index} className="group p-10 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-ms-blue dark:hover:border-ms-blue hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br from-current to-transparent opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 ease-out" style={{ color: stat.color === 'text-ms-blue' ? '#0078D4' : stat.color === 'text-ms-green' ? '#107C10' : '#D83B01' }} />
                {stat.icon}
                <h3 className={`text-6xl md:text-7xl font-bold font-display mb-4 ${stat.color} flex justify-center items-center`}>
                  <Counter value={stat.value} />
                  <span>{stat.suffix}</span>
                </h3>
                <p className="text-xl font-medium text-slate-600 dark:text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Club Section */}
      <section id="team" ref={teamRef} className="container mx-auto px-6 py-20 relative">
        <h2 className="text-4xl md:text-5xl font-bold font-display mb-12 text-center text-slate-900 dark:text-white">
          Meet the Club
        </h2>
        <div className="absolute -z-10 left-1/2 -translate-x-1/2 top-0 w-[40rem] h-[40rem] bg-ms-purple/20 rounded-full blur-3xl opacity-60 animate-pulse" />
        <div data-anim="stagger" className="grid grid-cols-2 md:grid-cols-4 gap-10 justify-items-center">
          {/* Glassy team cards (use real data when available) */}
          {[
            { id: 1, name: 'Member 1', role: 'Role' },
            { id: 2, name: 'Member 2', role: 'Role' },
            { id: 3, name: 'Member 3', role: 'Role' },
            { id: 4, name: 'Member 4', role: 'Role' },
            { id: 5, name: 'Member 5', role: 'Role' },
            { id: 6, name: 'Member 6', role: 'Role' },
            { id: 7, name: 'Member 7', role: 'Role' },
            { id: 8, name: 'Member 8', role: 'Role' }
          ].map((member) => (
            <div key={member.id} className="w-56">
              <TeamCard member={member} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


function Counter({ value }) {
  const [count, setCount] = React.useState(0);
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to({ val: 0 }, {
        val: value,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.bg-slate-50',
          start: 'top 80%'
        },
        onUpdate: function () {
          setCount(Math.floor(this.targets()[0].val));
        }
      });
    });
    return () => ctx.revert();
  }, [value]);
  return <span>{count}</span>;
}
