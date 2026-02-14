import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

const ConnectDots = () => {
    const [connections, setConnections] = useState([]);
    const [activeDot, setActiveDot] = useState(null);

    // Positions for 4 dots in a funky square
    const dots = [
        { id: 0, x: 20, y: 20 },
        { id: 1, x: 80, y: 20 },
        { id: 2, x: 80, y: 80 },
        { id: 3, x: 20, y: 80 }
    ];

    const handleDotClick = (id) => {
        if (activeDot === null) {
            setActiveDot(id);
        } else if (activeDot === id) {
            setActiveDot(null);
        } else {
            // Add connection if not already exists
            const pair = [activeDot, id].sort().join('-');
            if (!connections.includes(pair)) {
                setConnections([...connections, pair]);
            } else {
                // Toggle off
                setConnections(connections.filter(c => c !== pair));
            }
            setActiveDot(null);
        }
    };

    const isComplete = connections.length === 4;

    return (
        <div className="relative w-48 h-48 md:w-56 md:h-56 bg-white dark:bg-ms-obsidian border-4 border-slate-900 dark:border-white rounded-[2rem] shadow-[8px_8px_0px_0px_#7FBA00] hover:rotate-2 transition-all duration-300 p-4 transform rotate-3">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {connections.map(c => {
                    const [id1, id2] = c.split('-').map(Number);
                    const d1 = dots[id1];
                    const d2 = dots[id2];
                    return (
                        <line 
                            key={c}
                            x1={`${d1.x}%`} y1={`${d1.y}%`}
                            x2={`${d2.x}%`} y2={`${d2.y}%`}
                            stroke={isComplete ? '#00A4EF' : '#94a3b8'}
                            strokeWidth="4"
                            strokeLinecap="round"
                            className={isComplete ? 'animate-pulse' : ''}
                        />
                    );
                })}
            </svg>
            
            {dots.map(dot => (
                <button
                    key={dot.id}
                    onClick={() => handleDotClick(dot.id)}
                    style={{ left: `${dot.x}%`, top: `${dot.y}%`, transform: 'translate(-50%, -50%)' }}
                    className={`absolute w-6 h-6 rounded-full border-4 border-slate-900 dark:border-white transition-all z-10 
                        ${activeDot === dot.id ? 'bg-ms-blue scale-125' : 'bg-ms-neon'}
                        ${isComplete ? 'shadow-[0_0_20px_#00A4EF]' : 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}
                        hover:scale-110 active:scale-95
                    `}
                />
            ))}

            <div className="absolute bottom-4 left-0 w-full text-center">
                <span className={`text-[10px] font-black uppercase tracking-tighter ${isReady ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                    {isComplete ? 'CONNECTED!' : 'CONNECT 4 DOTS'}
                </span>
            </div>

            <button 
                onClick={() => setConnections([])}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-ms-yellow border-2 border-slate-900 rounded-lg text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-[-2px] hover:translate-y-0 transition-all z-20 group"
                title="Reset Game"
            >
                <RotateCcw size={14} className="group-hover:rotate-[-45deg] transition-transform" />
            </button>
        </div>
    );
};

const isReady = true; // Placeholder for logic inside component

export default ConnectDots;
