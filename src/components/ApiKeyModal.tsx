import React, { useState } from 'react';
import { Key, ShieldCheck, Trash2, X, ExternalLink } from 'lucide-react';
import { getStoredApiKey, setStoredApiKey, clearStoredApiKey } from '../services/geminiService';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSave }) => {
  const [keyInput, setKeyInput] = useState(getStoredApiKey() || '');
  const [hasSavedKey, setHasSavedKey] = useState(!!getStoredApiKey());

  if (!isOpen) return null;

  const handleSave = () => {
    if (keyInput.trim()) {
      setStoredApiKey(keyInput.trim());
      setHasSavedKey(true);
    } else {
      clearStoredApiKey();
      setHasSavedKey(false);
    }
    onSave();
    onClose();
  };

  const handleClear = () => {
    clearStoredApiKey();
    setKeyInput('');
    setHasSavedKey(false);
    onSave();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md p-6 glass-panel rounded-2xl border border-zinc-700/60 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Gemini API Key Settings</h3>
            <p className="text-xs text-zinc-400">Configure AI live generation</p>
          </div>
        </div>

        <p className="text-sm text-zinc-300 mb-4 leading-relaxed">
          Provide your Google Gemini API key to enable live AI trip generation. If no key is provided, Flam Voyager runs seamlessly using our built-in realistic mock engine.
        </p>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
            Google Gemini API Key
          </label>
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-700/80 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm font-mono"
          />
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-400 mb-6">
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-emerald-400 hover:underline"
          >
            Get a free Gemini API key <ExternalLink className="w-3 h-3" />
          </a>

          {hasSavedKey && (
            <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> Key Saved
            </span>
          )}
        </div>

        <div className="flex items-center justify-end gap-2">
          {hasSavedKey && (
            <button
              onClick={handleClear}
              className="px-3.5 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" /> Remove Key
            </button>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 text-xs font-semibold text-zinc-950 bg-gradient-to-r from-emerald-400 to-amber-300 hover:from-emerald-300 hover:to-amber-200 rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
          >
            Save Key
          </button>
        </div>
      </div>
    </div>
  );
};
