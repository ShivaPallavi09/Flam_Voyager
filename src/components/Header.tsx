import React from 'react';
import { Compass, Key, Sparkles, Share2, Check } from 'lucide-react';
import { PRESET_TRIPS } from '../services/mockData';
import { TripFormInputs } from '../types/trip';

interface HeaderProps {
  hasApiKey: boolean;
  onOpenApiKeyModal: () => void;
  onSelectPreset: (inputs: TripFormInputs) => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  hasApiKey,
  onOpenApiKeyModal,
  onSelectPreset,
  onReset
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Branding */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={onReset}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-amber-500 to-rose-400 p-0.5 shadow-lg shadow-emerald-500/20">
              <div className="flex items-center justify-center w-full h-full bg-zinc-950 rounded-[10px]">
                <Compass className="w-5 h-5 text-emerald-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-white tracking-tight">Flam</span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-md">
                  Voyager AI
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden sm:block">AI Interactive Travel Architecture</p>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-medium mr-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Demo Presets:
            </span>
            {PRESET_TRIPS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => onSelectPreset(preset.inputs)}
                className="px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all flex items-center gap-1.5"
              >
                <span>{preset.icon}</span>
                <span>{preset.name}</span>
              </button>
            ))}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleShare}
              className="p-2 text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-colors"
              title="Share Link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onOpenApiKeyModal}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all flex items-center gap-2 ${
                hasApiKey
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{hasApiKey ? 'Gemini AI Active' : 'API Key Setup'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
