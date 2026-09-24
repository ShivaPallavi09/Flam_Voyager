import React, { useEffect, useState } from 'react';
import { Compass, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

const LOADING_STEPS = [
  'Analyzing destination landmarks and culture...',
  'Structuring optimal daily travel routes...',
  'Curating local hidden food gems and activities...',
  'Calculating budget tier breakdowns...',
  'Finalizing custom AI trip plan...'
];

export const LoadingSkeleton: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-panel p-8 rounded-3xl border border-zinc-800 space-y-8 text-center max-w-2xl mx-auto my-8 shadow-2xl">
      <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-amber-500/20 to-rose-400/20 border border-emerald-500/30">
        <Compass className="w-10 h-10 text-emerald-400 animate-spin" />
        <Sparkles className="w-5 h-5 text-amber-300 absolute -top-1 -right-1 animate-pulse" />
      </div>

      <div>
        <h3 className="text-xl font-extrabold text-white">Architecting Your AI Itinerary</h3>
        <p className="text-xs text-emerald-400 font-semibold mt-1 animate-pulse">
          {LOADING_STEPS[currentStepIndex]}
        </p>
      </div>

      {/* Progress Steps List */}
      <div className="space-y-2 text-left max-w-md mx-auto">
        {LOADING_STEPS.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 p-2.5 rounded-xl border text-xs transition-all ${
                isCurrent
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : isDone
                  ? 'bg-zinc-900/40 border-zinc-800 text-zinc-400'
                  : 'opacity-30 border-transparent text-zinc-500'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <MapPin className={`w-4 h-4 ${isCurrent ? 'text-amber-400 animate-bounce' : 'text-zinc-600'} shrink-0`} />
              )}
              <span className="font-medium">{step}</span>
            </div>
          );
        })}
      </div>

      {/* Skeleton Cards Placeholder */}
      <div className="grid grid-cols-1 gap-4 pt-4 border-t border-zinc-800">
        {[1, 2].map((i) => (
          <div key={i} className="h-20 bg-zinc-900/60 rounded-2xl animate-pulse border border-zinc-800" />
        ))}
      </div>
    </div>
  );
};
