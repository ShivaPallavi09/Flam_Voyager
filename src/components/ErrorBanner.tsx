import React from 'react';
import { AlertTriangle, RefreshCw, Zap } from 'lucide-react';

interface ErrorBannerProps {
  message: string;
  onRetry: () => void;
  onUseMock: () => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message, onRetry, onUseMock }) => {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-rose-500/30 bg-rose-500/5 space-y-4 max-w-xl mx-auto my-8">
      <div className="flex items-start gap-3">
        <div className="p-2.5 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20 shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">AI Generation Issue Encountered</h4>
          <p className="text-xs text-rose-200/80 mt-1 leading-relaxed">{message}</p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2 border-t border-rose-500/20">
        <button
          onClick={onUseMock}
          className="px-3.5 py-2 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors flex items-center gap-1.5"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" /> Use Realistic Demo Plan
        </button>

        <button
          onClick={onRetry}
          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-rose-400 hover:bg-rose-300 rounded-xl shadow-md transition-colors flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Try Again
        </button>
      </div>
    </div>
  );
};
