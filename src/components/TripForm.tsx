import React, { useState } from 'react';
import { MapPin, Calendar, Users, DollarSign, Sparkles, Compass, Check } from 'lucide-react';
import { TripFormInputs, TravelStyle } from '../types/trip';

interface TripFormProps {
  onSubmit: (inputs: TripFormInputs) => void;
  isLoading: boolean;
  initialValues?: Partial<TripFormInputs>;
}

const TRAVEL_STYLES: Array<{ style: TravelStyle; label: string; icon: string }> = [
  { style: 'Cultural', label: 'Cultural & Heritage', icon: '🏛️' },
  { style: 'Adventure', label: 'Outdoor & Adventure', icon: '🏔️' },
  { style: 'Foodie', label: 'Culinary & Foodie', icon: '🍜' },
  { style: 'Relaxation', label: 'Relaxation & Wellness', icon: '🌿' },
  { style: 'Luxury', label: 'Luxury & High-end', icon: '✨' },
  { style: 'Budget', label: 'Smart Backpacker', icon: '🎒' },
];

const INTEREST_TAGS = [
  'Anime & Gaming', 'Historical Shrines', 'Seafood Markets',
  'Speakeasy Bars', 'Photography Spots', 'Nature Trails',
  'Shopping Districts', 'Michelin Dining', 'Art Museums', 'Local Festivals'
];

export const TripForm: React.FC<TripFormProps> = ({ onSubmit, isLoading, initialValues }) => {
  const [destination, setDestination] = useState(initialValues?.destination || 'Tokyo, Japan');
  const [durationDays, setDurationDays] = useState(initialValues?.durationDays || 5);
  const [travelersCount, setTravelersCount] = useState(initialValues?.travelersCount || 2);
  const [budgetLevel, setBudgetLevel] = useState<'Budget' | 'Moderate' | 'Luxury'>(initialValues?.budgetLevel || 'Moderate');
  const [travelStyle, setTravelStyle] = useState<TravelStyle>(initialValues?.travelStyle || 'Cultural');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    initialValues?.interests || ['Historical Shrines', 'Seafood Markets', 'Photography Spots']
  );
  const [specialRequests, setSpecialRequests] = useState(initialValues?.specialRequests || '');

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;

    onSubmit({
      destination: destination.trim(),
      durationDays,
      travelersCount,
      budgetLevel,
      travelStyle,
      interests: selectedInterests,
      specialRequests: specialRequests.trim()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-3xl border border-zinc-800 shadow-xl space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Trip Architect Configurator</h2>
            <p className="text-xs text-zinc-400">Specify preferences for your AI generated plan</p>
          </div>
        </div>
      </div>

      {/* Destination Input */}
      <div>
        <label className="block text-xs font-semibold text-zinc-300 mb-2 uppercase tracking-wider flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Destination City / Region
        </label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="e.g. Kyoto, Japan or Amalfi Coast, Italy"
          required
          className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-700/80 rounded-2xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm font-medium transition-all"
        />
      </div>

      {/* Sliders Grid: Duration & Travelers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-zinc-900/60 rounded-2xl border border-zinc-800/80">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-400" /> Duration
            </span>
            <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
              {durationDays} Days
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={durationDays}
            onChange={(e) => setDurationDays(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
        </div>

        <div className="p-4 bg-zinc-900/60 rounded-2xl border border-zinc-800/80">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-emerald-400" /> Group Size
            </span>
            <span className="text-xs font-bold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              {travelersCount} {travelersCount === 1 ? 'Solo' : 'Travelers'}
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={8}
            value={travelersCount}
            onChange={(e) => setTravelersCount(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
        </div>
      </div>

      {/* Budget Tier Selector */}
      <div>
        <label className="block text-xs font-semibold text-zinc-300 mb-2 uppercase tracking-wider flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-amber-400" /> Budget Tier
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['Budget', 'Moderate', 'Luxury'] as const).map((level) => (
            <button
              type="button"
              key={level}
              onClick={() => setBudgetLevel(level)}
              className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                budgetLevel === level
                  ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-500/10'
                  : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Travel Vibe Selector */}
      <div>
        <label className="block text-xs font-semibold text-zinc-300 mb-2 uppercase tracking-wider">
          Travel Vibe / Style
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {TRAVEL_STYLES.map(({ style, label, icon }) => (
            <button
              type="button"
              key={style}
              onClick={() => setTravelStyle(style)}
              className={`p-3 rounded-2xl text-left border transition-all flex flex-col gap-1 ${
                travelStyle === style
                  ? 'bg-emerald-500/15 border-emerald-500/50 text-white shadow-md shadow-emerald-500/10'
                  : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span className="text-lg">{icon}</span>
              <span className="text-xs font-semibold">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interest Tags */}
      <div>
        <label className="block text-xs font-semibold text-zinc-300 mb-2 uppercase tracking-wider">
          Interests & Highlights
        </label>
        <div className="flex flex-wrap gap-1.5">
          {INTEREST_TAGS.map((tag) => {
            const isSelected = selectedInterests.includes(tag);
            return (
              <button
                type="button"
                key={tag}
                onClick={() => toggleInterest(tag)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1 ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-amber-400" />}
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Special Requests */}
      <div>
        <label className="block text-xs font-semibold text-zinc-300 mb-2 uppercase tracking-wider">
          Custom Notes / Requests (Optional)
        </label>
        <input
          type="text"
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          placeholder="e.g. Vegetarian dining options, avoid steep hiking"
          className="w-full px-3.5 py-2.5 bg-zinc-900/90 border border-zinc-700/80 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 text-xs font-medium"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-300 hover:from-emerald-300 hover:to-amber-200 text-zinc-950 font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
      >
        <Sparkles className="w-4 h-4 animate-spin" />
        {isLoading ? 'Architecting AI Itinerary...' : 'Generate Interactive AI Trip Plan'}
      </button>
    </form>
  );
};
