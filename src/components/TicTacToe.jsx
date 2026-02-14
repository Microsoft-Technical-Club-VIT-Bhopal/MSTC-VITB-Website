import React, { useState, useEffect } from 'react';
import { X, Circle, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const checkWinner = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const winner = checkWinner(board);

    useEffect(() => {
        if (winner) {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(function() {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                // since particles fall down, start a bit higher than random
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [winner]);

    const handleClick = (i) => {
        if (winner || board[i]) return;
        const newBoard = board.slice();
        newBoard[i] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const reset = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    return (
        <div className="flex flex-col items-center gap-3 bg-white dark:bg-ms-obsidian p-4 rounded-[2rem] border-4 border-slate-900 dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transform -rotate-1 hover:rotate-0 transition-all duration-300 scale-90 md:scale-100">
            <div className="relative">
                <div className="grid grid-cols-3 gap-2">
                    {board.map((cell, i) => (
                        <button
                            key={i}
                            onClick={() => handleClick(i)}
                            className={`w-11 h-11 md:w-16 md:h-16 flex items-center justify-center bg-slate-50 dark:bg-white/5 border-2 border-slate-900 dark:border-white rounded-xl transition-all hover:bg-slate-100 dark:hover:bg-white/10 group relative overflow-hidden`}
                        >
                            {cell === 'X' && (
                                <X size={28} className="text-ms-blue md:w-9 md:h-9 animate-in zoom-in duration-300" strokeWidth={4} />
                            )}
                            {cell === 'O' && (
                                <Circle size={24} className="text-ms-neon md:w-8 md:h-8 animate-in zoom-in duration-300" strokeWidth={4} />
                            )}
                            {!cell && !winner && (
                                <div className="opacity-0 group-hover:opacity-20 transition-opacity">
                                    {isXNext ? <X size={24} /> : <Circle size={20} />}
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="flex flex-col items-center gap-1 mt-1">
                {winner ? (
                    <div className="text-base font-black uppercase tracking-tighter text-ms-blue flex items-center gap-2 animate-bounce">
                        {winner === 'X' ? <X strokeWidth={4} size={16}/> : <Circle strokeWidth={4} size={14}/>}
                        WINS!
                    </div>
                ) : board.every(Boolean) ? (
                    <div className="text-xs font-black uppercase tracking-tighter text-slate-500">STALEMATE</div>
                ) : (
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500/60">
                        NEXT: {isXNext ? <X size={12} strokeWidth={3}/> : <Circle size={10} strokeWidth={3}/>}
                    </div>
                )}
                
                <button 
                    onClick={reset}
                    className="mt-1 flex items-center gap-2 px-4 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-lg font-black text-[10px] uppercase shadow-[3px_3px_0px_0px_#00A4EF] hover:shadow-none translate-y-[-2px] hover:translate-y-0 transition-all active:scale-95"
                >
                    <RotateCcw size={12} /> Reset
                </button>
            </div>
        </div>
    );
};

export default TicTacToe;
