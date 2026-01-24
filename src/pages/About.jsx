import React, { useEffect } from 'react';
import gsap from 'gsap';

export default function About() {
  
  useEffect(() => {
    gsap.from(".reveal-text", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 80%",
      }
    });
  }, []);

  return (
    <div className="min-h-screen pt-20">
      {/* Intro */}
      <section className="container mx-auto px-6 py-20 about-section">
        <h1 className="text-5xl md:text-7xl font-bold font-display mb-12 text-slate-900 dark:text-white reveal-text">
          We are the <span className="text-ms-blue">Connectors</span>.
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8 reveal-text">
            <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-300">
              The Microsoft Club is a student-led community dedicated to empowering individuals through technology. We believe in the power of code to solve real-world problems.
            </p>
            <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-300">
              Our mission is to bridge the gap between academic learning and industry standards, providing hands-on experience with the latest Microsoft technologies, from Azure to AI.
            </p>
          </div>
          
          <div className="relative h-80 rounded-3xl overflow-hidden glass border border-white/20 reveal-text">
            <div className="absolute inset-0 bg-gradient-to-br from-ms-blue/20 to-ms-purple/20"></div>
            {/* Geometric Shapes */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-ms-blue rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-ms-neon rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-700 ml-10 mt-10"></div>
          
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl font-bold text-white/10 font-display">VISION</span>
             </div>
          </div>
        </div>
      </section>

      {/* Stats/Values */}
      <section className="bg-slate-50 dark:bg-white/5 py-24 mb-20 relative overflow-hidden">
         <div className="absolute inset-0 bg-ms-blue/5 dark:bg-ms-blue/10 pointer-events-none"></div>
         
         <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {[
                  { value: 500, label: "Active Members", color: "text-ms-blue", suffix: "+" },
                  { value: 50, label: "Workshops Hosted", color: "text-ms-green", suffix: "+" },
                  { value: 24, label: "Hackathon Duration", color: "text-ms-orange", suffix: "h" }
                ].map((stat, index) => (
                  <div key={index} className="group p-10 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-ms-blue dark:hover:border-ms-blue hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                      <div className="absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br from-current to-transparent opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 ease-out" style={{ color: stat.color === 'text-ms-blue' ? '#0078D4' : stat.color === 'text-ms-green' ? '#107C10' : '#D83B01' }}></div>
                      
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
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".bg-slate-50", 
          start: "top 80%"
        },
        onUpdate: function() {
          setCount(Math.floor(this.targets()[0].val));
        }
      });
    });
    return () => ctx.revert();
  }, [value]);
  
  return <span>{count}</span>;
}
