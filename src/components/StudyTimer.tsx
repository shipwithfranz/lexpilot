import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  Minus, 
  Clock, 
  Coffee, 
  Sparkles,
  Volume2
} from 'lucide-react';

type TimerMode = 'pomodoro' | 'deepStudy' | 'shortBreak' | 'longBreak' | 'custom';

export default function StudyTimer() {
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [initialTime, setInitialTime] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [customMinutes, setCustomMinutes] = useState<number>(45);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Keep a reference to the active interval
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Set default raw values based on preset change
  useEffect(() => {
    setIsRunning(false);
    setIsCompleted(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    let seconds = 25 * 60;
    if (mode === 'pomodoro') seconds = 25 * 60;
    else if (mode === 'deepStudy') seconds = 50 * 60;
    else if (mode === 'shortBreak') seconds = 5 * 60;
    else if (mode === 'longBreak') seconds = 15 * 60;
    else if (mode === 'custom') seconds = customMinutes * 60;

    setTimeLeft(seconds);
    setInitialTime(seconds);
  }, [mode, customMinutes]);

  // Handle countdown trigger
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            playCompletionChime();
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  // Synthesis of golden-ratio focus/success audio chime in browser (no external files)
  const playCompletionChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      
      const ctx = new AudioCtx();
      
      // Node 1: Fundamental focus pitch
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc1.frequency.setValueAtTime(659.25, ctx.currentTime + 0.15); // E5
      osc1.frequency.setValueAtTime(783.99, ctx.currentTime + 0.30); // G5
      osc1.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.45); // C6
      
      gain1.gain.setValueAtTime(0.12, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
      
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      
      osc1.start();
      osc1.stop(ctx.currentTime + 1.2);
    } catch (e) {
      console.warn("Audio Context blocked or unsupported by browser sandbox");
    }
  };

  // Human friendly formatting helper
  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTogglePlay = () => {
    setIsRunning(!isRunning);
    setIsCompleted(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setTimeLeft(initialTime);
  };

  const handleQuickAdjust = (minutesToAdd: number) => {
    // Allows user to rapidly pad extra reading minutes onto current focus session
    setIsCompleted(false);
    setTimeLeft((prev) => {
      const next = prev + minutesToAdd * 60;
      setInitialTime((currInit) => Math.max(currInit, next));
      return Math.max(120, next); // Floor at 2 minutes minimum
    });
  };

  // Custom visual progress calculator
  const progressPercent = initialTime > 0 ? ((initialTime - timeLeft) / initialTime) * 100 : 0;

  return (
    <div className="flex-1 overflow-y-auto px-10 py-8 space-y-6 bg-[#FAF6EE] editorial-paper-lux select-none" id="study-timer-dashboard-view">
      
      {/* Editorial Header */}
      <div className="space-y-2 pb-5 border-b border-slate-200/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-sans font-bold tracking-widest text-[#A3845B] uppercase">
            <Clock className="w-3.5 h-3.5" />
            <span>Study Focus Metronome</span>
            <span className="h-1 w-1 rounded-full bg-gold-accent" />
            <span>Cognitive Pacing</span>
          </div>
          <h2 className="font-display font-bold text-3xl text-slate-950 tracking-tight text-left" id="timer-title">
            Study Focus Timer
          </h2>
          <p className="text-slate-500 font-serif italic text-xs leading-relaxed max-w-xl text-left">
            Establish highly disciplined deep reading intervals while analyzing statutory citations or annotating constitutional briefs.
          </p>
        </div>

        {/* Play test tone option */}
        <button 
          onClick={playCompletionChime}
          className="self-start sm:self-center px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200/80 text-[10px] font-sans font-semibold tracking-wider text-[#A3845B] rounded-lg transition active:scale-[0.98] shadow-3xs flex items-center gap-1.5 cursor-pointer"
          title="Play sample chime melody"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Test Focus Bell</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        
        {/* Preset Selector Section (Left / Top depending on break) */}
        <div className="lg:col-span-4 space-y-4 text-left">
          <h4 className="text-[10px] font-mono tracking-widest font-bold text-slate-400 uppercase">Focus Templates</h4>
          <div className="flex flex-col gap-2">
            
            <button
              onClick={() => setMode('pomodoro')}
              className={`w-full p-3.5 rounded-lg border text-left transition flex items-center justify-between cursor-pointer ${
                mode === 'pomodoro'
                  ? 'bg-white border-[#C29B68] shadow-xs text-slate-950 font-bold'
                  : 'bg-transparent border-slate-200/50 hover:border-slate-300 text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="min-w-0">
                <p className="text-xs font-sans font-bold">Standard Pomodoro</p>
                <p className="text-[10px] text-slate-400 font-serif italic mt-0.5">Classic academic pacing</p>
              </div>
              <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-500">25m</span>
            </button>

            <button
              onClick={() => setMode('deepStudy')}
              className={`w-full p-3.5 rounded-lg border text-left transition flex items-center justify-between cursor-pointer ${
                mode === 'deepStudy'
                  ? 'bg-white border-[#C29B68] shadow-xs text-slate-950 font-bold'
                  : 'bg-transparent border-slate-200/50 hover:border-slate-300 text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="min-w-0">
                <p className="text-xs font-sans font-bold">Patrimony Deep Study</p>
                <p className="text-[10px] text-slate-400 font-serif italic mt-0.5">Extended focus block for complex case syllabus</p>
              </div>
              <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-500">50m</span>
            </button>

            <button
              onClick={() => setMode('shortBreak')}
              className={`w-full p-3.5 rounded-lg border text-left transition flex items-center justify-between cursor-pointer ${
                mode === 'shortBreak'
                  ? 'bg-white border-[#C29B68] shadow-xs text-slate-950 font-bold'
                  : 'bg-transparent border-slate-200/50 hover:border-slate-300 text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="min-w-0 flex items-center gap-2">
                <Coffee className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <div>
                  <p className="text-xs font-sans font-bold">Intermission (Short Break)</p>
                  <p className="text-[10px] text-slate-400 font-serif italic mt-0.5">Quick ocular cognitive relief</p>
                </div>
              </div>
              <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-500">5m</span>
            </button>

            <button
              onClick={() => setMode('longBreak')}
              className={`w-full p-3.5 rounded-lg border text-left transition flex items-center justify-between cursor-pointer ${
                mode === 'longBreak'
                  ? 'bg-white border-[#C29B68] shadow-xs text-slate-950 font-bold'
                  : 'bg-transparent border-slate-200/50 hover:border-slate-300 text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="min-w-0 flex items-center gap-2">
                <Coffee className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <div>
                  <p className="text-xs font-sans font-bold">Recess (Long Break)</p>
                  <p className="text-[10px] text-slate-400 font-serif italic mt-0.5">Post-milestone recovery</p>
                </div>
              </div>
              <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-500">15m</span>
            </button>

            <div className={`p-4 rounded-lg border text-left transition ${
              mode === 'custom' ? 'bg-white border-[#C29B68]' : 'bg-transparent border-slate-200/40'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <button
                  type="button"
                  onClick={() => setMode('custom')}
                  className={`text-xs font-sans font-bold hover:text-[#866337] transition cursor-pointer text-left ${
                    mode === 'custom' ? 'text-slate-950' : 'text-slate-500'
                  }`}
                >
                  Custom Session
                </button>
                <span className="text-xs font-mono text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{customMinutes}m</span>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => {
                    setMode('custom');
                    setCustomMinutes(prev => Math.max(1, prev - 5));
                  }}
                  className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-slate-600 transition hover:text-slate-900 cursor-pointer flex-1 flex justify-center"
                  title="Decrease 5 minutes"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <button
                  onClick={() => {
                    setMode('custom');
                    setCustomMinutes(prev => Math.max(1, prev - 1));
                  }}
                  className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-slate-600 transition hover:text-slate-900 cursor-pointer flex-1 flex justify-center"
                  title="Decrease 1 minute"
                >
                  <span className="text-[10px] font-bold font-sans">-1</span>
                </button>
                <button
                  onClick={() => {
                    setMode('custom');
                    setCustomMinutes(prev => Math.min(180, prev + 1));
                  }}
                  className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-slate-600 transition hover:text-slate-900 cursor-pointer flex-1 flex justify-center"
                  title="Increase 1 minute"
                >
                  <span className="text-[10px] font-bold font-sans">+1</span>
                </button>
                <button
                  onClick={() => {
                    setMode('custom');
                    setCustomMinutes(prev => Math.min(180, prev + 5));
                  }}
                  className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-slate-600 transition hover:text-slate-900 cursor-pointer flex-1 flex justify-center"
                  title="Increase 5 minutes"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Active Timer Display Card (Center / Right) */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-8 md:p-12 shadow-3xs flex flex-col items-center justify-center space-y-8 relative overflow-hidden" id="timer-display-card">
            
            {/* Elegant watermarked background shape */}
            <div className="absolute inset-0 bg-[radial-gradient(#F5F0E5_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

            <AnimatePresence mode="wait">
              {isCompleted ? (
                <motion.div
                  key="completion-view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3 z-10 text-center"
                >
                  <div className="inline-flex p-3 rounded-full bg-emerald-50 text-emerald-600 mb-2 border border-emerald-100/50">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-emerald-950 leading-tight">Focus Block Realized</h3>
                  <p className="text-slate-500 font-serif italic text-xs max-w-sm leading-relaxed">
                    Study session completed successfully. Take a physical break, rest your vision, or toggle your syllabus checklist.
                  </p>
                </motion.div>
              ) : (
                /* Main Countdown Circular Visualizer */
                <motion.div
                  key="countdown-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative flex flex-col items-center justify-center z-10 w-full"
                >
                  {/* Outer Circular SVG track for elegant progress representation */}
                  <div className="relative w-52 h-52 md:w-60 md:h-60 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        stroke="#F7F4EB"
                        strokeWidth="4"
                        fill="transparent"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        stroke={isRunning ? '#C5A880' : '#EAE6DB'}
                        strokeWidth="45%"
                        fill="transparent"
                        strokeDasharray="282.7%"
                        strokeDashoffset={`${((100 - progressPercent) / 100) * 282.7}%`}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-linear"
                        style={{
                          r: '45%',
                          strokeWidth: '5',
                          strokeDasharray: '565.48',
                          strokeDashoffset: (565.48 - (565.48 * progressPercent) / 100).toString(),
                        }}
                      />
                    </svg>

                    {/* Central Count readout */}
                    <div className="space-y-1.5 flex flex-col items-center">
                      <span className="text-slate-400 text-[10px] font-bold font-sans tracking-widest uppercase">
                        {isRunning ? 'active block' : 'paused'}
                      </span>
                      <h1 className="text-4xl md:text-5xl font-mono tracking-tight text-slate-900 font-bold leading-none">
                        {formatTime(timeLeft)}
                      </h1>
                      <span className="text-slate-400 text-[9.5px] font-serif italic text-center max-w-[120px] truncate">
                        {mode === 'pomodoro' ? 'Pomodoro Session' : mode === 'deepStudy' ? 'Patrimony Deep' : mode === 'shortBreak' ? 'Short Break' : mode === 'longBreak' ? 'Long Break' : 'Custom Interval'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Core Control action hub */}
            <div className="flex items-center gap-4.5 z-10 relative">
              <button
                type="button"
                onClick={handleReset}
                className="p-3.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 transition active:scale-95 cursor-pointer shadow-3xs"
                title="Reset Focus Timer"
                id="timer-reset-btn"
              >
                <RotateCcw className="w-5 h-5 stroke-[2.2]" />
              </button>

              <button
                type="button"
                onClick={handleTogglePlay}
                className={`px-7 py-3.5 rounded-xl font-sans font-bold text-xs tracking-wider uppercase transition active:scale-98 cursor-pointer shadow-xs flex items-center justify-center gap-2 ${
                  isRunning
                    ? 'bg-[#A3845B] hover:bg-[#866337] text-white'
                    : 'bg-slate-950 hover:bg-slate-800 text-white'
                }`}
                id="timer-play-btn"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4 fill-white stroke-none" />
                    <span>Pause Session</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white stroke-none" />
                    <span>Begin Session</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Adjustment padding footer */}
            {!isCompleted && (
              <div className="pt-2 border-t border-slate-100 w-full z-10 flex flex-wrap justify-center gap-2">
                <span className="text-[9px] font-mono tracking-wider font-bold text-slate-400 uppercase w-full text-center pb-1">Quick time adjustment:</span>
                <button
                  onClick={() => handleQuickAdjust(-5)}
                  className="px-2 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-[10px] font-sans font-medium text-slate-600 transition cursor-pointer"
                  title="Remove 5 minutes from focus session"
                >
                  -5 min
                </button>
                <button
                  onClick={() => handleQuickAdjust(-1)}
                  className="px-2 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-[10px] font-sans font-medium text-slate-600 transition cursor-pointer"
                  title="Remove 1 minute from focus session"
                >
                  -1 min
                </button>
                <button
                  onClick={() => handleQuickAdjust(1)}
                  className="px-2 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-[10px] font-sans font-medium text-slate-600 transition cursor-pointer"
                  title="Add 1 minute to current focus session"
                >
                  +1 min
                </button>
                <button
                  onClick={() => handleQuickAdjust(5)}
                  className="px-2 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-[10px] font-sans font-medium text-slate-600 transition cursor-pointer"
                  title="Add 5 minutes to current focus session"
                >
                  +5 min
                </button>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
