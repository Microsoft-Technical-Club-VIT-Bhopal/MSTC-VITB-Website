import React from 'react';

const FunkyBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-50 dark:bg-ms-obsidian pointer-events-none -z-10">
      {/* Blob 1: Blue */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-ms-blue/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob will-change-transform transform-gpu" />
      
      {/* Blob 2: Violet */}
      <div className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] bg-ms-violet/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000 will-change-transform transform-gpu" />
      
      {/* Blob 3: Pink/Neon Accent */}
      <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-pink-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000 will-change-transform transform-gpu" />

      {/* Grid Overlay for Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
      
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default FunkyBackground;
